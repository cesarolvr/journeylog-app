import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Avatar,
} from "@nextui-org/react";
import {
  CreditCard,
  Handshake,
  LogOut,
  LucideBarChart,
  MessageCircle,
  ScrollText,
  SquareArrowOutUpRight,
  User,
} from "lucide-react";

const ProfileModal = ({ isOpen, isPro, userInfo, onOpenChange }: any) => {
  const shortenedName = userInfo?.full_name.split(" ").slice(0, -1).join(" ");

  console.log(userInfo);
  return (
    <div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        size="5xl"
        radius="lg"
        classNames={{
          body: "p-0",
          backdrop: "bg-[#000000]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#222222] text-[#919191]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex h-[600px] max-h-[80%]">
                  <div className="bg-[#181818] p-4 rounded-r-xl border-r-1 border-[#333333] w-[309px] flex-shrink-0">
                    <div className="relative flex items-center justify-between pt-6 pb-3 px-3 w-full">
                      {isPro ? (
                        <span className="bg-[#39d353] px-[5px] uppercase mr-[-20px] z-40 mt-[-40px] font-black rounded-[5px] text-[black] text-[10px]">
                          PRO
                        </span>
                      ) : null}
                      <Avatar
                        className="text-white cursor-pointer clear-start avatar flex-shrink-0"
                        name={shortenedName}
                        size="md"
                      ></Avatar>
                      <div className="text-left flex flex-col justify-center w-full pl-4">
                        <p className="text-[18px] leading-[18px]">
                          {userInfo?.full_name}
                        </p>
                        <span className="text-[12px]">{userInfo?.email}</span>
                      </div>
                    </div>
                    <ul>
                      {[
                        {
                          icon: <User />,
                          text: "Profile",
                          classes: "",
                        },
                        {
                          icon: <CreditCard />,
                          text: "Subscription",
                          classes: "",
                        },
                        {
                          icon: <LucideBarChart />,
                          text: "Insights",
                          classes: "",
                          children: (
                            <span className="font-bold text-[11px] text-[black] bg-[#27DE55] rounded-lg py-1 px-2">
                              {isPro ? 'Subscribed' : 'Get PRO'}
                            </span>
                          ),
                        },
                        {
                          icon: <SquareArrowOutUpRight />,
                          text: "Go to landing page",
                          classes: "",
                        },
                        {
                          icon: <ScrollText />,
                          text: "Privacy Policy",
                          classes: "",
                        },
                        {
                          icon: <Handshake />,
                          text: "Terms of use",
                          classes: "",
                        },
                        {
                          icon: <MessageCircle />,
                          text: "Give some feedback",
                          classes: "",
                        },
                        {
                          icon: <LogOut />,
                          text: "Logout",
                          classes: "text-[#F31260]",
                        },
                      ].map(({ icon, text, classes, children }: any) => {
                        return (
                          <li
                            className={`${classes} rounded-xl cursor-pointer hover:bg-[#1E1E1E] hover:text-[white] flex w-full p-4 items-center`}
                          >
                            <div className="flex-shrink-0">{icon}</div>
                            <p className="ml-4 flex justify-between w-full">
                              {text}
                              {children ?? children}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="p-6">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
