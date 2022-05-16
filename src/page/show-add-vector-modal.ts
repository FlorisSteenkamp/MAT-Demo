import { SvgVector } from './svg-vector.js';


function showAddVectorModal($uibModal: any) {
    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'html/modals/add-vector.html',
        resolve: {},
        controller: function(
                $scope: any, $uibModalInstance: any) {
            
            let model: SvgVector = {
                name: '',
                url: '',
            }
            $scope.model = model;

            $scope.ok = function() {
                $uibModalInstance.close(model); 
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


export { showAddVectorModal };
