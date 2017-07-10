angular.module('pdf')
  .directive('pdfViewerToolbar', [
    'pdfDelegate',
  function(pdfDelegate) {
    return {
      restrict: 'E',
      template:
        '<div class="clearfix mb2 white bg-blue">' +
          '<div class="left">' +
            '<a id="btnPrev" href=""' +
              'ng-click="prev()"' +
              'class="button" style="padding-top:15px"><img src="img/icon-ant.png" alt="<" style="width:32px;height:32px;">' +
            '</a>' +
            '<a id="btnNext" href=""' +
              'ng-click="next()"' +
              'class="button" style="padding-top:15px"><img src="img/icon-next.png" alt="<" style="width:32px;height:32px;">' +
            '</a>' +
            '<a id="btnZoomIn" href=""' +
              'ng-click="zoomIn()"' +
              'class="button" style="padding-top:15px"><img src="img/icon-zoom-in.png" alt="<" style="width:32px;height:32px;">' +
            '</a>' +
            '<a id="btnZoomOut" href=""' +
              'ng-click="zoomOut()"' +
              'class="button" style="padding-top:15px"><img src="img/icon-zoom-out.png" alt="<" style="width:32px;height:32px;">' +
            '</a>' +
            '<span style="border-color: transparent;background-color: #f8f8f8;color: #444;position: relative;display: inline-block;margin: 0;padding: 10px;min-width: 52px;min-height: 47px;border-width: 1px;border-style: solid;border-radius: 4px;vertical-align: top;text-align: center;text-overflow: ellipsis;font-size: 16px;line-height: 42px;cursor: pointer;height: 65px;">'+
            '<label id="lblPagePdf" style="padding-left: 7px;font-weight: bold;" >Página</label> ' +
            '<input id="txtPagePdf" type="text" style="border:1px solid black; display:inline !important; width: 50px; text-align:center;font-weight: bold;"' +
              'min=1 ng-model="currentPage" ng-change="goToPage()" ' +
               'style="width: 10%"> ' +
            ' <label id="lblLastPagePdf" style="font-weight: bold;">/ {{pageCount}}</label></span>' +
          '</div>' +
        '</div>',
      scope: { pageCount: '=' },
      link: function(scope, element, attrs) {
        var id = attrs.delegateHandle;
        scope.currentPage = 1;

        scope.prev = function() {
          pdfDelegate
            .$getByHandle(id)
            .prev();
          updateCurrentPage();
        };
        scope.next = function() {
          pdfDelegate
            .$getByHandle(id)
            .next();
          updateCurrentPage();
        };
        scope.zoomIn = function() {
          pdfDelegate
            .$getByHandle(id)
            .zoomIn();
        };
        scope.zoomOut = function() {
          pdfDelegate
            .$getByHandle(id)
            .zoomOut();
        };
        scope.rotate = function() {
          pdfDelegate
            .$getByHandle(id)
            .rotate();
        };
        scope.goToPage = function() {
          pdfDelegate
            .$getByHandle(id)
            .goToPage(scope.currentPage);
        };

        var updateCurrentPage = function() {
          scope.currentPage = pdfDelegate
                                .$getByHandle(id)
                                .getCurrentPage();
        };
      }
    };
}]);
