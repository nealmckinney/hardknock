(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: window.mapKey,
    v: "weekly"
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });

  console.log("mapKey: " + window.mapKey);
  
  // Initialize and add the map
  let map;
  let geocoder;
  
  async function initMap() {
      const { Map } = await google.maps.importLibrary("maps");
      geocoder = new google.maps.Geocoder();
  
      map = new Map(document.getElementById("location-map"), {
        center: { lat: 45.714530, lng: -121.518230 },
        zoom: 11,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 65
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "50"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            }
        ]
      });
      
      const mapElement = document.getElementById('location-map');
      const address = mapElement.getAttribute('data-address');
      console.log("address: " + address);
      
      geocoder.geocode({ 'address': address}, function(results, status) {
          if (status == 'OK') {
              map.setCenter(results[0].geometry.location);
              
              const image = {
                  url: mapElement.getAttribute('data-marker-icon'),
                  scaledSize: new google.maps.Size(40, 40),
                  anchor: new google.maps.Point(20, 20)
              };
              
              let contentString = '';
              const mapDetails = document.getElementById('map-details');
              
              if (mapDetails) {
                const title = mapDetails.querySelector('.title')?.textContent || '';
                const phone = mapDetails.querySelector('.phone')?.textContent || '';
                const mapLink = mapDetails.querySelector('.map-link')?.getAttribute('href') || '#';
                
                contentString = `<div class="info-window-details">
                  <div class="title">${title}</div>
                  <div class="address">${phone}<br/>
                  <a class="btn small mt-2" href="${mapLink}" target="_blank">Get Directions</a></div>
                </div>`;
              }
              
              const infowindow = new google.maps.InfoWindow({
                  content: contentString || address,
                  ariaLabel: mapDetails?.querySelector('.title')?.textContent || address
              });
                
              const marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: image,
                  title: mapDetails?.querySelector('.title')?.textContent || address,
                  index: 0
              });
              
              marker.addListener("click", () => {
                  infowindow.open({
                      anchor: marker,
                      map,
                  });
                  map.panTo(marker.getPosition());
              });
              
          } else {
              alert('Geocode was not successful for the following reason: ' + status);
          }
      });
  }
  
  initMap();