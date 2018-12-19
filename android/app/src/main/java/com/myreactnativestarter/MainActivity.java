package com.myreactnativestarter;
import android.os.Bundle; 
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // 启动屏幕
import android.content.Intent; // react-orientation
import android.content.res.Configuration; // react-orientation

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MyReactNativeStarter";
    }
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // 启动屏幕
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        // react-orientation
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
