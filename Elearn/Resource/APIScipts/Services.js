app.service("apiService", function ($http) {
    this.getSubs = function () {
        return $http.get("api/Admin/Categories/GetAllCategories");
    };
});