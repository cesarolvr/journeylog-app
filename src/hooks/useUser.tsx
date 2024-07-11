import { useEffect, useState, createContext, useContext } from "react";
import {
	useUser as useSupaUser,
	useSessionContext,
	User,
} from "@supabase/auth-helpers-react";

type UserContextType = {
	accessToken: string | null;
	user: User | null;
	userDetails: null;
	isLoading: boolean;
	subscription: null;
};

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export interface Props {
	[propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
	const {
		session,
		isLoading: isLoadingUser,
		supabaseClient: supabase,
	} = useSessionContext();
	const user = useSupaUser();
	const accessToken = session?.access_token ?? null;
	const [isLoadingData, setIsloadingData] = useState(false);
	const [userDetails, setUserDetails] = useState(null);
	const [subscription, setSubscription] = useState(null);

	const getUserDetails = () => supabase.from("users").select("*").single();

	useEffect(() => {
		if (user && !isLoadingData && !userDetails && !subscription) {
			setIsloadingData(true);
			Promise.allSettled([getUserDetails()]).then(
				(results) => {
					const userDetailsPromise = results[0];

					if (userDetailsPromise.status === "fulfilled")
						setUserDetails(userDetailsPromise.value.data);

					setIsloadingData(false);
				}
			);
		} else if (!user && !isLoadingUser && !isLoadingData) {
			setUserDetails(null);
			setSubscription(null);
		}
	}, [user, isLoadingUser]);

	const value = {
		accessToken,
		user,
		userDetails,
		isLoading: isLoadingUser || isLoadingData,
		subscription,
	};

	return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error(`useUser must be used within a MyUserContextProvider.`);
	}
	return context;
};
