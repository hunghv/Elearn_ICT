app.service("APIService", function ($http) {
    this.getSubs = function () {
        return $http.get("api/Admin/Categories/GetAllCategories");
    };
});