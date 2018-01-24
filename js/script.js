(function() {


var app = angular.module("sample", []);
    app.controller('myApp', ['$scope', '$http', '$log', function($scope, $http, $log){
                
                $scope.SaveForm = false;
                $scope.summaryBasket = false;
                $scope.submitForm = false;
                $scope.showBasket = false;
                $scope.closeSummary = false;
                $scope.filterBy = {};
                $scope.basketArray = [{}];
                $scope.basketArray.shift();

                //POBRANIE DANYCH Z PLIKU JSON 
                var successCallBack = function(response) {
                    $scope.books = response.data;
                };

                var errorCallBack = function(response) {
                    $scope.error = response.data;
                };
                var successCallBack2 = function(response) {
                    $scope.storages = response.data;
                };

                var errorCallBack2 = function(response) {
                    $scope.error = response.data;
                };

               $http({
                    method:'GET',
                    url:'http://ksiegarnia.pl/lib.json'})
                .then(successCallBack, errorCallBack);

                $http({
                    method:'GET',
                    url:'http://ksiegarnia.pl/storage.json'})
                .then(successCallBack2, errorCallBack2);

                

                //FUNKCJA ODPOWIADAJACA ZA DODANIE PRODUKTOW DO KOSZYKA
                $scope.AddToBasket = function(object) {
                    $scope.bookTitle = object.title;
                    $scope.showBasket = true;


                    var modal = document.getElementById('myForm');
                    modal.style.display = "block";

                };


                //FUNKCJA ZAMYKAJACA FORMULARZ DODANIA DO KOSZYKA
                $scope.closeWindows = function() {
                    var modal = document.getElementById("myForm");
                    $scope.bookTitle = '';
                    $scope.quantity = '';
                    $scope.data_device = '';
                    modal.style.display = "none";
                };

                //FUNKCJA Z PARAMETRAMI GDZIE PRZEKAZYWANE SA, TYTUL, NOSNIK I ILOSC PRODUKTOW (FORMULARZ DODANIA PRODUKTOW DO KOSZYKA)
                $scope.summary = function(book, data_storage, amount){
                    $scope.book = book;
                    $scope.data_storage = data_storage;
                    $scope.amount = amount;
                    $scope.basketArray.push({title:$scope.book, rodzaj:$scope.data_storage, ilosc:$scope.amount});
                };

                //FUNKCJA ODPOWIADAJACA ZA ZAMKNIECIE OKNA I USUNIECIE DANYCH POPRZEZ NACISNIECIE PRZYCISKU ANULUJ (FORMULARZ DODANIA PRODUKTOW DO KOSZYKA)
                $scope.cancel = function() {
                    $scope.bookTitle = '';
                    $scope.quantity = '';
                    $scope.data_device = '';
                    $scope.showBasket = false;
                };



                //FUNKCJA KTORA WYSWIETLA PODSUMOWNIE ZAMOWIENIA PO KLIKNIECIU "TWOJ KOSZYK" W NAGLOWKU
                $scope.showSummary = function() {
                    var cancelSumm = document.getElementById("summary-table");
                    cancelSumm.style.display = "block";
                };

                //FUNKCJA KTORA ZAMYKA OKNO PODSUMOWNANIA ZAMOWIENIA PO KLIKNIECIU W IKONKE "X"
                $scope.cancelSummary = function() {
                    var cancelSumm = document.getElementById("summary-table");
                    cancelSumm.style.display = "none";
                };

                //FUNKCJA KTORA ZAMYKA FORMULARZ DODANIA PRODUKTOW DO KOSZYKA PO KLIKNIECIU W IKONKE "X"
                $scope.closeBasketForm = function() {
                    var cloBasForm = document.getElementById("myForm");
                    cloBasForm.style.display = "none";
                };


                //FUNKCJA WYSZUKUJACA PO DWOCH KOLUMNACH (TITLE, AUTHOR)
                $scope.searchTxt = function(a) {
                   
                    $scope.BookAuthor = a;
                    

                    $scope.tytul = a;
                            var j=0;
                            var k=0;
                     
                    for(var i=0; i<$scope.books.length; i++) {

                        if($scope.books[i].author == $scope.BookAuthor) {
                            $scope.a = $scope.BookAuthor;
                            break;
                        } else if($scope.books[i].title == $scope.tytul) {
                            $scope.a = $scope.tytul;
                            break;
                        } else  {
                            $scope.a = '';
                        }
                    }

                    return $scope.a;
                }
    }]);

})();



