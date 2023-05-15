import { useAppStore } from "@/store/app";
import { StatusBar, Style } from '@capacitor/status-bar';


const setStatuBar = async (dark: boolean) => {
    if (dark) {
        await StatusBar.setBackgroundColor({ color: `#1f1f1f` })
        await StatusBar.setStyle({ style: Style.Dark });
    } else {
        await StatusBar.setBackgroundColor({ color: `#357fb7` })
        await StatusBar.setStyle({ style: Style.Light });
    }

}

const changeTheme = (dark: boolean, manually = false): void => {
    const appStore = useAppStore()
    appStore.isDark = dark
    document.body.classList.toggle('dark', dark);

    if (manually) {
        appStore.saveDataApp('dark', `{"dark":"${dark}"}`)
    }


}

const autoChangeTheme = async (): Promise<void> => {


    try {

        const appStore = useAppStore()
        const localDark = JSON.parse(await appStore.getDataApp("dark"))
    
    
        if (localDark) {
    
            if (localDark.dark === "true") {
                changeTheme(true);
    
            } else {
                changeTheme(false);
            }
    
            await setStatuBar(localDark.dark)
    
    
        } else {
            // Use matchMedia to check the user preference
            const prefersDark = await window.matchMedia('(prefers-color-scheme: dark)');
            appStore.isDark = prefersDark.matches
            changeTheme(prefersDark.matches);
    
            // Listen for changes to the prefers-color-scheme media query
            prefersDark.addEventListener("change", (mediaQuery) => changeTheme(mediaQuery.matches));
    
            //StatuBar
            await setStatuBar(prefersDark.matches)
    
    
        }
        
    } catch (error) {
        console.log(`Error autoChangeTheme Dark`, error)
    }
   


}


const isDark = (): boolean => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDark.matches

}

export { autoChangeTheme, isDark, changeTheme }