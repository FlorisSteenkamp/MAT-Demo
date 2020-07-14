
function showDelModal($uibModal: any) {
    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'html/modals/del.html',
        resolve: {},
        controller: function($scope: any, $uibModalInstance: any) {
            
            $scope.ok = function() {
                $uibModalInstance.close(); 
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        },
    });
        
    return modalInstance.result
    /*.then(function() { 
        //
    })*/;
}


export { showDelModal };
