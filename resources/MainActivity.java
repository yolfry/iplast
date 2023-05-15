package con.iplast.app;
import android.os.Bundle; // required for onCreate parameter
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      //Facebook Login 
      registerPlugin(
        com.getcapacitor.community.facebooklogin.FacebookLogin.class
      );

      //Google Login
      this.registerPlugin(GoogleAuth.class);

    }

}
