import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {
  mixinBehaviors
} from '@polymer/polymer/lib/legacy/class.js';

/**
 * `wr-accurate-location-detector`
 * Fetch Location Accurate Accuracy
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WrAccurateLocationDetector extends mixinBehaviors([],PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
     
    `;
  }
  static get properties() {
    return {
      locationAccuracy:{
        type:Number,
        notify:true,    
      },
      inProcess:{
        type:Boolean,
        notify:true,
      }
    };
  }



  ready() {
    super.ready();
    this.getUserAccurateLocation();
  }
       
  async getUserAccurateLocation(){

    const self = this;
    self.inProcess =true;
    if (!this.locationAccuracy) {
      this.locationAccuracy = 2000
    }
    try {
      const geoOptions = {
        maximumAge: 0,
        timeout: 3 * 1000,
        enableHighAccuracy: true,
      };
      const coords = await new Promise((resolve, reject) => {

        const watcher = navigator.geolocation.watchPosition((position) => {
          const lcoords = {};
          const captureData = ['latitude', 'longitude', 'accuracy'];
          captureData.forEach(key => { lcoords[key] = position.coords[key] || undefined });     
             
          if (lcoords.accuracy < Number(this.locationAccuracy)) {
            watcher && navigator.geolocation.clearWatch(watcher);
            resolve(lcoords)
          }

        }, (err) => {
          if (navigator.onLine && err.code === 1) {
            self.fire('location-detector-error','Please allow Location permision to proceed');            
          }
          reject(err);
        }, geoOptions);

        setTimeout(() => {
          watcher && navigator.geolocation.clearWatch(watcher);
          //Close progress here
          self.inProcess =false;
          reject();
        }, 10000 * 2)
      }, (err) => {
       //close progress here
          self.inProcess =false;        
          self.fire('location-detector-error',err);
      })
      if (coords && coords.latitude) {
         console.log("coords",coords);
         self.inProcess =false;
         self.fire('location-detector-success', { 'latitude': coords.latitude, 'longitude': coords.longitude, 'accuracy': coords.accuracy });

      } else {       
        self.inProcess =false;
        self.fire('location-detector-error','Unable to get location');   
      }
    } catch (e) {
       self.inProcess =false;
       self.fire('location-detector-error','Trying to get accurate location, please retry after sometime.');  
            
    } finally {
      self.inProcess =false;
     //Progress close here
    }
  }
}

window.customElements.define('wr-accurate-location-detector', WrAccurateLocationDetector);
