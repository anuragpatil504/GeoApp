import React, { useEffect, useState } from "react";
import * as L from "leaflet";
import {
	MapContainer,
	LayersControl,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import "leaflet-routing-machine";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import "leaflet-geosearch/assets/css/leaflet.css";

import "./GeoTag.css";

const GeoTag = () => {
	const [state, setState] = useState({
		map: null,
		markers: [],
		flag: false,
	});

	const GeoSearchControlElement = SearchControl;
	const prov = OpenStreetMapProvider();

	var myIcon = L.icon({
		iconUrl:
			"https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png",

		iconSize: [30, 30],
	});

	var carIcon = L.icon({
		iconUrl:
			"https://cdn.discordapp.com/attachments/511846277554896926/976448671484899348/NicePng_marker-circle-png_1015767.png",
		iconSize: [30, 30],
	});

	var stationIcon = L.icon({
		iconUrl:
			"https://w7.pngwing.com/pngs/262/797/png-transparent-firefighter-fire-department-logo-firefighter-firefighter-people-logo-thumbnail.png",
		iconSize: [30, 30],
	});

	function LocationMarker() {
		const map = useMapEvents({
			click(e) {
				// console.log(e.latlng);

				if (state.markers.length < 1) {
					setState((prevState) => ({
						...prevState,
						markers: [...prevState.markers, [e.latlng.lat, e.latlng.lng]],
					}));
				}
			},
		});

		return state.markers !== null
			? state.markers.map((m, index) => (
					<>
						<Marker position={m} icon={myIcon}>
							<Popup>Point {index}</Popup>
						</Marker>
					</>
			  ))
			: null;
	}

	const resetMarkers = () => {
		setState((prevState) => ({
			...prevState,
			markers: [],
			flag: false,
		}));
		window.location.reload();
	};

	const getRoute = (map) => {
		// var marker = L.marker(state.markers[0], { icon: carIcon }).addTo(map);
		// L.Routing.control({
		// 	waypoints: [L.latLng(state.markers[0]), L.latLng(state.markers[1])],
		// })
		// 	.on("routesfound", function (e) {
		// 		var routes = e.routes;
		// 		console.log(routes);

		// 		e.routes[0].coordinates.forEach(function (coord, index) {
		// 			setTimeout(function () {
		// 				marker.setLatLng([coord.lat, coord.lng]);
		// 			}, 100 * index);
		// 		});
		// 	})
		// 	.addTo(map);

		var routeControl = L.Routing.control({
			      show: true,
			      fitSelectedRoutes: true,
			      plan: false,
				  routeWhileDragging: false,
			      lineOptions: {
			        styles: [
			          {
			            color: "blue",
			            opacity: "0.7",
			            weight: 6
			          }
			        ]
			      }
			    })
			      .addTo(map)
			      .getPlan();

				  var routeControl1 = L.Routing.control({
					show: true,
					fitSelectedRoutes: true,
					plan: false,
					routeWhileDragging: false,
					lineOptions: {
					  styles: [
						{
						  color: "black",
						  opacity: "0.7",
						  weight: 6
						}
					  ]
					}
				  })
					.addTo(map)
					.getPlan();

				  var routeControl2 = L.Routing.control({
					show: true,
					fitSelectedRoutes: true,
					plan: false,
					routeWhileDragging: false,
					lineOptions: {
					  styles: [
						{
						  color: "red",
						  opacity: "0.7",
						  weight: 6
						}
					  ]
					}
				  })
					.addTo(map)
					.getPlan();

					var routeControl3 = L.Routing.control({
						show: true,
						fitSelectedRoutes: true,
						plan: false,
						routeWhileDragging: false,
						lineOptions: {
						  styles: [
							{
							  color: "green",
							  opacity: "0.7",
							  weight: 6
							}
						  ]
						}
					  })
						.addTo(map)
						.getPlan();

						var routeControl4 = L.Routing.control({
							show: true,
							fitSelectedRoutes: true,
							plan: false,
							routeWhileDragging: false,
							lineOptions: {
							  styles: [
								{
								  color: "yellow",
								  opacity: "0.7",
								  weight: 6
								}
							  ]
							}
						  })
							.addTo(map)
							.getPlan();
			
			    var newLatLngA = new L.LatLng(18.54330786707698, 73.80185578659687, "taskA");
			    var newLatLngB = new L.LatLng(18.479172608502033, 73.81593201735639, "taskB");
			    var newLatLngC = new L.LatLng(18.484708070798916, 73.89214966759414, "taskc");
				var newLatLngD = new L.LatLng(18.554699939687627, 73.87979004958295, "taskd");
				var newLatLngE = new L.LatLng(18.669854081969387, 73.81936508045689, "taskce");

			
			    routeControl.setWaypoints([L.latLng(state.markers[0]),newLatLngA]);
				routeControl1.setWaypoints([L.latLng(state.markers[0]),newLatLngB]);
				routeControl2.setWaypoints([L.latLng(state.markers[0]),newLatLngC]);
				routeControl3.setWaypoints([L.latLng(state.markers[0]),newLatLngD]);
				routeControl4.setWaypoints([L.latLng(state.markers[0]),newLatLngE]);
	};

	const setFlag = (val) => {
		setState((prevState) => ({
			...prevState,
			flag: val,
		}));
	};

	return (
		<>
			{/* {state.markers !== null ? JSON.stringify(state.markers) : null} */}
			<MapContainer
				style={{ height: "92vh" }}
				center={[18.5204, 73.8567]}
				zoom={13}
				scrollWheelZoom={true}
				doubleClickZoom={false}
				whenCreated={(map) => {
					setState((prevState) => ({
						...prevState,
						map: map,
					}));
				}}
			>
				<LayersControl position="topright">
					<LayersControl.BaseLayer checked name="OSM">
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="MapTiler Street Map">
						<TileLayer
							attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
							url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Google Map">
						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="MapTiler Topography">
						<TileLayer
							attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
							url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
						/>
					</LayersControl.BaseLayer>
				</LayersControl>
				<GeoSearchControlElement
					provider={prov}
					showMarker={true}
					showPopup={false}
					maxMarkers={3}
					retainZoomLevel={false}
					animateZoom={true}
					autoClose={false}
					searchLabel={"Enter address, please"}
					keepResult={true}
					popupFormat={({ query, result }) => result.label}
				/>

				<LocationMarker />

				{state.markers.length > 0 ? (
					<div
						className="container-fluid"
						style={{ position: "absolute", bottom: 15, zIndex: 314159 }}
					>
						<button className="btn btn-danger" onClick={resetMarkers}>
							Reset
						</button>

						{state.markers.length > 0 ? (
							<button
								className="btn btn-primary ms-2"
								onClick={() => {
									setFlag(true);
									getRoute(state.map);
								}}
							>
								Get Route
							</button>
						) : null}
					</div>
				) : null}
			</MapContainer>
		</>
	);
};

export default GeoTag;

// import L from "leaflet";
// import "./ShortestRoutes.css";
// import React, { useEffect, useState } from "react";


// require("leaflet-routing-machine");

// const style = {
//   width: "90%",
//   height: "500px"
// };

// var myIcon = L.icon({
//   iconUrl:
//     "https://cdn4.iconfinder.com/data/icons/maps-and-navigation-solid-icons-vol-1/72/19-512.png",
//   iconSize: [25, 25],
//   iconAnchor: [10, 10]
// });

// var greenIcon = new L.Icon({
//   iconUrl:
//     "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const ShortestRoutes =()=> {
// 	const [state, setState] = useState({
// 				map: null,
// 				marker: null,
// 				flag: false,
// 			});
// 	useEffect(()=>{
// 			let  map = L.map("map", {
// 			  center: [65.012357, 25.483549],
// 			  zoom: 7,
// 			  layers: [
// 			    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
// 			      attribution:
// 			        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// 			    })
// 			  ]
// 			}
// 			);
// 			setState(pstate=>({
// 				...pstate,
// 				map:map
// 			})	
// 			)

// 	},[])
//   componentDidMount() {
    // // create map
    // this.map = L.map("map", {
    //   center: [65.012357, 25.483549],
    //   zoom: 7,
    //   layers: [
    //     L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    //       attribution:
    //         '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //     })
    //   ]
    // });

    //   L.Routing.control({
    //     waypoints: [
    //       L.latLng(65.012357, 25.483549, 65.052492, 25.477031),
    //       L.latLng(65.01615, 25.471847, 65.05098, 25.474349)
    //     ],
    //     routeWhileDragging: true
    //   })
    //     .addTo(this.map)
    //     .getPlan();
    // }

//     var routeControl = L.Routing.control({
//       show: true,
//       fitSelectedRoutes: true,
//       plan: false,
// 	  routeWhileDragging: false,
//       lineOptions: {
//         styles: [
//           {
//             color: "blue",
//             opacity: "0.7",
//             weight: 6
//           }
//         ]
//       }
//     })
//       .addTo(state.map)
//       .getPlan();

//     var newLatLngA = new L.LatLng(65.012357, 25.483549, "taskA");
//     var newLatLngB = new L.LatLng(65.01615, 25.471847, "taskB");
//     var newLatLngC = new L.LatLng(65.05098, 25.474349, "taskc");

//     routeControl.setWaypoints([newLatLngA, newLatLngB, newLatLngC]);
  

//     return <div id="map" style={style} />;
 
// }

// export default ShortestRoutes;
