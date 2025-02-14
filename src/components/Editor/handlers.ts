import { debounce } from "lodash";
import { DateTime } from "luxon";
import { toast } from "react-toastify";


const useEditorHandlers = ({
  setIsLoading,
  setIsReadyToRenderArtboard,
  setActiveLog,
  setIsChangingTabs,
  setPreviewList,
  activeLog,
  today,
  previewList,
  setForcedActiveTab,
  setIsToRunConfetti,
  setIsOptionsOpened,
  dateSelected,
  setTheme,
  setJourneyTabs,
  journeyTabs,
  setJourneyName,
  notification,
  setDefaultPanel,
  onOpen,
  isPro,
  setActiveTab,
  setNotification,
  getUser,
  activeTab,
  supabaseClient }: any) => {

  const handleSwitchNotifications = debounce(
    async (isToEnable: any, setup: any) => {
      const isWhen = setup === "when";
      const isWhere = setup === "where";
      const isWhat = setup === "what";

      if (!isPro && isToEnable.target.value === true) {
        onOpen();
        setDefaultPanel("subscription");
      } else {
        setIsLoading(true);
        if (isToEnable?.target?.value) {
          const valueWhen = isWhen
            ? isToEnable?.target?.value
            : activeTab?.frequency;

          const valueWhere = isWhere
            ? isToEnable?.target?.value
            : notification?.where;

          const valueWhat = isWhat
            ? isToEnable?.target?.value?.split("-")[0]
            : DateTime.fromISO(notification?.next_sent).hour;

          const nextSent = notification?.id
            ? DateTime.fromISO(notification?.next_sent)
              .set({
                hour: valueWhat ? valueWhat : 9,
                minute: 0,
                second: 0,
              })
              .plus({ day: isWhat || isWhere ? 0 : 1 })
              .toUTC()
              .toISO()
            : DateTime.fromJSDate(new Date())
              .set({ hour: 9, minute: 0, second: 0 })
              .plus({ day: 1 })
              .toUTC()
              .toISO();

          const newNextSent = isWhen
            ? DateTime.fromJSDate(new Date())
              .set({ hour: valueWhat ? valueWhat : 9, minute: 0, second: 0 })
              .plus(
                valueWhen === "weekly"
                  ? { week: 1 }
                  : valueWhen === "monthly"
                    ? { month: 1 }
                    : { day: 1 }
              )
              .toUTC()
              .toISO()
            : nextSent;

          if (isPro) {
            const { data, error } = await supabaseClient
              .from("notification")
              .upsert({
                id: notification?.id,
                journey_id: activeTab?.id,
                email: getUser()?.email,
                phone: getUser()?.phone,
                user_id: getUser()?.id,
                when: valueWhen,
                where: valueWhere,
                next_sent: newNextSent,
                journey_name: activeTab?.name,
                user_name:
                  getUser()?.user_metadata?.full_name || getUser()?.email,
              })
              .select();

            if (data) {
              setNotification(data[0]);
            }
          }
          setActiveTab({ ...activeTab, frequency: valueWhen });

          if (isWhen) {
            handleJourneyUpdate({ frequency: valueWhen });
          }
        } else {
          await supabaseClient
            .from("notification")
            .delete()
            .eq("id", notification?.id);

          setNotification(null);
        }
        setIsLoading(false);
      }
    },
    100
  );

  const handleJourneyName = (e: any) => {
    setJourneyName(e?.target.value);
  };

  const handleJourneyNameEdit = debounce(async (e: any) => {
    const value = e?.target?.value;
    const { data: updatedJourney } = await supabaseClient
      .from("journey")
      .update({ name: value, updated_at: DateTime.now().toUTC().toISO() })
      .eq("id", activeTab?.id)
      .select();

    if (updatedJourney) {
      const updatedTabList = journeyTabs.map((item: any) => {
        if (item?.id === updatedJourney[0].id) {
          return {
            ...item,
            ...updatedJourney[0],
          };
        }

        return item;
      });
      setJourneyTabs([...updatedTabList]);
    }
  }, 200);

  const handleTabSelection = async (
    idSelected: any,
    isToReorderList: boolean
  ) => {
    const index = idSelected - 1;
    const activeTab: any =
      journeyTabs.length === 1 ? journeyTabs[0] : journeyTabs[index];

    setActiveTab(null);
    setNotification(null);
    setIsChangingTabs(true);
    setIsReadyToRenderArtboard(false);

    const { data: updatedJourney } = await supabaseClient
      .from("journey")
      .update({ selected_at: DateTime.now().toUTC().toISO() })
      .eq("id", activeTab?.id)
      .select();

    if (isToReorderList && updatedJourney) {
      getTabs({ isToReorderList });
    }

    setActiveTab(activeTab);
    setActiveLog(null);

    const monthWithPad: string = `0${dateSelected.month}`.slice(-2);
    const dayWithPad: string = `0${dateSelected.day}`.slice(-2);

    const res = await getLogs(
      activeTab?.id,
      `${dateSelected.year}-${monthWithPad}-${dayWithPad}`
    );

    if (res) {
      setActiveLog(res);
    }

    const dateStringEnd = DateTime.now().toUTC().toISODate();
    const dateStringStart = DateTime.now()
      .minus({ month: 1 })
      .toUTC()
      .toISODate();

    setIsLoading(false);

    getPreviews(dateStringStart, dateStringEnd, activeTab, {
      forceUpdate: true,
    });

    const { data: notification }: any = await supabaseClient
      .from("notification")
      .select()
      .eq("journey_id", activeTab.id);

    setNotification(notification[0]);
    setIsReadyToRenderArtboard(true);
    setIsChangingTabs(false);
  };

  const handleJourneyDeletion = debounce(async ({ id }: any) => {
    const { data } = await supabaseClient
      .from("journey")
      .delete()
      .eq("id", id)
      .select()
      .order("updated_at", { ascending: false });

    if (data) {
      const itemDeleted = data[0];
      const newTabsToBeRendered = journeyTabs.filter((item: any) => {
        return item.id !== itemDeleted.id;
      });

      handleTabSelection(2, true);

      setJourneyTabs(newTabsToBeRendered);
      setIsOptionsOpened(false);

      if (newTabsToBeRendered && newTabsToBeRendered?.length === 0) {
        setPreviewList([]);
        setTheme("dark");
      }
    }
  }, 500);

  const getNow = () => DateTime.now().toUTC().toISO();
  const handleContentEdit = debounce(async (content: any) => {
    const now = getNow();
    const customDate = DateTime.fromJSDate(new Date())
      .set({
        day: dateSelected.day,
        month: dateSelected.month,
        year: dateSelected.year,
      })
      .toUTC();

    const logId = `log_${getUser()?.id}_${activeTab?.id
      }_${customDate.toISODate()}`;

    const { data, error } = await supabaseClient
      .from("log")
      .upsert({
        id: logId,
        created_at: activeLog ? activeLog?.created_at : customDate.toISO(),
        updated_at: now,
        type: "",
        journey_id: activeTab?.id,
        content,
        user_id: getUser()?.id,
      })
      .select();

    if (data && data[0]) {
      setActiveLog(data[0]);

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
      const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

      getPreviews(
        dateStringStart,
        dateStringEnd,
        activeTab,
        {
          forceUpdate: true,
        },
        false
      );

      const isToCreate = !activeLog;

      if (isToCreate) {
        setIsToRunConfetti(true);
        toast("Mission accomplished for today!  🚀");
      }
    }
  }, 500);

  const handleJourneyUpdate = debounce(
    async ({ theme, font, frequency }: any) => {
      await supabaseClient
        .from("journey")
        .update({
          theme: theme || "dark",
          font: font || "default",
          frequency: frequency || "daily",
        })
        .eq("id", activeTab?.id);

      setActiveTab({
        ...activeTab,
        theme,
        font,
        frequency: frequency || activeTab.frequency,
      });
    },
    1000
  );

  const handleCreateJourney = debounce(async (e: any, type: any) => {
    const journeyTitle = type === "input" ? e : e?.target?.textContent;
    await supabaseClient.from("journey").insert({
      name: journeyTitle || "🏆 New journey",
    });

    const { error, data } = await supabaseClient
      .from("journey")
      .select()
      .order("updated_at", { ascending: false });

    if (data) {
      setJourneyTabs([]);
      setActiveTab(data[0]);
      setIsReadyToRenderArtboard(true);
      setTimeout(() => {
        setJourneyTabs([...data]);
      }, 100);
    }
  }, 500);

  const getLogs = async (journeyId: any, dateString: any) => {
    const start = DateTime.fromISO(dateString)
      .set({ hour: 0, minute: 0, second: 0 })
      .toUTC()
      .toISO();
    const end = DateTime.fromISO(dateString)
      .set({
        hour: 23,
        minute: 59,
        second: 59,
      })
      .toUTC()
      .toISO();

    const { data, error } = await supabaseClient
      .from("log")
      .select()
      .eq("journey_id", journeyId)
      .gt("created_at", start)
      .lt("created_at", end)
      .order("created_at", { ascending: false });

    return data ? data[0] : null;
  };

  const getInsights = async (year: any, journeyId: any) => {
    if (!journeyId) return;
    const start = DateTime.fromISO(`${year}-01-01`)
      .set({ hour: 0, minute: 0, second: 0 })
      .toUTC()
      .toISO();

    const end = DateTime.fromISO(`${year}-01-01`)
      .plus({ year: 1 })
      .set({
        hour: 23,
        minute: 59,
        second: 59,
      })
      .toUTC()
      .toISO();

    setIsLoading(true);

    const { error, data } = await supabaseClient
      .from("log")
      .select()
      .eq("journey_id", journeyId)
      .gt("created_at", start)
      .lt("created_at", end)
      .order("created_at", { ascending: false });

    if (data) {
      setIsLoading(false);
      return data;
    }

    setIsLoading(false);
    return [];
  };

  const getPreviews = debounce(
    async (
      dateStringStart: any,
      dateStringEnd: any,
      newTab: any,
      options: any,
      isToShowLoader: boolean = true
    ) => {
      if (!newTab?.id) return;
      const start = DateTime.fromISO(dateStringStart)
        .minus({ month: 1 })
        .set({ hour: 0, minute: 0, second: 0 })
        .toUTC()
        .toISO();

      const end = DateTime.fromISO(dateStringEnd)
        .plus({ day: 1 })
        .set({
          hour: 23,
          minute: 59,
          second: 59,
        })
        .toUTC()
        .toISO();

      isToShowLoader && setIsLoading(true);

      const { error, data } = await supabaseClient
        .from("log")
        .select()
        .eq("journey_id", newTab?.id)
        .gt("created_at", start)
        .lt("created_at", end)
        .order("created_at", { ascending: false });

      if (data) {
        const isToForcePreviewList = options.forceUpdate;
        const formattedPreviewList = previewList
          ? [...previewList, ...data]
          : [...data];
        setPreviewList(isToForcePreviewList ? [...data] : formattedPreviewList);
      }

      isToShowLoader && setIsLoading(false);
    },
    100
  );

  const getTabs = async (options: any = {}) => {
    setIsLoading(true);
    const { isToReorderList } = options;
    const { error, data } = await supabaseClient
      .from("journey")
      .select()
      .order("selected_at", { ascending: false });

    if (data && data[0]) {
      setJourneyTabs(data);
      setActiveTab(data[0]);

      if (isToReorderList) {
        setForcedActiveTab(1);
      }

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const res = await getLogs(
        data[0]?.id,
        `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`
      );

      if (res) {
        setActiveLog(res);
      }

      setIsReadyToRenderArtboard(true);
      setIsLoading(false);

      const { data: notification }: any = await supabaseClient
        .from("notification")
        .select()
        .eq("journey_id", data[0]?.id);

      setNotification(notification[0]);
    }

    setIsLoading(false);
  };

  return {
    handleSwitchNotifications,
    handleJourneyName,
    handleJourneyNameEdit,
    handleJourneyDeletion,
    handleTabSelection,
    getTabs,
    getLogs,
    getPreviews,
    handleCreateJourney,
    getInsights,
    handleContentEdit,
    handleJourneyUpdate
  }

}

export default useEditorHandlers;