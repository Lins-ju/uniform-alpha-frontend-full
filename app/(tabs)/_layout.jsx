import { Redirect, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader } from "../../components";

export default function TabsLayout() {
    const { loading, isLogged } = useGlobalContext();

    if (!loading && !isLogged) return <Redirect href="/sign-in" />;

    return (
        <>
        <Tabs 
        screenOptions={{ headerShown: false, tabBarStyle: {
            backgroundColor: '#f3f6f4', // Set the tab bar background color
          } }} >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="shared"
                options={{
                    title: 'Shared Files Groups',
                    tabBarIcon: ({ color }) => <FontAwesome size={19} name="file-o" color={color} />,
                }}
            />

        </Tabs>
        <Loader isLoading={loading} />
        
        </>
    )
}