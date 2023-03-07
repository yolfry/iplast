import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize, InterstitialAdPluginEvents, AdLoadInfo, AdOptions } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/core';


const admobBannerShow = async () => {

  // AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
  //     // Subscribe Banner Event Listener
  //   });

  //   AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
  //     // Subscribe Change Banner Size
  //   });

  const adId = isPlatform('ios') ? 'ios-ad' : 'ca-app-pub-3777306841672305/4641445799'

  const options: BannerAdOptions = {
    adId,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 80,
    isTesting: true
    // npa: true
  };

  try {
    const res = await AdMob.showBanner(options);
    console.log(res)
  } catch (error) {
    console.log(error)
  }


}

const admobBannerHidden = async () => {
  AdMob.hideBanner()
}


const showInterstitial = async () => {

  setTimeout(async () => {
    const adId = isPlatform('ios') ? 'ios-ad' : 'ca-app-pub-3777306841672305/1438366257'

    AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared interstitial
    });

    const options: AdOptions = {
      adId,
      isTesting: true
      // npa: true
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();

  }, 10000);


}

export { admobBannerShow, admobBannerHidden, showInterstitial }