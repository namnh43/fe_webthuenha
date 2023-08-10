import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const MapWithSearch = ({ initialAddress }) => {
    const [address, setAddress] = useState(initialAddress);
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
    const [userLocation, setUserLocation] = useState(null);
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);
    const apiKey = 'AIzaSyAS8dmq6SOjst1K0oYY-B-kwLz8zqlqUA0';

    useEffect(() => {
        handleSearch();
    }, [initialAddress]);

    useEffect(() => {
        if (userLocation && mapCenter.lat !== 0 && mapCenter.lng !== 0) {
            calculateDirections(userLocation, { lat: mapCenter.lat, lng: mapCenter.lng });
        }
    }, [userLocation, mapCenter]);

    const handleInputChange = (e) => {
        setAddress(e.target.value);
        handleSearch();
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address
                )}&key=${apiKey}`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setMapCenter({ lat: location.lat, lng: location.lng });
            } else {
                console.log('Không tìm thấy địa chỉ tương ứng.');
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi tìm kiếm địa chỉ:', error);
        }
    };

    const calculateDirections = (origin, destination) => {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: new window.google.maps.LatLng(origin.lat, origin.lng),
                destination: new window.google.maps.LatLng(destination.lat, destination.lng),
                travelMode: 'DRIVING',
            },
            (result, status) => {
                if (status === 'OK') {
                    setDirections(result);
                    const route = result.routes[0];
                    let totalDistance = 0;
                    for (const element of route.legs) {
                        totalDistance += element.distance.value;
                    }
                    const distanceInKm = (totalDistance / 1000).toFixed(2);
                    setDistance(distanceInKm);
                } else {
                    console.error('Không thể lấy thông tin chỉ đường:', status);
                }
            }
        );
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    if (mapCenter.lat !== 0 && mapCenter.lng !== 0) {
                        calculateDirections({ lat: latitude, lng: longitude }, mapCenter);
                    }
                },
                (error) => {
                    console.error('Không thể lấy vị trí của bạn:', error);
                }
            );
        } else {
            console.error('Trình duyệt của bạn không hỗ trợ Geolocation API.');
        }
    };

    return (
        <div>
            {/*<input type="text" value={address} onChange={handleInputChange} style={{width : "225px"}}/>*/}
            {/*<button onClick={handleSearch}>Tìm kiếm</button>*/}
            {/*<button onClick={getUserLocation}>Đến vị trí của tôi</button>*/}
            {/*{userLocation && <p>Khoảng cách: {distance} km</p>}*/}
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '358px', borderRadius: '8px' }}
                    center={mapCenter}
                    zoom={15}
                >
                    {userLocation && <Marker position={userLocation} />}
                    {mapCenter.lat !== 0 && mapCenter.lng !== 0 && <Marker position={mapCenter} />}
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapWithSearch;
