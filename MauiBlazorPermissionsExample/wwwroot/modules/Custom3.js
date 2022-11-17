function showAlert(message) {
    //debugger;
    if (!this.GIS.Location) {
        setTimeout(function () {
            showAlert("");
        }, 1000);
    } else {
        r = {
            entity: "",
            lat: this.GIS.Location.lat,
            latLng: { lat: 6.88715, lng: 101.263335 },
            lng: this.GIS.Location.lng,
            selectedEntity: "",

        };
        this.GIS.Marking2(r, function () {

        });
    }
        
        
}

window.setElementText = (element, text) => {
        console.log(element);
    element.value = new Date();
}

    function CStoJSCall() {
        // Invoke to call C# function from JavaScript.
        DotNet.invokeMethodAsync('MauiBlazorPermissionsExample', 'JStoCSCall');
        }

