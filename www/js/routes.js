angular.module('app.routes', [])

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider


                    .state('inicio', {
                        url: '/inicio',
                        templateUrl: 'templates/inicio.html',
                        controller: 'inicioCtrl'
                    })

                    .state('menu', {
                        url: '/menu-lateral',
                        templateUrl: 'templates/menu.html',
                        abstract: true,
                        controller:'menuCtrl'
                    })

//      .state('menu.inicio', {
//    url: '/inicio',
//    views: {
//      'side-menu21': {
//        templateUrl: 'templates/inicio.html',
//        controller: 'inicioCtrl'
//      }
//    }
//  })

                    .state('menu.perfil', {
                        url: '/perfil',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/perfil.html',
                                controller: 'perfilCtrl'
                            }
                        }
                    })


//  .state('menu.legalizacion', {
//    url: '/legalizacion',
//    views: {
//      'side-menu21': {
//        templateUrl: 'templates/legalizacion.html',
//        controller: 'legalizacionCtrl'
//      }
//    }
//  })


                    .state('menu.legalizacion', {
                        url: "/legalizacion",
                        abstract: true,
                        views: {
                            'side-menu21': {
                                templateUrl: "templates/legalizacion.html",
                            }
                        }
                    })

                    .state('menu.legalizacion.abiertas', {
                        url: "/abiertas",
                        views: {
                            'abiertas-tab': {
                                templateUrl: "templates/legalizaciones/abiertas.html",
                                controller: 'legalizacionAbiertaCtrl'
                            }
                        }
                    })

                    .state('menu.legalizacion.pendientes', {
                        url: "/pendientes",
                        views: {
                            'pendientes-tab': {
                                templateUrl: "templates/legalizaciones/pendientes.html",
                                controller: 'legalizacionPendienteCtrl'
                            }
                        }
                    })


                    .state('menu.legalizacion.enviadas', {
                        url: "/enviadas",
                        views: {
                            'enviadas-tab': {
                                templateUrl: "templates/legalizaciones/enviadas.html",
                                controller: 'legalizacionEnviadaCtrl'
                            }
                        }
                    })


                    .state('menu.legalizacion.aprobadas', {
                        url: "/aprobadas",
                        views: {
                            'aprobadas-tab': {
                                templateUrl: "templates/legalizaciones/aprobadas.html",
                                controller: 'legalizacionAprobadaCtrl'
                            }
                        }
                    })

                    .state('menu.nueva-legalizacion', {
                        url: '/nueva-legalizacion',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/legalizaciones/nueva-legalizacion.html',
                                controller: 'nuevaLegalizacionCtrl'
                            }
                        }
                    })

                    .state('menu.sap', {
                        url: '/sap',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/sap.html',
                                controller: 'sapCtrl'
                            }
                        }
                    })

                    .state('menu.nuevo-perfil', {
                        url: '/nuevo-perfil',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/perfiles/nuevo-perfil.html',
                                controller: 'nuevoPerfilCtrl'
                            }
                        }
                    })

                    .state('menu.perfil-detalle', {
                        url: '/perfil/:id_perfil',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/perfiles/perfil-detalle.html',
                                controller: 'perfilDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.legalizacion.abiertas-detalle', {
                        url: "/abiertas/:id_legalizacion",
                        views: {
                            'abiertas-tab': {
                                templateUrl: "templates/legalizaciones/legalizacion-detalle.html",
                                controller: 'legalizacionDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.legalizacion.pendientes-detalle', {
                        url: "/pendientes/:id_legalizacion",
                        views: {
                            'pendientes-tab': {
                                templateUrl: "templates/legalizaciones/legalizacion-detalle.html",
                                controller: 'legalizacionDetalleCtrl'
                            }
                        }
                    })
                    .state('menu.legalizacion.enviadas-detalle', {
                        url: "/enviadas/:id_legalizacion",
                        views: {
                            'enviadas-tab': {
                                templateUrl: "templates/legalizaciones/legalizacion-detalle.html",
                                controller: 'legalizacionDetalleCtrl'
                            }
                        }
                    })
                    .state('menu.legalizacion.aprobadas-detalle', {
                        url: "/aprobadas/:id_legalizacion",
                        views: {
                            'aprobadas-tab': {
                                templateUrl: "templates/legalizaciones/legalizacion-detalle.html",
                                controller: 'legalizacionDetalleCtrl'
                            }
                        }
                    })



                    .state('menu.legalizacion.factura', {
                        url: "/factura/:id_legalizacion",
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/facturas/factura.html',
                                controller: 'facturaCtrl'
                            }
                        }
                    })

                    .state('menu.legalizacion.nueva-factura', {
                        url: "/nueva-factura/:id_legalizacion",
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/facturas/nueva-factura.html',
                                controller: 'nuevaFacturaCtrl'
                            }
                        }
                    })

                    .state('menu.legalizacion.gasto', {
                        url: "/gasto/:id_factura",
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/gastos/gasto.html',
                                controller: 'gastoCtrl'
                            }
                        }
                    })

                    .state('menu.legalizacion.nuevo-gasto', {
                        url: "/nuevo-gasto/:id_factura",
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/gastos/nuevo-gasto.html',
                                controller: 'nuevoGastoCtrl'
                            }
                        }
                    })


                    .state('menu.legalizacion.gasto-detalle', {
                        url: '/gasto-detalle/:id_gasto',
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/gastos/gasto-detalle.html',
                                controller: 'gastoDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.legalizacion.factura-detalle', {
                        url: '/factura-detalle/:id_factura',
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/facturas/factura-detalle.html',
                                controller: 'facturaDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion', {
                        url: "/requisicion",
                        abstract: true,
                        views: {
                            'side-menu21': {
                                templateUrl: "templates/requisicion.html",
                            }
                        }
                    })

                    .state('menu.requisicion.abiertas', {
                        url: "/abiertas",
                        views: {
                            'abiertas-tab': {
                                templateUrl: "templates/requisiciones/abiertas.html",
                                controller: 'requisicionAbiertaCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.pendientes', {
                        url: "/pendientes",
                        views: {
                            'pendientes-tab': {
                                templateUrl: "templates/requisiciones/pendientes.html",
                                controller: 'requisicionPendienteCtrl'
                            }
                        }
                    })


                    .state('menu.requisicion.enviadas', {
                        url: "/enviadas",
                        views: {
                            'enviadas-tab': {
                                templateUrl: "templates/requisiciones/enviadas.html",
                                controller: 'requisicionEnviadaCtrl'
                            }
                        }
                    })


                    .state('menu.requisicion.poraprobar', {
                        url: "/poraprobar",
                        views: {
                            'poraprobar-tab': {
                                templateUrl: "templates/requisiciones/poraprobar.html",
                                controller: 'requisicionAprobacionCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.confirmadas', {
                        url: "/confirmadas",
                        views: {
                            'confirmadas-tab': {
                                templateUrl: "templates/requisiciones/confirmadas.html",
                                controller: 'requisicionConfirmadaCtrl'
                            }
                        }
                    })

                    .state('menu.nueva-requisicion', {
                        url: '/nueva-requisicion',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/requisiciones/nueva-requisicion.html',
                                controller: 'nuevaRequisicionCtrl'
                            }
                        }
                    })



                    .state('menu.requisicion.item', {
                        url: "/item/:id_requisicion",
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/items/item.html',
                                controller: 'itemCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.nuevo-item', {
                        url: "/nuevo-item/:id_requisicion",
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/items/nuevo-item.html',
                                controller: 'nuevoItemCtrl'
                            }
                        }
                    })


                    .state('menu.requisicion.consultarstock', {
                        url: "/consultarstock/:id_item/:id_perfil/:id_requisicion",
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/items/consultar-stock.html',
                                controller: 'stockCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.abiertas-detalle', {
                        url: "/abiertas/:id_requisicion",
                        views: {
                            'abiertas-tab': {
                                templateUrl: "templates/requisiciones/requisicion-detalle.html",
                                controller: 'requisicionDetalleCtrl'
                            }
                        }
                    })


                    .state('menu.requisicion.pendientes-detalle', {
                        url: "/pendientes/:id_requisicion",
                        views: {
                            'pendientes-tab': {
                                templateUrl: "templates/requisiciones/requisicion-detalle.html",
                                controller: 'requisicionDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.aprobadas-detalle', {
                        url: "/aprobadas/:id_requisicion",
                        views: {
                            'aprobadas-tab': {
                                templateUrl: "templates/requisiciones/requisicion-detalle.html",
                                controller: 'requisicionDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.enviadas-detalle', {
                        url: "/enviadas/:id_requisicion",
                        views: {
                            'enviadas-tab': {
                                templateUrl: "templates/requisiciones/requisicion-detalle.html",
                                controller: 'requisicionDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.poraprobar-detalle', {
                        url: "/poraprobar/:id_requisicion",
                        views: {
                            'poraprobar-tab': {
                                templateUrl: "templates/requisiciones/requisicion-detalle.html",
                                controller: 'requisicionDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.item-detalle', {
                        url: '/item-detalle/:id_item',
                        views: {
                            'abiertas-tab': {
                                templateUrl: 'templates/items/item-detalle.html',
                                controller: 'itemDetalleCtrl'
                            }
                        }
                    })


                    .state('menu.requisicion.item-detalle-aprobacion', {
                        url: '/item-detalle-aprobacion/:id_item',
                        views: {
                            'poraprobar-tab': {
                                templateUrl: 'templates/items/item-detalle-aprobacion.html',
                                controller: 'itemDetalleCtrl'
                            }
                        }
                    })

                    .state('menu.requisicion.item-aprobacion', {
                        url: "/item/:id_requisicion",
                        views: {
                            'poraprobar-tab': {
                                templateUrl: 'templates/items/item-aprobacion.html',
                                controller: 'itemCtrl'
                            }
                        }
                    })
                    
                     .state('menu.requisicion.consultarstockAprobacion', {
                        url: "/consultarstock/:id_item/:id_perfil",
                        views: {
                            'poraprobar-tab': {
                                templateUrl: 'templates/items/consultar-stock.html',
                                controller: 'stockCtrl'
                            }
                        }
                    })
                    ;




            $urlRouterProvider.otherwise('/inicio');
        });