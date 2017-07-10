angular.module('app.controllers', ['ionic'])

        .controller('inicioCtrl', function ($scope, Sincronizar, $rootScope, $ionicModal, Perfiles, Items) {

            $scope.sincronizar;
            $scope.sincronizacion = function () {
                Sincronizar.getSincronizar().then(function (sincronizar) {
                    $scope.sincronizar = angular.copy(sincronizar);
                    console.log($scope.sincronizar);
                    if ($scope.sincronizar !== null) {
                        Sincronizar.getUltimaFecha().then(function (fecha) {

                            $rootScope.datos = {
                                fecha: fecha};
                        });
                        Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {

                            $scope.respuesta = angular.copy(resultado);
                            Sincronizar.putGastosWeb($scope.respuesta[1]).then(function (resultado) {
                                console.log('ingreso Gastos');
                            });

                            if (resultado[0] === '1') {
                                alert('Sincronizacion exitosa');
                            } else {
                                alert('Error al sincronizar');
                            }
                            Sincronizar.getUltimaFecha().then(function (fecha) {
                                $rootScope.datos = {
                                    fecha: fecha};
                            });
                            $rootScope.$emit('recargarPerfiles');
                            $rootScope.$emit('recargarPerfilReqAux');
                            $rootScope.$emit('recargarLegalizaciones');
                            $rootScope.$emit('recargarLegalizacionesPendientes');
                            $rootScope.$emit('recargarLegalizacionesAprobadas');
                            $rootScope.$emit('recargarLegalizacionesEnviadas');
                            $rootScope.$emit('recargarRequisiciones');
                            $rootScope.$emit('recargarRequisicionesPendiente');
                            $rootScope.$emit('recargarRequisicionesConfirmada');
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                            $rootScope.$emit('recargarRequisicionesEnviada');
                        });
                    }
                });
            };


            $scope.$on('$destroy');
            $ionicModal.fromTemplateUrl('informacion-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirInformacionModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarInformacionModal = function () {
                $scope.modal.hide();
            };
            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });

            $ionicModal.fromTemplateUrl('ayuda-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modalAyuda = modal;
            });
            $scope.abrirAyudaModal = function () {
                $scope.modalAyuda.show();
            };
            $scope.cerrarAyudaModal = function () {
                $scope.modalAyuda.hide();
            };

            $scope.pdfUrl = 'img/manual.pdf';

            $scope.linkSAP = function () {

                window.open('http://www.consensussa.com/es/soluciones-sap/sap-business-one', '_system');
            };
        })

        .controller('perfilCtrl', function ($scope, Perfiles, $rootScope) {
            $scope.perfiles;
            Perfiles.getPerfiles().then(function (perfiles) {
                $scope.perfiles = angular.copy(perfiles);
                for (var i = 0; i < $scope.perfiles.length; i++) {
                    if (Number($scope.perfiles[i].enviaRequisicion) === 0) {
                        $scope.perfiles[i].enviaRequisicionAux = 'No';
                    } else {
                        $scope.perfiles[i].enviaRequisicionAux = 'Si';
                    }
                }
            });
//            $rootScope.$on('recargarPerfiles', function (event, data) {
//                $scope.perfiles = [];
//                Perfiles.getPerfiles().then(function (perfiles) {
//                    $scope.perfiles = angular.copy(perfiles);
//                });
//            });


            var objRecargarPerfiles = $rootScope.$on('recargarPerfiles', function (event, data) {
                $scope.perfiles = null;
                $scope.perfiles = [];
                try {
                    Perfiles.getPerfiles().then(function (perfiles) {
                        $scope.perfiles = angular.copy(perfiles);
                        for (var i = 0; i < $scope.perfiles.length; i++) {
                            if (Number($scope.perfiles[i].enviaRequisicion) === 0) {
                                $scope.perfiles[i].enviaRequisicionAux = 'No';
                            } else {
                                $scope.perfiles[i].enviaRequisicionAux = 'Si';
                            }
                        }
                    });
                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarPerfiles);


            $scope.habilitar = function (perfil) {
                var record = angular.copy(perfil);
                record.sincronizado = '';
                record.entryPerfilMovil = perfil.entryPerfilMovil;
                record.entryPerfilWeb = '';
                record.docPerfil = perfil.docPerfil;
                record.perfil = perfil.perfil;
                record.emailPerfil = perfil.emailPerfil;
                record.proyecto = perfil.proyecto;
                record.sn = '';
                record.company = perfil.company;
                record.aprobador = perfil.aprobador;
                record.dimension1 = perfil.dimension1.valor;
                record.dimension2 = perfil.dimension2.valor;
                record.dimension3 = '';
                record.dimension4 = '';
                record.dimension5 = '';
                record.habilitado = perfil.habilitado;
                record.idGrupo = perfil.idGrupo.idGrupo;
                record.enviaRequisicion = perfil.enviaRequisicion;
                record.aprobadorRequisicion = perfil.aprobadorRequisicion;
                record.dimensionSap = perfil.dimensionSap;
                record.almacenSap = perfil.almacenSap;
                record.proyectoSap = perfil.proyectoSap;
                record.entryPerfilWebAprobador = perfil.entryPerfilWebAprobador;
                record.entryPerfilMovilAprobador = perfil.entryPerfilMovilAprobador;

                Perfiles.habilitar(record).then(function (resultado) {
                    $scope.respuesta = angular.copy(resultado);
                    if (resultado === '1') {
                        alert('Se ha actualizado el registro satisfactoriamente');
                    } else {
                        alert('Error al actualizar el registro');
                    }
                    $rootScope.$emit('recargarPerfiles');
                });
            };
        })


        .controller('legalizacionCtrl', function ($scope) {

        })

        .controller('sapCtrl', function ($scope) {

        })

        .controller('menuCtrl', function ($scope, Sincronizar, $rootScope, $ionicModal, Perfiles, Items, $state) {
            $scope.sincronizar;
    $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.sincronizacion = function () {
                Sincronizar.getSincronizar().then(function (sincronizar) {
                    $scope.sincronizar = angular.copy(sincronizar);
                    console.log($scope.sincronizar);
                    if ($scope.sincronizar !== null) {
                        Sincronizar.getUltimaFecha().then(function (fecha) {

                            $rootScope.datos = {
                                fecha: fecha};
                        });
                        Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {

                            $scope.respuesta = angular.copy(resultado);
                            Sincronizar.putGastosWeb($scope.respuesta[1]).then(function (resultado) {
                                console.log('ingreso Gastos');
                            });

                            if (resultado[0] === '1') {
                                alert('Sincronizacion exitosa');
                            } else {
                                alert('Error al sincronizar');
                            }
                            Sincronizar.getUltimaFecha().then(function (fecha) {
                                $rootScope.datos = {
                                    fecha: fecha};
                            });
                            $rootScope.$emit('recargarPerfiles');
                            $rootScope.$emit('recargarPerfilReqAux');
                            $rootScope.$emit('recargarLegalizaciones');
                            $rootScope.$emit('recargarLegalizacionesPendientes');
                            $rootScope.$emit('recargarLegalizacionesAprobadas');
                            $rootScope.$emit('recargarLegalizacionesEnviadas');
                            $rootScope.$emit('recargarRequisiciones');
                            $rootScope.$emit('recargarRequisicionesPendiente');
                            $rootScope.$emit('recargarRequisicionesConfirmada');
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                            $rootScope.$emit('recargarRequisicionesEnviada');
                        });
                    }
                });
            };

            $scope.sincronizacionReq = function (tabReq) {
                Sincronizar.getSincronizar().then(function (sincronizar) {
                    $scope.sincronizar = angular.copy(sincronizar);
                    console.log($scope.sincronizar);
                    if ($scope.sincronizar !== null) {
                        Sincronizar.getUltimaFecha().then(function (fecha) {

                            $rootScope.datos = {
                                fecha: fecha};
                        });
                        Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {

                            $scope.respuesta = angular.copy(resultado);
                            Sincronizar.putGastosWeb($scope.respuesta[1]).then(function (resultado) {
                                console.log('ingreso Gastos');
                            });

                            Sincronizar.getUltimaFecha().then(function (fecha) {
                                $rootScope.datos = {
                                    fecha: fecha};
                            });

                            console.log('menu.requisicion.' + tabReq);
                            $state.go('menu.requisicion.' + tabReq);

                            $rootScope.$emit('recargarRequisicionesConfirmada');
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                            $rootScope.$emit('recargarRequisicionesEnviada');


                        });
                    }
                });
            };
        })

        .controller('nuevoPerfilCtrl', function ($scope, Perfiles, Sincronizar, $rootScope, $state, $cordovaNetwork, GruposGasto, $ionicModal) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
//            $scope.nuevoPerfilForm.$setPristine();
//            $scope.nuevoPerfilForm.$setUntouched();
            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: '',
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                entryPerfilWebAprobador: '',
                entryPerfilMovilAprobador: ''
            };
//            $scope.nuevoPerfilForm.$setPristine();
//            $scope.nuevoPerfilForm.$setUntouched();
            $scope.respuesta = '';
            $scope.respuestaId = '';
            $scope.tiposGto = '';
            $scope.opcion_sap = [
                {opcion: "si", valor: "1"},
                {opcion: "no", valor: "0"}
            ];
            $scope.txt_verificacion = "";
            $scope.opcion_autorizacion = [
                {opcion: "si", valor: "1"},
                {opcion: "no", valor: "0"}
            ];

            $scope.opcion_enviaRequisicion = [
                {opcion: "si", valor: "1"},
                {opcion: "no", valor: "0"}
            ];

            $scope.opcion_grupo_gto = [
                {opcion: "Grupo 01", valor: "1"},
                {opcion: "Grupo 02", valor: "2"},
                {opcion: "Grupo 03", valor: "3"},
                {opcion: "Grupo 04", valor: "4"},
                {opcion: "Grupo 05", valor: "5"},
                {opcion: "Grupo 06", valor: "6"},
                {opcion: "Grupo 07", valor: "7"},
                {opcion: "Grupo 08", valor: "8"}
            ];

            $scope.perfil.dimension1 = $scope.opcion_sap[0];
            $scope.perfil.dimension2 = $scope.opcion_autorizacion[0];
            $scope.perfil.idGrupo = $scope.opcion_grupo_gto[0];
            $scope.perfil.enviaRequisicion = $scope.opcion_enviaRequisicion[0];

            $ionicModal.fromTemplateUrl('cargando-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirCargandoModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarCargandoModal = function () {
                $scope.modal.hide();
            };

            $scope.crear = function (perfil, form) {
                var camposInvalidos = 0;
                for (var x in $scope.nuevoPerfilForm) {
                    var prop = $scope.nuevoPerfilForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }
                if (camposInvalidos !== 1) {
                    Perfiles.getPerfilNombre($scope.perfil).then(function (perfilNombre) {
                        var recordNombre = angular.copy(perfilNombre);
                        console.log(recordNombre);
                        if (recordNombre === null || recordNombre === '' || typeof (recordNombre) === "undefined") {
                            Perfiles.getPerfilNombreWeb($scope.perfil).then(function (perfilNombre2) {
                                var recordNombre2 = angular.copy(perfilNombre2);
                                console.log(recordNombre2);
                                if (recordNombre2 === '0' || recordNombre2 === 0 || typeof (recordNombre2) === "undefined") {

                                    function CalcularDv2(nit1)
                                    {
                                        var vpri, x, y, i, z, dv1, resplit;
                                        if (isNaN(nit1))
                                        {
                                            return -1;
                                        } else {
                                            vpri = new Array(15);
                                            x = 0;
                                            y = 0;

                                            console.log(String(nit1));
                                            resplit = String(nit1).split("");
                                            z = resplit.length;

                                            vpri[0] = 3;
                                            vpri[1] = 7;
                                            vpri[2] = 13;
                                            vpri[3] = 17;
                                            vpri[4] = 19;
                                            vpri[5] = 23;
                                            vpri[6] = 29;
                                            vpri[7] = 37;
                                            vpri[8] = 41;
                                            vpri[9] = 43;
                                            vpri[10] = 47;
                                            vpri[11] = 53;
                                            vpri[12] = 59;
                                            vpri[13] = 67;
                                            vpri[14] = 71;
                                            for (i = 0; i < z; i++)
                                            {
                                                y = resplit[i];
                                                x += (y * vpri[z - (i + 1)]);
                                            }
                                            y = x % 11;

                                            if (y > 1)
                                            {
                                                dv1 = 11 - y;
                                            } else {
                                                dv1 = y;
                                            }
                                            return dv1;
                                        }
                                    }
                                    $scope.perfil.company = $scope.perfil.company + '-' + CalcularDv2($scope.perfil.company);
                                    console.log($scope.perfil.company);


                                    $scope.abrirCargandoModal();
                                    $scope.estilolink = {
                                        pointerEvents: 'none',
                                        cursor: 'default'
                                    };

                                    Perfiles.getCompany($scope.perfil.company, $scope.perfil.proyecto).then(function (company) {
                                        $scope.perfil.dimension4 = angular.copy(company);
                                        if ($scope.perfil.dimension4 !== null && $scope.perfil.dimension4 !== '') {
                                            $scope.perfil.company = $scope.perfil.dimension4;
                                            console.log('llego company perfil');
                                            console.log($scope.perfil.company);
                                            if ($scope.perfil.company !== '1' && $scope.perfil.company !== 1) {
                                                console.log('entrolog si');
                                                // $scope.perfil.company = $scope.perfil.dimension4['EntryComWeb'];

                                                if (perfil.docPerfil !== '') {
                                                    var record = angular.copy(perfil);
                                                    console.log('entro compania existe y no es demo - perfil');

                                                    if (Number(perfil.idGrupo.valor) === 1 || Number(perfil.idGrupo.valor === 2) || Number(perfil.idGrupo.valor === 3) ||
                                                            Number(perfil.idGrupo.valor === 4) || Number(perfil.idGrupo.valor === 5) || Number(perfil.idGrupo.valor === 6) ||
                                                            Number(perfil.idGrupo.valor === 7) || Number(perfil.idGrupo.valor === 8) ||
                                                            perfil.idGrupo.valor === '1' || perfil.idGrupo.valor === '2' || perfil.idGrupo.valor === '3' ||
                                                            perfil.idGrupo.valor === '4' || perfil.idGrupo.valor === '5' || perfil.idGrupo.valor === '6' ||
                                                            perfil.idGrupo.valor === '7' || perfil.idGrupo.valor === '8') {

                                                        console.log('entro perfil valor grupo');

                                                        console.log($scope.perfil);

                                                        GruposGasto.getGrupoGastoAsociado($scope.perfil).then(function (grupoGtoAsociado) {

                                                            console.log('entro consulta perfil valor grupo');
                                                            perfil.idGrupo.valor = grupoGtoAsociado.IdGrupo;

                                                            console.log('perfil valor grupo');
                                                            console.log(grupoGtoAsociado);
                                                            console.log(perfil.idGrupo.valor);


                                                            record.sincronizado = '';
                                                            record.entryPerfilMovil = '';
                                                            record.entryPerfilWeb = '';
                                                            record.docPerfil = perfil.docPerfil;
                                                            record.perfil = perfil.perfil;
                                                            record.emailPerfil = perfil.emailPerfil;
                                                            record.proyecto = perfil.proyecto;
                                                            record.sn = '';
                                                            record.company = $scope.perfil.company;
                                                            record.aprobador = perfil.aprobador;
                                                            record.dimension1 = perfil.dimension1.valor;
                                                            record.dimension2 = perfil.dimension2.valor;
                                                            record.dimension3 = '';
                                                            record.dimension4 = '';
                                                            record.dimension5 = '';
                                                            record.habilitado = '';
                                                            record.idGrupo = perfil.idGrupo.valor;
                                                            record.enviaRequisicion = '';
                                                            record.aprobadorRequisicion = '';
                                                            record.dimensionSap = '';
                                                            record.almacenSap = '';
                                                            record.proyectoSap = '';
                                                            record.entryPerfilWebAprobador = '';
                                                            record.entryPerfilMovilAprobador = '';

                                                            console.log('record 299');
                                                            console.log(record);

                                                            Perfiles.postPerfil(record).then(function (resultado) {
                                                                console.log('resultado record 299');
                                                                $scope.respuestaId = angular.copy(resultado);
                                                                $scope.isOnline = $cordovaNetwork.isOnline();
                                                                console.log($scope.isOnline);
                                                                document.addEventListener("deviceready", function () {

                                                                    var type = $cordovaNetwork.getNetwork();
                                                                    $scope.isOnline = $cordovaNetwork.isOnline();
                                                                    $scope.isOffline = $cordovaNetwork.isOffline();
                                                                    // listen for Online event
                                                                    $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                                                                        var onlineState = networkState;
                                                                    });
                                                                    // listen for Offline event
                                                                    $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                                                                        var offlineState = networkState;
                                                                    });
                                                                }, false);
                                                                if ($scope.isOnline === true) {
                                                                    Sincronizar.getSincronizarPerfil($scope.respuestaId).then(function (resultado2) {
                                                                        var record2 = angular.copy(resultado2);
                                                                        console.log(record2);
                                                                        Perfiles.putPerfil(record2).then(function (resultado) {
                                                                            $scope.respuesta = angular.copy(resultado);
                                                                            $scope.cerrarCargandoModal();
                                                                            if (resultado === '1') {
                                                                                alert('Se ha actualizado el registro satisfactoriamente');
                                                                            } else {
                                                                                alert('Error al actualizar el registro');
                                                                            }
                                                                            $scope.perfil = {
                                                                                sincronizado: '',
                                                                                entryPerfilMovil: '',
                                                                                entryPerfilWeb: '',
                                                                                docPerfil: '',
                                                                                perfil: '',
                                                                                emailPerfil: '',
                                                                                proyecto: '',
                                                                                sn: '',
                                                                                company: '',
                                                                                aprobador: '',
                                                                                dimension1: '',
                                                                                dimension2: '',
                                                                                dimension3: '',
                                                                                dimension4: '',
                                                                                dimension5: '',
                                                                                habilitado: '',
                                                                                idGrupo: '',
                                                                                enviaRequisicion: '',
                                                                                aprobadorRequisicion: '',
                                                                                dimensionSap: '',
                                                                                almacenSap: '',
                                                                                proyectoSap: '',
                                                                                entryPerfilWebAprobador: '',
                                                                                entryPerfilMovilAprobador: ''
                                                                            };
                                                                            $scope.estilolink = {
                                                                                pointerEvents: 'auto',
                                                                                cursor: 'default'
                                                                            };
                                                                            form.$setPristine();
                                                                            form.$setUntouched();
                                                                            $rootScope.$emit('recargarPerfiles');
                                                                            $rootScope.$emit('recargarPerfilAux');
                                                                            alert('Se ha creado el perfil con éxito');
                                                                            $state.go('menu.perfil');
                                                                        });
                                                                    });
                                                                } else {
                                                                    $scope.perfil = {
                                                                        sincronizado: '',
                                                                        entryPerfilMovil: '',
                                                                        entryPerfilWeb: '',
                                                                        docPerfil: '',
                                                                        perfil: '',
                                                                        emailPerfil: '',
                                                                        proyecto: '',
                                                                        sn: '',
                                                                        company: '',
                                                                        aprobador: '',
                                                                        dimension1: '',
                                                                        dimension2: '',
                                                                        dimension3: '',
                                                                        dimension4: '',
                                                                        dimension5: '',
                                                                        habilitado: '',
                                                                        idGrupo: '',
                                                                        enviaRequisicion: '',
                                                                        aprobadorRequisicion: '',
                                                                        dimensionSap: '',
                                                                        almacenSap: '',
                                                                        proyectoSap: '',
                                                                        entryPerfilWebAprobador: '',
                                                                        entryPerfilMovilAprobador: ''
                                                                    };
                                                                    $scope.cerrarCargandoModal();
                                                                    $scope.estilolink = {
                                                                        pointerEvents: 'auto',
                                                                        cursor: 'default'
                                                                    };
                                                                    form.$setPristine();
                                                                    form.$setUntouched();
                                                                    $rootScope.$emit('recargarPerfiles');
                                                                    $rootScope.$emit('recargarPerfilAux');
                                                                    alert('Se ha creado el perfil con éxito');
                                                                    alert('No hay conexión con la red, recuerde sincronizar más tarde');
                                                                    $state.go('menu.perfil');
                                                                }
                                                            });
                                                        });
                                                    } else {
                                                        console.log('no entro grupos, compania existe y no es demo - perfil ');
                                                    }
                                                } else {
//                    perfil.$update();
                                                }
                                            } else {
                                                console.log('entrolog no');
                                                Perfiles.postPerfil($scope.perfil).then(function (resultado) {
                                                    $scope.respuesta = angular.copy(resultado);
                                                    $scope.cerrarCargandoModal();
                                                    $scope.perfil = {
                                                        sincronizado: '',
                                                        entryPerfilMovil: '',
                                                        entryPerfilWeb: '',
                                                        docPerfil: '',
                                                        perfil: '',
                                                        emailPerfil: '',
                                                        proyecto: '',
                                                        sn: '',
                                                        company: '',
                                                        aprobador: '',
                                                        dimension1: '',
                                                        dimension2: '',
                                                        dimension3: '',
                                                        dimension4: '',
                                                        dimension5: '',
                                                        habilitado: '',
                                                        idGrupo: '',
                                                        enviaRequisicion: '',
                                                        aprobadorRequisicion: '',
                                                        dimensionSap: '',
                                                        almacenSap: '',
                                                        proyectoSap: '',
                                                        entryPerfilWebAprobador: '',
                                                        entryPerfilMovilAprobador: ''
                                                    };
                                                    $scope.estilolink = {
                                                        pointerEvents: 'auto',
                                                        cursor: 'default'
                                                    };
                                                    form.$setPristine();
                                                    form.$setUntouched();
                                                    $rootScope.$emit('recargarPerfiles');
                                                    $rootScope.$emit('recargarPerfilAux');
                                                    alert('Se ha creado el perfil con éxito');
                                                    $state.go('menu.perfil');
                                                });
                                            }

                                        } else {
                                            console.log($scope.perfil);
                                            Perfiles.postCompany($scope.perfil.company, $scope.perfil.proyecto).then(function (company) {
                                                $scope.perfil.company = company ['EntryComWeb'];
                                                if ($scope.perfil.company !== '1' && $scope.perfil.company !== 1) {

                                                    Perfiles.postGruposGtoWeb($scope.perfil.company).then(function (gruposGto) {
                                                        $scope.gruposGto = gruposGto;

                                                        Perfiles.postTiposGto($scope.perfil.company).then(function (tiposGto) {
                                                            $scope.tiposGto = tiposGto;
                                                            if (camposInvalidos !== 1) {
                                                                if (perfil.docPerfil !== '') {
                                                                    var record = angular.copy(perfil);

                                                                    if (perfil.idGrupo.valor === 1 || perfil.idGrupo.valor === 2 || perfil.idGrupo.valor === 3 ||
                                                                            perfil.idGrupo.valor === 4 || perfil.idGrupo.valor === 5 || perfil.idGrupo.valor === 6 ||
                                                                            perfil.idGrupo.valor === 7 || perfil.idGrupo.valor === 8 ||
                                                                            perfil.idGrupo.valor === '1' || perfil.idGrupo.valor === '2' || perfil.idGrupo.valor === '3' ||
                                                                            perfil.idGrupo.valor === '4' || perfil.idGrupo.valor === '5' || perfil.idGrupo.valor === '6' ||
                                                                            perfil.idGrupo.valor === '7' || perfil.idGrupo.valor === '8') {
                                                                        GruposGasto.getGrupoGastoAsociado($scope.perfil).then(function (grupoGtoAsociado) {
                                                                            perfil.idGrupo.valor = grupoGtoAsociado.IdGrupo;


                                                                            record.sincronizado = '';
                                                                            record.entryPerfilMovil = '';
                                                                            record.entryPerfilWeb = '';
                                                                            record.docPerfil = perfil.docPerfil;
                                                                            record.perfil = perfil.perfil;
                                                                            record.emailPerfil = perfil.emailPerfil;
                                                                            record.proyecto = perfil.proyecto;
                                                                            record.sn = '';
                                                                            record.company = perfil.company;
                                                                            record.aprobador = perfil.aprobador;
                                                                            record.dimension1 = perfil.dimension1.valor;
                                                                            record.dimension2 = perfil.dimension2.valor;
                                                                            record.dimension3 = '';
                                                                            record.dimension4 = '';
                                                                            record.dimension5 = '';
                                                                            record.habilitado = '';
                                                                            record.idGrupo = perfil.idGrupo.valor;
                                                                            record.enviaRequisicion = '';
                                                                            record.aprobadorRequisicion = '';
                                                                            record.dimensionSap = perfil.dimensionSap;
                                                                            record.almacenSap = perfil.almacenSap;
                                                                            record.proyectoSap = perfil.proyectoSap;
                                                                            record.entryPerfilWebAprobador = perfil.entryPerfilWebAprobador;
                                                                            record.entryPerfilMovilAprobador = perfil.entryPerfilMovilAprobador;

                                                                            Perfiles.postPerfil(record).then(function (resultado) {
                                                                                $scope.respuestaId = angular.copy(resultado);
                                                                                $scope.isOnline = $cordovaNetwork.isOnline();
                                                                                console.log($scope.isOnline);
                                                                                document.addEventListener("deviceready", function () {

                                                                                    var type = $cordovaNetwork.getNetwork();
                                                                                    $scope.isOnline = $cordovaNetwork.isOnline();
                                                                                    $scope.isOffline = $cordovaNetwork.isOffline();
                                                                                    // listen for Online event
                                                                                    $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                                                                                        var onlineState = networkState;
                                                                                    });
                                                                                    // listen for Offline event
                                                                                    $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                                                                                        var offlineState = networkState;
                                                                                    });
                                                                                }, false);
                                                                                if ($scope.isOnline === true) {
                                                                                    Sincronizar.getSincronizarPerfil($scope.respuestaId).then(function (resultado2) {
                                                                                        var record2 = angular.copy(resultado2);
                                                                                        console.log(record2);
                                                                                        Perfiles.putPerfil(record2).then(function (resultado) {
                                                                                            $scope.respuesta = angular.copy(resultado);
                                                                                            $scope.cerrarCargandoModal();
                                                                                            if (resultado === '1') {
                                                                                                alert('Se ha actualizado el registro satisfactoriamente');
                                                                                            } else {
                                                                                                alert('Error al actualizar el registro');
                                                                                            }
                                                                                            $scope.perfil = {
                                                                                                sincronizado: '',
                                                                                                entryPerfilMovil: '',
                                                                                                entryPerfilWeb: '',
                                                                                                docPerfil: '',
                                                                                                perfil: '',
                                                                                                emailPerfil: '',
                                                                                                proyecto: '',
                                                                                                sn: '',
                                                                                                company: '',
                                                                                                aprobador: '',
                                                                                                dimension1: '',
                                                                                                dimension2: '',
                                                                                                dimension3: '',
                                                                                                dimension4: '',
                                                                                                dimension5: '',
                                                                                                habilitado: '',
                                                                                                idGrupo: '',
                                                                                                enviaRequisicion: '',
                                                                                                aprobadorRequisicion: '',
                                                                                                dimensionSap: '',
                                                                                                almacenSap: '',
                                                                                                proyectoSap: '',
                                                                                                entryPerfilWebAprobador: '',
                                                                                                entryPerfilMovilAprobador: ''
                                                                                            };
                                                                                            $scope.estilolink = {
                                                                                                pointerEvents: 'auto',
                                                                                                cursor: 'default'
                                                                                            };
                                                                                            form.$setPristine();
                                                                                            form.$setUntouched();
                                                                                            $rootScope.$emit('recargarPerfiles');
                                                                                            $rootScope.$emit('recargarPerfilAux');
                                                                                            alert('Se ha creado el perfil con éxito');
                                                                                            $state.go('menu.perfil');
                                                                                        });
                                                                                    });
                                                                                } else {
                                                                                    $scope.perfil = {
                                                                                        sincronizado: '',
                                                                                        entryPerfilMovil: '',
                                                                                        entryPerfilWeb: '',
                                                                                        docPerfil: '',
                                                                                        perfil: '',
                                                                                        emailPerfil: '',
                                                                                        proyecto: '',
                                                                                        sn: '',
                                                                                        company: '',
                                                                                        aprobador: '',
                                                                                        dimension1: '',
                                                                                        dimension2: '',
                                                                                        dimension3: '',
                                                                                        dimension4: '',
                                                                                        dimension5: '',
                                                                                        habilitado: '',
                                                                                        idGrupo: '',
                                                                                        enviaRequisicion: '',
                                                                                        aprobadorRequisicion: '',
                                                                                        dimensionSap: '',
                                                                                        almacenSap: '',
                                                                                        proyectoSap: '',
                                                                                        entryPerfilWebAprobador: '',
                                                                                        entryPerfilMovilAprobador: ''
                                                                                    };
                                                                                    $scope.estilolink = {
                                                                                        pointerEvents: 'auto',
                                                                                        cursor: 'default'
                                                                                    };
                                                                                    form.$setPristine();
                                                                                    form.$setUntouched();
                                                                                    $rootScope.$emit('recargarPerfiles');
                                                                                    $rootScope.$emit('recargarPerfilAux');
                                                                                    alert('Se ha creado el perfil con éxito');
                                                                                    alert('No hay conexión con la red, recuerde sincronizar más tarde');
                                                                                    $state.go('menu.perfil');
                                                                                }
                                                                            });
                                                                        });
                                                                    }
                                                                } else {
//                    perfil.$update();
                                                                }
                                                            } else {
                                                                alert('Error: Uno o más campos son inválidos');
                                                            }
                                                        });
                                                    });
                                                } else {
                                                    Perfiles.postPerfil($scope.perfil).then(function (resultado) {
                                                        $scope.respuesta = angular.copy(resultado);
                                                        $scope.cerrarCargandoModal();
                                                        $scope.perfil = {
                                                            sincronizado: '',
                                                            entryPerfilMovil: '',
                                                            entryPerfilWeb: '',
                                                            docPerfil: '',
                                                            perfil: '',
                                                            emailPerfil: '',
                                                            proyecto: '',
                                                            sn: '',
                                                            company: '',
                                                            aprobador: '',
                                                            dimension1: '',
                                                            dimension2: '',
                                                            dimension3: '',
                                                            dimension4: '',
                                                            dimension5: '',
                                                            habilitado: '',
                                                            idGrupo: '',
                                                            enviaRequisicion: '',
                                                            aprobadorRequisicion: '',
                                                            dimensionSap: '',
                                                            almacenSap: '',
                                                            proyectoSap: '',
                                                            entryPerfilWebAprobador: '',
                                                            entryPerfilMovilAprobador: ''
                                                        };
                                                        $scope.estilolink = {
                                                            pointerEvents: 'auto',
                                                            cursor: 'default'
                                                        };
                                                        form.$setPristine();
                                                        form.$setUntouched();
                                                        $rootScope.$emit('recargarPerfiles');
                                                        $rootScope.$emit('recargarPerfilAux');
                                                        alert('Se ha creado el perfil con éxito');
                                                        $state.go('menu.perfil');
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    alert('El nombre del perfil ya existe en Web, ingrese uno nuevo');
                                }
                            });
                        } else {
                            alert('El nombre del perfil ya existe en movil, ingrese uno nuevo');
                        }
                    });
                } else {
                    alert('Error: Uno o más campos son inválidos');
                    $scope.cerrarCargandoModal();
                }

            };
        })

        .controller('nuevaLegalizacionCtrl', function ($scope, $rootScope, Legalizaciones, Perfiles, $state, $ionicModal) {

            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.legalizacion = {
                sincronizado: '',
                entryLegMovil: '',
                cargado: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDLeg: '',
                noAprobacion: '',
                valor: '',
                entryLegWeb: ''
            };
            $scope.crearleg = function (legalizacion, form) {
                var camposInvalidos = 0;
                var randomString = '1';
                for (var i = 0; i < 5; i++) {
                    randomString += Math.floor((Math.random() * 10));
                }

                for (var x in $scope.nuevalegalizacionForm) {
                    var prop = $scope.nuevalegalizacionForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }

                if (camposInvalidos !== 1) {
                    if (legalizacion.descripcion !== '') {
                        var record = angular.copy(legalizacion);
                        record.sincronizado = '';
                        record.entryLegMovil = '';
                        record.cargado = '';
                        record.descripcion = legalizacion.descripcion;
                        record.entryPerfilMovil = legalizacion.entryPerfilMovil.entryPerfilMovil;
                        record.estado = '';
                        record.fechaAutorizacion = '';
                        record.fechaSincronizacion = '';
                        record.iDLeg = '';
                        record.noAprobacion = randomString;
                        record.valor = '';
                        record.entryLegWeb = '';
                        Legalizaciones.postLegalizacion(record.descripcion, record.entryPerfilMovil).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $scope.legalizacion = {
                                sincronizado: '',
                                entryLegMovil: '',
                                cargado: '',
                                descripcion: '',
                                entryPerfilMovil: '',
                                estado: '',
                                fechaAutorizacion: '',
                                fechaSincronizacion: '',
                                iDLeg: '',
                                noAprobacion: '',
                                valor: '',
                                entryLegWeb: ''
                            };
                            $rootScope.$emit('recargarLegalizaciones');
                            alert('Se ha creado la legalización con éxito');
                            $scope.legalizacion.entryPerfilMovil = $scope.opcion_perfil[0].perfilGrupo;
                            form.$setPristine();
                            form.$setUntouched();
                            $state.go('menu.legalizacion.abiertas');
                        });
                    } else {

//                    perfil.$update();
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
//                }
            };
            Perfiles.getPerfilesHabilitados().then(function (perfiles) {
                $scope.opcion_perfil = angular.copy(perfiles);
                console.log($scope.opcion_perfil);
                $scope.legalizacion.entryPerfilMovil = $scope.opcion_perfil[0].perfilGrupo;
            });
            $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                viewData.enableBack = true;
            });


            var objRecargarPerfilAux = $rootScope.$on('recargarPerfilAux', function (event, data) {
                $scope.perfiles = null;
                $scope.perfiles = [];
                $scope.opcion_perfil = null;
                $scope.opcion_perfil = [];
                try {
                    Perfiles.getPerfilesHabilitados().then(function (perfiles) {
                        $scope.opcion_perfil = angular.copy(perfiles);
                        console.log($scope.opcion_perfil);
                        $scope.legalizacion.entryPerfilMovil = $scope.opcion_perfil[0].perfilGrupo;
                    });
                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarPerfilAux);
        })

        .controller('legalizacionAbiertaCtrl', function ($scope, Legalizaciones, Perfiles, Sincronizar, $rootScope, $state, $cordovaNetwork, $ionicModal) {
            $scope.legalizaciones;
            $rootScope.pulsacion = 0;
            $scope.isOffline;
            $scope.irfactura = function (legalizacion) {
                if (legalizacion.entryLegMovil !== null) {
                    $state.go('menu.legalizacion.factura', {id_legalizacion: legalizacion.entryLegMovil});
                }
            };
            $scope.legalizacion = {
                sincronizado: '',
                entryLegMovil: '',
                cargado: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDLeg: '',
                noAprobacion: '',
                valor: '',
                entryLegWeb: '',
                valorAux: ''
            };

            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: '',
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                entryPerfilWebAprobador: '',
                entryPerfilMovilAprobador: ''
            };

            $ionicModal.fromTemplateUrl('cargando-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirCargandoModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarCargandoModal = function () {
                $scope.modal.hide();
            };


            Legalizaciones.getLegalizaciones('abierto').then(function (legalizaciones) {
                $scope.legalizaciones = null;
                $scope.legalizaciones = angular.copy(legalizaciones);
                if ($scope.legalizaciones !== null && $scope.legalizaciones !== "") {
                    console.log($scope.legalizaciones);
                    for (var i = 0; i < $scope.legalizaciones.length; i++) {
                        $scope.formatNumber = {
                            separador: ".", // separador para los miles
                            sepDecimal: ',', // separador para los decimales
                            formatear: function (num) {
                                num += '';
                                var splitStr = num.split('.');
                                var splitLeft = splitStr[0];
                                var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                var regx = /(\d+)(\d{3})/;
                                while (regx.test(splitLeft)) {
                                    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                }
                                return this.simbol + splitLeft + splitRight;
                            },
                            new : function (num, simbol) {
                                this.simbol = simbol || '';
                                return this.formatear(num);
                            }
                        };
                        $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                    }
                }

            });
            var objRecargarLegalizaciones = $rootScope.$on('recargarLegalizaciones', function (event, data) {
                $scope.legalizaciones = null;
                $scope.legalizaciones = [];
                try {
                    Legalizaciones.getLegalizaciones('abierto').then(function (legalizaciones) {
                        $scope.legalizaciones = angular.copy(legalizaciones);
                        for (var i = 0; i < $scope.legalizaciones.length; i++) {
                            $scope.formatNumber = {
                                separador: ".", // separador para los miles
                                sepDecimal: ',', // separador para los decimales
                                formatear: function (num) {
                                    num += '';
                                    var splitStr = num.split('.');
                                    var splitLeft = splitStr[0];
                                    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                    var regx = /(\d+)(\d{3})/;
                                    while (regx.test(splitLeft)) {
                                        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                    }
                                    return this.simbol + splitLeft + splitRight;
                                },
                                new : function (num, simbol) {
                                    this.simbol = simbol || '';
                                    return this.formatear(num);
                                }
                            };
                            $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                        }
                        console.log('recargarLegalizacionesAbiertas 1');
                    });

                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarLegalizaciones);
            $scope.enviar;

            $scope.enviarLegalizacion = function (legalizacionAux) {
                $scope.isOnline = $cordovaNetwork.isOnline();
                console.log($scope.isOnline);
                document.addEventListener("deviceready", function () {

                    var type = $cordovaNetwork.getNetwork();
                    $scope.isOnline = $cordovaNetwork.isOnline();
                    $scope.isOffline = $cordovaNetwork.isOffline();
                    // listen for Online event
                    $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                        var onlineState = networkState;
                    });
                    // listen for Offline event
                    $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                        var offlineState = networkState;
                    });
                }, false);
                if ($scope.isOnline === true) {

                    Sincronizar.getSincronizar().then(function (sincronizar) {
                        $scope.sincronizar = angular.copy(sincronizar);
                        console.log($scope.sincronizar);
                        if ($scope.sincronizar !== null) {
                            Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {
                                $scope.respuesta = angular.copy(resultado);


                                Legalizaciones.getLegalizacion(legalizacionAux.entryLegMovil).then(function (legalizacion) {
                                    $scope.legalizacion = angular.copy(legalizacion);
                                    if ($scope.legalizacion !== null && $scope.legalizacion.entryLegMovil !== '') {
                                        console.log($scope.legalizacion);
                                        if (Number($scope.legalizacion.Valor) > 0) {

                                            $scope.abrirCargandoModal();
                                            $scope.estilolink = {
                                                pointerEvents: 'none',
                                                cursor: 'default'
                                            };

                                            $scope.idTransaccion = null;
                                            Sincronizar.getTransaccion().then(function (resultTransaccion) {
                                                $scope.idTransaccion = angular.copy(resultTransaccion);
                                                if ($scope.idTransaccion !== null) {
                                                    Sincronizar.getEnviarLegalizacion($scope.legalizacion, $scope.idTransaccion).then(function (legalizacion) {
                                                        $scope.enviar = angular.copy(legalizacion);
                                                        console.log($scope.enviar);
                                                        if ($scope.enviar !== null) {
                                                            Sincronizar.putEnviarLegalizacion($scope.enviar).then(function (resultado) {
                                                                $scope.respuesta = angular.copy(resultado);
                                                                $scope.legalizaciones = null;
                                                                console.log($scope.respuesta);

                                                                Legalizaciones.getLegalizaciones('abierto').then(function (legalizaciones) {
                                                                    $scope.estadoLegalizaciones = angular.copy(legalizaciones);
                                                                    console.log($scope.estadoLegalizaciones);
                                                                    $scope.cerrarCargandoModal();

                                                                    if ($scope.respuesta === '1') {
                                                                        $scope.estilolink = {
                                                                            pointerEvents: 'auto',
                                                                            cursor: 'default'
                                                                        };
                                                                        alert($scope.enviar = 'Legalización Enviada');

                                                                        //                                                var millisecondsToWait = 3000;
//                                                setTimeout(function () {
                                                                        $rootScope.$emit('recargarGastos');

                                                                        $rootScope.$emit('recargarFacturas');

                                                                        $rootScope.$emit('recargarLegalizacionesPendientes');

                                                                        $rootScope.$emit('recargarLegalizacionesAprobadas');

                                                                        $rootScope.$emit('recargarLegalizaciones');

                                                                        console.log($scope.legalizaciones);
//                                                }, millisecondsToWait);

                                                                        console.log($scope.legalizaciones);

                                                                    } else {
                                                                        $scope.estilolink = {
                                                                            pointerEvents: 'auto',
                                                                            cursor: 'default'
                                                                        };
                                                                        alert('Error en envío');

                                                                        $rootScope.$emit('recargarGastos');

                                                                        $rootScope.$emit('recargarFacturas');

                                                                        $rootScope.$emit('recargarLegalizacionesPendientes');

                                                                        $rootScope.$emit('recargarLegalizacionesAprobadas');

                                                                        $rootScope.$emit('recargarLegalizaciones');

                                                                        console.log($scope.legalizaciones);
                                                                    }

                                                                });


                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            alert('Debe ingresar valores a la legalizacion');
                                        }
                                    } else {
                                        alert('Error en legalizacion');
                                    }
                                });

                            });
                        }
                    });
                } else {
                    alert('No existe conexión con la red, intente mas tarde');
                }
            };

            $scope.eliminarLegalizacion = function (legalizacionAux) {
                if (legalizacionAux.entryLegMovil !== null) {
                    Legalizaciones.deleteLegalizacion(legalizacionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la legalización con exito');
                        } else {
                            alert('Error al eliminar legalización');
                        }
                        $rootScope.$emit('recargarGastos');
                        $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarLegalizaciones');
                        console.log('recargarEliminarLegalizacion 5');
                    });
                }
            };
        })

        .controller('legalizacionPendienteCtrl', function ($scope, Legalizaciones, Sincronizar, $rootScope, $ionicModal) {
            $scope.legalizaciones;
            Legalizaciones.getLegalizaciones('pendiente').then(function (legalizaciones) {
                $scope.legalizaciones = null;
//                $rootScope.$emit('recargarLegalizacionesPendientes');
                $scope.legalizaciones = angular.copy(legalizaciones);

                for (var i = 0; i < $scope.legalizaciones.length; i++) {
                    $scope.formatNumber = {
                        separador: ".", // separador para los miles
                        sepDecimal: ',', // separador para los decimales
                        formatear: function (num) {
                            num += '';
                            var splitStr = num.split('.');
                            var splitLeft = splitStr[0];
                            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                            var regx = /(\d+)(\d{3})/;
                            while (regx.test(splitLeft)) {
                                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                            }
                            return this.simbol + splitLeft + splitRight;
                        },
                        new : function (num, simbol) {
                            this.simbol = simbol || '';
                            return this.formatear(num);
                        }
                    };
                    $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                }
            });
            $scope.legalizacion = {
                sincronizado: '',
                entryLegMovil: '',
                cargado: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDLeg: '',
                noAprobacion: '',
                valor: '',
                entryLegWeb: ''
            };
            var objRecargarLegalizaciones = $rootScope.$on('recargarLegalizacionesPendientes', function (event, data) {
                $scope.legalizaciones = null;
                try {
                    Legalizaciones.getLegalizaciones('pendiente').then(function (legalizaciones) {
                        $scope.legalizaciones = angular.copy(legalizaciones);
                        for (var i = 0; i < $scope.legalizaciones.length; i++) {
                            $scope.formatNumber = {
                                separador: ".", // separador para los miles
                                sepDecimal: ',', // separador para los decimales
                                formatear: function (num) {
                                    num += '';
                                    var splitStr = num.split('.');
                                    var splitLeft = splitStr[0];
                                    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                    var regx = /(\d+)(\d{3})/;
                                    while (regx.test(splitLeft)) {
                                        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                    }
                                    return this.simbol + splitLeft + splitRight;
                                },
                                new : function (num, simbol) {
                                    this.simbol = simbol || '';
                                    return this.formatear(num);
                                }
                            };
                            $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                        }
                        //  $rootScope.$emit('recargarLegalizaciones');
                        console.log('recargarLegalizacionesPendientes 2');
                    });
                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarLegalizaciones);
            $ionicModal.fromTemplateUrl('aprobar-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirAprobarModal = function (legalizacionAux) {
                $scope.modal.show();
                $scope.legalizacion.entryLegMovil = legalizacionAux.entryLegMovil;
                $scope.legalizacion.entryLegWeb = legalizacionAux.entryLegWeb;
            };
            $scope.cerrarAprobarModal = function () {
                $scope.modal.hide();
            };
            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });

            $scope.reenviarEmail = function (legalizacion) {
                $scope.isDisabled = true;
                Sincronizar.getReenviarEmail(legalizacion).then(function (resultado) {
                    var millisecondsToWait = 5000;
                    setTimeout(function () {
                        $scope.legalizacion.noAprobacion = '';
                        $scope.isDisabled = false;
                        alert('Reenvio exitoso');
                    }, millisecondsToWait);
                });
            };

            $scope.verificarAprobacion = function () {
                Sincronizar.getVerificarAprobacion($scope.legalizacion).then(function (resultado) {
                    var respuesta = angular.copy(resultado);
                    if (respuesta === '1' || respuesta === 1) {
                        Legalizaciones.putLegalizacionAprobacion($scope.legalizacion).then(function (resultado) {

                            Legalizaciones.getLegalizaciones('pendientes').then(function (legalizaciones) {
                                $scope.estadoLegalizaciones = angular.copy(legalizaciones);
                                console.log($scope.estadoLegalizaciones);


//                                $scope.estilolink = {
//                                    pointerEvents: 'auto',
//                                    cursor: 'default'
//                                };
                                $scope.respuesta = angular.copy(resultado);
                                console.log($scope.respuesta);
                                if (resultado !== null) {
                                    $scope.legalizacion.noAprobacion = '';
                                    alert($scope.enviar = 'Confirmada la Aprobación');
                                } else {
                                    alert($scope.enviar = 'Error en el envío');
                                }
                                $scope.cerrarAprobarModal();
                            });
                        });

                    } else {
                        alert('El código de verificación es incorrecto');
                    }
                    $rootScope.$emit('recargarGastos');
                    $rootScope.$emit('recargarFacturas');
                    $rootScope.$emit('recargarLegalizacionesAprobadas');
                    $rootScope.$emit('recargarLegalizacionesPendientes');

//                    $rootScope.$emit('recargarLegalizacionesAprobadas');
//                    $rootScope.$emit('recargarLegalizacionesPendientes');

                });
            };

            $scope.eliminarLegalizacion = function (legalizacionAux) {
                if (legalizacionAux.entryLegMovil !== null) {
                    Legalizaciones.deleteLegalizacion(legalizacionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la legalización con exito');
                        } else {
                            alert('Error al eliminar legalización');
                        }
                        $rootScope.$emit('recargarGastos');
                        $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarLegalizacionesPendientes');
                    });
                }
            };
        })

        .controller('legalizacionEnviadaCtrl', function ($scope, Legalizaciones, $rootScope) {
            $scope.legalizaciones;
            Legalizaciones.getLegalizaciones('enviado').then(function (legalizaciones) {
                $scope.legalizaciones = null;
                $scope.legalizaciones = angular.copy(legalizaciones);
                for (var i = 0; i < $scope.legalizaciones.length; i++) {
                    $scope.formatNumber = {
                        separador: ".", // separador para los miles
                        sepDecimal: ',', // separador para los decimales
                        formatear: function (num) {
                            num += '';
                            var splitStr = num.split('.');
                            var splitLeft = splitStr[0];
                            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                            var regx = /(\d+)(\d{3})/;
                            while (regx.test(splitLeft)) {
                                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                            }
                            return this.simbol + splitLeft + splitRight;
                        },
                        new : function (num, simbol) {
                            this.simbol = simbol || '';
                            return this.formatear(num);
                        }
                    };
                    $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                }
            });
            $scope.legalizacion = {
                sincronizado: '',
                entryLegMovil: '',
                cargado: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDLeg: '',
                noAprobacion: '',
                valor: '',
                entryLegWeb: ''
            };
            var objRecargarLegalizaciones = $rootScope.$on('recargarLegalizacionesEnviadas', function (event, data) {
                $scope.legalizaciones = null;
                try {
                    Legalizaciones.getLegalizaciones('enviado').then(function (legalizaciones) {
                        $scope.legalizaciones = angular.copy(legalizaciones);
                        for (var i = 0; i < $scope.legalizaciones.length; i++) {
                            $scope.formatNumber = {
                                separador: ".", // separador para los miles
                                sepDecimal: ',', // separador para los decimales
                                formatear: function (num) {
                                    num += '';
                                    var splitStr = num.split('.');
                                    var splitLeft = splitStr[0];
                                    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                    var regx = /(\d+)(\d{3})/;
                                    while (regx.test(splitLeft)) {
                                        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                    }
                                    return this.simbol + splitLeft + splitRight;
                                },
                                new : function (num, simbol) {
                                    this.simbol = simbol || '';
                                    return this.formatear(num);
                                }
                            };
                            $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                            console.log('recargarLegalizacionesSAP 4');
                        }
                    });
                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarLegalizaciones);

            $scope.eliminarLegalizacion = function (legalizacionAux) {
                if (legalizacionAux.entryLegMovil !== null) {
                    Legalizaciones.deleteLegalizacion(legalizacionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la legalización con exito');
                        } else {
                            alert('Error al eliminar legalización');
                        }
                        $rootScope.$emit('recargarGastos');
                        $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarLegalizacionesEnviadas');
                    });
                }
            };
        })

        .controller('legalizacionAprobadaCtrl', function ($scope, Legalizaciones, $rootScope) {
            $scope.legalizaciones;
            Legalizaciones.getLegalizaciones('aprobado').then(function (legalizaciones) {
                $scope.legalizaciones = null;
                $scope.legalizaciones = angular.copy(legalizaciones);
                for (var i = 0; i < $scope.legalizaciones.length; i++) {
                    $scope.formatNumber = {
                        separador: ".", // separador para los miles
                        sepDecimal: ',', // separador para los decimales
                        formatear: function (num) {
                            num += '';
                            var splitStr = num.split('.');
                            var splitLeft = splitStr[0];
                            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                            var regx = /(\d+)(\d{3})/;
                            while (regx.test(splitLeft)) {
                                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                            }
                            return this.simbol + splitLeft + splitRight;
                        },
                        new : function (num, simbol) {
                            this.simbol = simbol || '';
                            return this.formatear(num);
                        }
                    };
                    $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                }
            });
            $scope.legalizacion = {
                sincronizado: '',
                entryLegMovil: '',
                cargado: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDLeg: '',
                noAprobacion: '',
                valor: '',
                entryLegWeb: ''
            };
            var objRecargarLegalizaciones = $rootScope.$on('recargarLegalizacionesAprobadas', function (event, data) {
                $scope.legalizaciones = null;
                try {
                    Legalizaciones.getLegalizaciones('aprobado').then(function (legalizaciones) {
                        $scope.legalizaciones = angular.copy(legalizaciones);
                        for (var i = 0; i < $scope.legalizaciones.length; i++) {
                            $scope.formatNumber = {
                                separador: ".", // separador para los miles
                                sepDecimal: ',', // separador para los decimales
                                formatear: function (num) {
                                    num += '';
                                    var splitStr = num.split('.');
                                    var splitLeft = splitStr[0];
                                    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                    var regx = /(\d+)(\d{3})/;
                                    while (regx.test(splitLeft)) {
                                        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                    }
                                    return this.simbol + splitLeft + splitRight;
                                },
                                new : function (num, simbol) {
                                    this.simbol = simbol || '';
                                    return this.formatear(num);
                                }
                            };
                            $scope.legalizaciones[i].valorAux = $scope.formatNumber.new($scope.legalizaciones[i].valor, "$");
                        }
                        $rootScope.$emit('recargarLegalizacionesPendientes');
                        console.log('recargarLegalizacionesAprobadas 3');
                    });
                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarLegalizaciones);

            $scope.eliminarLegalizacion = function (legalizacionAux) {
                if (legalizacionAux.entryLegMovil !== null) {
                    Legalizaciones.deleteLegalizacion(legalizacionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la legalización con exito');
                        } else {
                            alert('Error al eliminar legalización');
                        }
                        $rootScope.$emit('recargarGastos');
                        $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarLegalizacionesAprobadas');
                    });
                }
            };
        })

        .controller('perfilDetalleCtrl', function ($scope, $stateParams, Perfiles, $rootScope, GruposGasto) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: $stateParams.id_perfil,
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                entryPerfilWebAprobador: '',
                entryPerfilMovilAprobador: '',
                enviaRequisicionAux: ''
            };
            $scope.opcion_sap = [
                {opcion: "si", valor: "1"},
                {opcion: "no", valor: "0"}
            ];
            $scope.txt_verificacion = "";
            $scope.opcion_autorizacion = [
                {opcion: "si", valor: "1"},
                {opcion: "no", valor: "0"}
            ];

            $scope.opcion_grupo_gto;

            if ($scope.perfil.docPerfil !== '') {
                Perfiles.getPerfil($scope.perfil.docPerfil).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    $scope.perfil = {
                        sincronizado: $scope.res.Sincronizado,
                        entryPerfilMovil: $scope.res.EntryPerfilMovil,
                        entryPerfilWeb: $scope.res.EntryPerfilWeb,
                        docPerfil: $scope.res.DocPerfil,
                        perfil: $scope.res.Perfil,
                        emailPerfil: $scope.res.EmailPerfil,
                        proyecto: $scope.res.Proyecto,
                        sn: $scope.res.SN,
                        company: $scope.res.Company,
                        aprobador: $scope.res.Aprobador,
                        dimension1: $scope.res.Dimension1,
                        dimension2: $scope.res.Dimension2,
                        dimension3: $scope.res.Dimension3,
                        dimension4: $scope.res.Dimension4,
                        dimension5: $scope.res.Dimension5,
                        habilitado: $scope.res.Habilitado,
                        nombreCompany: $scope.res.Nombre,
                        idGrupo: $scope.res.IdGrupo,
                        enviaRequisicion: $scope.res.EnviaRequisicion,
                        aprobadorRequisicion: $scope.res.AprobadorRequisicion,
                        dimensionSap: $scope.res.DimensionSap,
                        almacenSap: $scope.res.AlmacenSap,
                        proyectoSap: $scope.res.ProyectoSap,
                        entryPerfilWebAprobador: $scope.res.EntryPerfilWebAprobador,
                        entryPerfilMovilAprobador: $scope.res.EntryPerfilMovilAprobador
                    };

                    console.log($scope.perfil);

                    GruposGasto.getGrupoGastoGto($scope.perfil.idGrupo).then(function (gruposGasto) {

                        $scope.perfil.idGrupo = angular.copy(gruposGasto);
                        $scope.opcion_grupo_gto = angular.copy(gruposGasto);
                        console.log($scope.opcion_grupo_gto);
                    });

                    angular.forEach($scope.opcion_sap, function (clave) {
                        if (clave.valor === $scope.perfil.dimension1) {
                            $scope.perfil.dimension1 = clave;
                        }
                    });
                    angular.forEach($scope.opcion_autorizacion, function (clave) {
                        if (clave.valor === $scope.perfil.dimension2) {
                            $scope.perfil.dimension2 = clave;
                        }
                    });


                    Perfiles.getCompanyId($scope.perfil.company).then(function (resultado) {
                        $scope.perfil.company = resultado;
                    });

                    if (Number($scope.perfil.enviaRequisicion) === 1) {
                        $scope.perfil.enviaRequisicionAux = 'Si';
                    } else {
                        $scope.perfil.enviaRequisicionAux = 'No';
                    }

                    console.log($scope.perfil);

                    $rootScope.$emit('recargarPerfiles');
                });
            } else {
//                    perfil.$update();
            }

            $scope.editar = function (perfil) {
                var camposInvalidos = 0;
                for (var x in $scope.detallePerfilForm) {
                    var prop = $scope.detallePerfilForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }
                ;

                if (camposInvalidos !== 1) {
                    Perfiles.getPerfil(perfil.entryPerfilMovil).then(function (resultadoPe) {

                        var record = angular.copy(perfil);
                        var record2 = angular.copy(resultadoPe);

                        console.log(record2);
                        record.sincronizado = record2.Sincronizado;
                        record.entryPerfilMovil = perfil.entryPerfilMovil;
                        record.entryPerfilWeb = record2.EntryPerfilWeb;
                        record.docPerfil = perfil.docPerfil;
                        record.perfil = perfil.perfil;
                        record.emailPerfil = perfil.emailPerfil;
                        record.proyecto = perfil.proyecto;
                        record.sn = '';
                        record.company = perfil.company;
                        record.aprobador = perfil.aprobador;
                        record.dimension1 = perfil.dimension1.valor;
                        record.dimension2 = perfil.dimension2.valor;
                        record.dimension3 = record2.Dimension3;
                        record.dimension4 = record2.Dimension4;
                        record.dimension5 = record2.Dimension5;
                        record.habilitado = record2.Habilitado;
                        record.enviaRequisicion = record2.EnviaRequisicion;
                        record.aprobadorRequisicion = record2.AprobadorRequisicion;
                        record.dimensionSap = record2.DimensionSap;
                        record.almacenSap = record2.AlmacenSap;
                        record.proyectoSap = record2.ProyectoSap;
                        record.entryPerfilWebAprobador = record2.EntryPerfilWebAprobador;
                        record.entryPerfilMovilAprobador = record2.EntryPerfilMovilAprobador;
                        record.idGrupo = record2.IdGrupo;
                        Perfiles.putPerfil(record).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            if (resultado === '1') {
                                alert('Se ha actualizado el registro satisfactoriamente');
                            } else {
                                alert('Error al actualizar el registro');
                            }
                            $rootScope.$emit('recargarPerfiles');
                        });
                    });
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }

            };
        })


        .controller('facturaCtrl', function ($scope, $stateParams, Facturas, Legalizaciones, $rootScope, $state) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.irgasto = function (factura) {
                if (factura.entryFactMovil !== null) {
                    $state.go('menu.legalizacion.gasto', {id_factura: factura.entryFactMovil});
                }
            };
            $scope.legalizacion = {
                sincronizado: '',
                entryLegMovil: $stateParams.id_legalizacion,
                cargado: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDLeg: '',
                noAprobacion: '',
                valor: '',
                entryLegWeb: '',
                valorAux: '',
                nombrePerfil: '',
                nombreGrupo: ''
            };
            Legalizaciones.getLegalizacionCabecera($scope.legalizacion.entryLegMovil).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.legalizacion = {
                    sincronizado: $scope.res.Sincronizado,
                    entryLegMovil: $scope.res.EntryLegMovil,
                    cargado: $scope.res.Cargado,
                    descripcion: $scope.res.Descripcion,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    estado: $scope.res.Estado,
                    sn: $scope.res.SN,
                    fechaAutorizacion: $scope.res.FechaAutorizacion,
                    fechaSincronizacion: $scope.res.FechaSincronizacion,
                    iDLeg: $scope.res.IDLeg,
                    noAprobacion: $scope.res.NoAprobacion,
                    valor: $scope.res.Valor,
                    entryLegWeb: $scope.res.EntryLegWeb,
                    valorAux: '',
                    nombrePerfil: $scope.res.Perfil,
                    nombreGrupo: $scope.res.NombreGrupo
                };
                $scope.formatNumber = {
                    separador: ".", // separador para los miles
                    sepDecimal: ',', // separador para los decimales
                    formatear: function (num) {
                        num += '';
                        var splitStr = num.split('.');
                        var splitLeft = splitStr[0];
                        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                        var regx = /(\d+)(\d{3})/;
                        while (regx.test(splitLeft)) {
                            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                        }
                        return this.simbol + splitLeft + splitRight;
                    },
                    new : function (num, simbol) {
                        this.simbol = simbol || '';
                        return this.formatear(num);
                    }
                };
                $scope.legalizacion.valorAux = $scope.formatNumber.new($scope.legalizacion.valor, "$");
            });
            $scope.factura = {
                sincronizado: '',
                entryFactMovil: '',
                entryPerfilMovil: '',
                entryLegMovil: $stateParams.id_legalizacion,
                fecha: '',
                iDLeg: '',
                valor: '',
                moneda: '',
                referencia: '',
                documento: '',
                tipoDoc: '',
                adjunto: '',
                lineLegSAP: '',
                comentarioLine: '',
                subTotalSinImpuesto: '',
                subTotalImpuesto: '',
                nombreSN: '',
                entryFactWeb: ''
            };
            $scope.facturas;
            Facturas.getFacturas($scope.legalizacion.entryLegMovil).then(function (facturas) {
                $scope.facturas = angular.copy(facturas);
                for (var i = 0; i < $scope.facturas.length; i++) {
                    $scope.formatNumber = {
                        separador: ".", // separador para los miles
                        sepDecimal: ',', // separador para los decimales
                        formatear: function (num) {
                            num += '';
                            var splitStr = num.split('.');
                            var splitLeft = splitStr[0];
                            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                            var regx = /(\d+)(\d{3})/;
                            while (regx.test(splitLeft)) {
                                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                            }
                            return this.simbol + splitLeft + splitRight;
                        },
                        new : function (num, simbol) {
                            this.simbol = simbol || '';
                            return this.formatear(num);
                        }
                    };
                    var d = new Date($scope.facturas[i].fecha);
                    $scope.facturas[i].fecha = d.toLocaleDateString();
                    $scope.facturas[i].valorAux = $scope.formatNumber.new($scope.facturas[i].valor, "$");
                }

            });
            var objRecargarFacturas = $rootScope.$on('recargarFacturas', function (event, data) {
                $scope.facturas = [];
                Facturas.getFacturas($scope.legalizacion.entryLegMovil).then(function (facturas) {
                    $scope.facturas = angular.copy(facturas);
                    for (var i = 0; i < $scope.facturas.length; i++) {
                        $scope.formatNumber = {
                            separador: ".", // separador para los miles
                            sepDecimal: ',', // separador para los decimales
                            formatear: function (num) {
                                num += '';
                                var splitStr = num.split('.');
                                var splitLeft = splitStr[0];
                                var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                var regx = /(\d+)(\d{3})/;
                                while (regx.test(splitLeft)) {
                                    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                }
                                return this.simbol + splitLeft + splitRight;
                            },
                            new : function (num, simbol) {
                                this.simbol = simbol || '';
                                return this.formatear(num);
                            }
                        };
                        $scope.facturas[i].valorAux = $scope.formatNumber.new($scope.facturas[i].valor, "$");
                        var d = new Date($scope.facturas[i].fecha);
                        $scope.facturas[i].fecha = d.toLocaleDateString();
                    }

                    Legalizaciones.getLegalizacionCabecera($scope.legalizacion.entryLegMovil).then(function (resultado) {
                        $scope.res = angular.copy(resultado);
                        $scope.legalizacion = {
                            sincronizado: $scope.res.Sincronizado,
                            entryLegMovil: $scope.res.EntryLegMovil,
                            cargado: $scope.res.Cargado,
                            descripcion: $scope.res.Descripcion,
                            entryPerfilMovil: $scope.res.EntryPerfilMovil,
                            estado: $scope.res.Estado,
                            sn: $scope.res.SN,
                            fechaAutorizacion: $scope.res.FechaAutorizacion,
                            fechaSincronizacion: $scope.res.FechaSincronizacion,
                            iDLeg: $scope.res.IDLeg,
                            noAprobacion: $scope.res.NoAprobacion,
                            valor: $scope.res.Valor,
                            entryLegWeb: $scope.res.EntryLegWeb,
                            valorAux: '',
                            nombrePerfil: $scope.res.Perfil,
                            nombreGrupo: $scope.res.NombreGrupo
                        };
                        $scope.formatNumber = {
                            separador: ".", // separador para los miles
                            sepDecimal: ',', // separador para los decimales
                            formatear: function (num) {
                                num += '';
                                var splitStr = num.split('.');
                                var splitLeft = splitStr[0];
                                var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                var regx = /(\d+)(\d{3})/;
                                while (regx.test(splitLeft)) {
                                    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                }
                                return this.simbol + splitLeft + splitRight;
                            },
                            new : function (num, simbol) {
                                this.simbol = simbol || '';
                                return this.formatear(num);
                            }
                        };
                        $scope.legalizacion.valorAux = $scope.formatNumber.new($scope.legalizacion.valor, "$");
                    });
                });
            });
            var objRecargarLegalizacionAux = $rootScope.$on('recargarLegalizacionAux', function (event, data) {
                Legalizaciones.getLegalizacion($scope.legalizacion.entryLegMovil).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    $scope.legalizacion = {
                        sincronizado: $scope.res.Sincronizado,
                        entryLegMovil: $scope.res.EntryLegMovil,
                        cargado: $scope.res.Cargado,
                        descripcion: $scope.res.Descripcion,
                        entryPerfilMovil: $scope.res.EntryPerfilMovil,
                        estado: $scope.res.Estado,
                        sn: $scope.res.SN,
                        fechaAutorizacion: $scope.res.FechaAutorizacion,
                        fechaSincronizacion: $scope.res.FechaSincronizacion,
                        iDLeg: $scope.res.IDLeg,
                        noAprobacion: $scope.res.NoAprobacion,
                        valor: $scope.res.Valor,
                        entryLegWeb: $scope.res.EntryLegWeb,
                        valoAux: '0'
                    };
                    $scope.formatNumber = {
                        separador: ".", // separador para los miles
                        sepDecimal: ',', // separador para los decimales
                        formatear: function (num) {
                            num += '';
                            var splitStr = num.split('.');
                            var splitLeft = splitStr[0];
                            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                            var regx = /(\d+)(\d{3})/;
                            while (regx.test(splitLeft)) {
                                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                            }
                            return this.simbol + splitLeft + splitRight;
                        },
                        new : function (num, simbol) {
                            this.simbol = simbol || '';
                            return this.formatear(num);
                        }
                    };
                    $scope.legalizacion.valorAux = $scope.formatNumber.new($scope.legalizacion.valor, "$");
                });
            });
            $scope.$on('$destroy', objRecargarFacturas);
            $scope.$on('$destroy', objRecargarLegalizacionAux);
            $scope.eliminarfactura = function (factura) {
                if (factura.entryGastoMovil !== '') {
                    var record = angular.copy(factura);
                    record.sincronizado = factura.sincronizado;
                    record.entryFactMovil = factura.entryFactMovil;
                    record.entryPerfilMovil = factura.entryPerfilMovil;
                    record.entryLegMovil = factura.entryLegMovil;
                    record.fecha = factura.fecha;
                    record.iDLeg = factura.iDLeg;
                    record.valor = factura.valor;
                    record.moneda = factura.moneda;
                    record.referencia = factura.referencia;
                    record.documento = factura.documento;
                    record.tipoDoc = factura.tipoDoc;
                    record.adjunto = factura.adjunto;
                    record.lineLegSAP = factura.lineLegSAP;
                    record.comentarioLine = factura.comentarioLine;
                    record.subTotalSinImpuesto = factura.subTotalSinImpuesto;
                    record.subTotalImpuesto = factura.subTotalImpuesto;
                    record.nombreSN = factura.nombreSN;
                    record.entryFactWeb = factura.entryFactWeb;
                    Facturas.deleteFactura(record, $scope.legalizacion).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarLegalizacionAux');
                        $rootScope.$emit('recargarLegalizaciones');
                    });
                } else {
                    //                    perfil.$update();
                }
            };
        })


        .controller('nuevaFacturaCtrl', function ($scope, $stateParams, Facturas, Legalizaciones, $rootScope, $ionicLoading, $ionicModal, $cordovaCamera, $state) {
            $scope.picData;
            $scope.filepathChooser = function () {
                window.plugins.mfilechooser.open([], function (uri) {
                    //Here uri provides the selected file path.
                    console.log('file path', uri);
                    var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URL,
                        sourceType: Camera.PictureSourceType.CAMERA
                    };
                    $scope.picData = 'file://' + uri;
                    $scope.ftLoad = true;
                    console.log($scope.picData);
                    $scope.uploadready = true;
                    $ionicLoading.show({template: '...', duration: 300});
                }, function (error) {
                    console.log('Error', error);
                });
            };
            $scope.convertirImagen = function (ruta) {
                convertFileToDataURLviaFileReader(ruta, function (base) {
                    $scope.factura.adjunto = base;
                    console.log($scope.factura.adjunto);
                    console.log('base:');
                    console.log(base);
                });
                function convertFileToDataURLviaFileReader(url, callback) {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            callback(reader.result);
                        };
                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', url);
                    xhr.send();
                }
            };
            $scope.takePhoto = function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    console.log(imageData);
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    $scope.factura.adjunto = "data:image/jpeg;base64," + imageData;
                    console.log("URI");
                    console.log($scope.imgURI);
                }, function (err) {
                    // An error occured. Show a message to the user
                    console.log("Error");
                    console.log(err);
                });
            };

            $scope.choosePhoto = function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    console.log(imageData);
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    $scope.factura.adjunto = "data:image/jpeg;base64," + imageData;
                    console.log("URI");
                    console.log($scope.imgURI);
                }, function (err) {
                    // An error occured. Show a message to the user
                    console.log("Error");
                    console.log(err);
                });
            };
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            var f = new Date();
            $scope.factura = {
                sincronizado: '',
                entryFactMovil: '',
                entryPerfilMovil: '',
                entryLegMovil: $stateParams.id_legalizacion,
                fecha: '2016-01-01',
                iDLeg: '',
                valor: '',
                moneda: '',
                referencia: '',
                documento: '',
                tipoDoc: '',
                adjunto: '',
                lineLegSAP: '',
                comentarioLine: '',
                subTotalSinImpuesto: '',
                subTotalImpuesto: '',
                nombreSN: '',
                entryFactWeb: ''
            };
            $scope.opcion_tipoDoc = [
                {opcion: "CC", valor: "0"},
                {opcion: "NIT", valor: "1"},
                {opcion: "CE", valor: "2"}];
            $scope.opcion_moneda = [
                {opcion: "COP", valor: "0"},
                {opcion: "USD", valor: "1"},
                {opcion: "EUR", valor: "2"}
            ];
            $scope.factura.tipoDoc = $scope.opcion_tipoDoc[0];
            $scope.factura.moneda = $scope.opcion_moneda[0];
            $scope.legalizacion = null;
//            $ionicModal.fromTemplateUrl('templates/adjunto-modal.html', {
//                scope: $scope,
//                animation: 'slide-in-up'
//            }).then(function (modal) {
//                $scope.modalImagen = modal;
//            });
//
//            $scope.openModalImagen = function () {
//                $scope.modalImagen.show();
//            };
//
//            $scope.closeModalImagen = function () {
//                $scope.modalImagen.hide();
//            };
//
//
//            $scope.confirmarModalImagen = function () {
//                $scope.convertirImagen($scope.picData);
//                $scope.modalImagen.hide();
//            };


            Legalizaciones.getLegalizacionCabecera($scope.factura.entryLegMovil).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.legalizacion = {
                    sincronizado: $scope.res.Sincronizado,
                    entryLegMovil: $scope.res.EntryLegMovil,
                    entryPerfilWeb: $scope.res.EntryPerfilWeb,
                    cargado: $scope.res.Cargado,
                    descripcion: $scope.res.Descripcion,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    estado: $scope.res.Estado,
                    fechaAutorizacion: $scope.res.FechaAutorizacion,
                    fechaSincronizacion: $scope.res.FechaSincronizacion,
                    iDLeg: $scope.res.IDLeg,
                    noAprobacion: $scope.res.NoAprobacion,
                    valor: $scope.res.Valor,
                    entryLegWeb: $scope.res.EntryLegWeb,
                    nombrePerfil: $scope.res.Perfil,
                    nombreGrupo: $scope.res.NombreGrupo
                };
                angular.forEach($scope.opcion_sap, function (clave) {
                    if (clave.valor === $scope.perfil.dimension1) {
                        $scope.perfil.dimension1 = clave;
                    }
                });
                angular.forEach($scope.opcion_autorizacion, function (clave) {
                    if (clave.valor === $scope.perfil.dimension2) {
                        $scope.perfil.dimension2 = clave;
                    }
                });
            });
            $scope.crearfact = function (factura, form) {
                var camposInvalidos = 0;
                for (var x in $scope.nuevaFacturaForm) {
                    var prop = $scope.nuevaFacturaForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }
                ;
                if (camposInvalidos !== 1) {
                    if (factura.entryLegMovil !== '') {
                        var record = angular.copy(factura);
                        record.sincronizado = '';
                        record.entryFactMovil = '';
                        record.entryPerfilMovil = $scope.legalizacion.entryPerfilMovil;
                        record.entryLegMovil = $scope.legalizacion.entryLegMovil;
                        record.fecha = factura.fecha;
                        record.iDLeg = $scope.legalizacion.iDLeg;
                        record.valor = factura.valor;
                        record.moneda = factura.moneda.opcion;
                        record.referencia = factura.referencia;
                        record.documento = factura.documento;
                        record.tipoDoc = factura.tipoDoc.opcion;
                        record.adjunto = factura.adjunto;
                        record.lineLegSAP = '';
                        record.comentarioLine = factura.comentarioLine;
                        record.subTotalSinImpuesto = '';
                        record.subTotalImpuesto = '';
                        record.nombreSN = '';
                        record.entryFactWeb = '';
                        console.log(record);
                        Facturas.postFactura(record, $scope.legalizacion).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $scope.factura = {
                                sincronizado: '',
                                entryFactMovil: '',
                                entryPerfilMovil: '',
                                entryLegMovil: $stateParams.id_legalizacion,
                                fecha: '2016-01-01',
                                iDLeg: '',
                                valor: '',
                                moneda: '',
                                referencia: '',
                                documento: '',
                                tipoDoc: '',
                                adjunto: '',
                                lineLegSAP: '',
                                comentarioLine: '',
                                subTotalSinImpuesto: '',
                                subTotalImpuesto: '',
                                nombreSN: '',
                                entryFactWeb: ''
                            };
                            $scope.imgURI = null;
                            $scope.imgURI = undefined;

                            $rootScope.$emit('recargarFacturas');
                            $rootScope.$emit('recargarLegalizacionAux');
                            form.$setPristine();
                            form.$setUntouched();
                            $state.go('menu.legalizacion.factura', {id_legalizacion: record.entryLegMovil});
                        });
                        alert('Se ha creado la factura con éxito');
                    } else {
                        //                    perfil.$update();
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
            };
        })


        .controller('gastoCtrl', function ($scope, $stateParams, Facturas, Legalizaciones, Gastos, TiposGasto, $rootScope, $state) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.gastos;
            $scope.opcion_tipo_gasto;
            $scope.valorAux;
            $scope.legalizacion;
            $scope.factura = {
                sincronizado: '',
                entryFactMovil: $stateParams.id_factura,
                entryPerfilMovil: '',
                entryLegMovil: '', fecha: '',
                iDLeg: '',
                valor: '',
                moneda: '',
                referencia: '',
                documento: '',
                tipoDoc: '',
                adjunto: '',
                lineLegSAP: '',
                comentarioLine: '',
                subTotalSinImpuesto: '',
                subTotalImpuesto: '',
                nombreSN: '',
                entryFactWeb: ''
            };

            Facturas.getFactura($scope.factura.entryFactMovil).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.legalizacion;
                $scope.factura = {
                    sincronizado: $scope.res.Sincronizado,
                    entryFactMovil: $scope.res.EntryFactMovil,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    entryLegMovil: $scope.res.EntryLegMovil,
                    fecha: $scope.res.Fecha,
                    iDLeg: $scope.res.IDLeg,
                    valor: $scope.res.Valor,
                    moneda: $scope.res.Moneda,
                    referencia: $scope.res.Referencia,
                    documento: $scope.res.Documento,
                    tipoDoc: $scope.res.TipoDoc,
                    adjunto: $scope.res.Adjunto,
                    lineLegSAP: $scope.res.LineLegSAP,
                    comentarioLine: $scope.res.ComentarioLine,
                    subTotalSinImpuesto: $scope.res.SubTotalSinImpuesto,
                    subTotalImpuesto: $scope.res.SubTotalImpuesto,
                    nombreSN: $scope.res.NombreSN,
                    entryFactWeb: $scope.res.EntryFactWeb
                };
                var d = new Date($scope.factura.fecha);
                $scope.factura.fecha = d.toLocaleDateString();
                $scope.formatNumber = {
                    separador: ".", // separador para los miles
                    sepDecimal: ',', // separador para los decimales
                    formatear: function (num) {
                        num += '';
                        var splitStr = num.split('.');
                        var splitLeft = splitStr[0];
                        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                        var regx = /(\d+)(\d{3})/;
                        while (regx.test(splitLeft)) {
                            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                        }
                        return this.simbol + splitLeft + splitRight;
                    },
                    new : function (num, simbol) {
                        this.simbol = simbol || '';
                        return this.formatear(num);
                    }
                };
                $scope.valorAux = $scope.formatNumber.new($scope.factura.valor, "$");

                TiposGasto.getTiposGasto($scope.factura.entryPerfilMovil).then(function (tiposGasto) {
                    $scope.opcion_tipo_gasto = angular.copy(tiposGasto);
                });



                Legalizaciones.getLegalizacionCabecera($scope.factura.entryLegMovil).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    $scope.legalizacion = {
                        sincronizado: $scope.res.Sincronizado,
                        entryLegMovil: $scope.res.EntryLegMovil,
                        entryPerfilWeb: $scope.res.EntryPerfilWeb,
                        cargado: $scope.res.Cargado,
                        descripcion: $scope.res.Descripcion,
                        entryPerfilMovil: $scope.res.EntryPerfilMovil,
                        estado: $scope.res.Estado,
                        fechaAutorizacion: $scope.res.FechaAutorizacion,
                        fechaSincronizacion: $scope.res.FechaSincronizacion,
                        iDLeg: $scope.res.IDLeg,
                        noAprobacion: $scope.res.NoAprobacion,
                        valor: $scope.res.Valor,
                        entryLegWeb: $scope.res.EntryLegWeb,
                        nombrePerfil: $scope.res.Perfil,
                        nombreGrupo: $scope.res.NombreGrupo
                    };
                    angular.forEach($scope.opcion_sap, function (clave) {
                        if (clave.valor === $scope.perfil.dimension1) {
                            $scope.perfil.dimension1 = clave;
                        }
                    });
                    angular.forEach($scope.opcion_autorizacion, function (clave) {
                        if (clave.valor === $scope.perfil.dimension2) {
                            $scope.perfil.dimension2 = clave;
                        }
                    });
                });



            });
            Gastos.getGastos($scope.factura.entryFactMovil).then(function (gastos) {
                $scope.gastos = null;
                $scope.gastos = [];
                $scope.gastos = angular.copy(gastos);
                console.log($scope.gastos);
                if ($scope.gastos !== 2) {
                    for (var i = 0; i < $scope.gastos.length; i++) {
                        angular.forEach($scope.opcion_tipo_gasto, function (clave) {
                            if (Number($scope.gastos[i].tipoGasto) === Number(clave.tipoGasto)) {
                                $scope.gastos[i].tipoGasto = clave;
                            }
                        });
                        $scope.formatNumber = {
                            separador: ".", // separador para los miles
                            sepDecimal: ',', // separador para los decimales
                            formatear: function (num) {
                                num += '';
                                var splitStr = num.split('.');
                                var splitLeft = splitStr[0];
                                var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                var regx = /(\d+)(\d{3})/;
                                while (regx.test(splitLeft)) {
                                    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                }
                                return this.simbol + splitLeft + splitRight;
                            },
                            new : function (num, simbol) {
                                this.simbol = simbol || '';
                                return this.formatear(num);
                            }
                        };
                        $scope.gastos[i].valorAux = $scope.formatNumber.new($scope.gastos[i].valor, "$");
                    }
                }
            });
            var objRecargarGastos = $rootScope.$on('recargarGastos', function (event, data) {

                Gastos.getGastos($scope.factura.entryFactMovil).then(function (gastos) {
                    console.log('entro');
                    $scope.gastos = null;
                    $scope.gastos = [];
                    $scope.gastos = angular.copy(gastos);
                    console.log($scope.gastos);
                    for (var i = 0; i < $scope.gastos.length; i++) {
                        angular.forEach($scope.opcion_tipo_gasto, function (clave) {
                            if (Number($scope.gastos[i].tipoGasto) === Number(clave.tipoGasto)) {
                                $scope.gastos[i].tipoGasto = clave;
                            }
                        });
                        $scope.formatNumber = {
                            separador: ".", // separador para los miles
                            sepDecimal: ',', // separador para los decimales
                            formatear: function (num) {
                                num += '';
                                var splitStr = num.split('.');
                                var splitLeft = splitStr[0];
                                var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                var regx = /(\d+)(\d{3})/;
                                while (regx.test(splitLeft)) {
                                    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                }
                                return this.simbol + splitLeft + splitRight;
                            },
                            new : function (num, simbol) {
                                this.simbol = simbol || '';
                                return this.formatear(num);
                            }
                        };
                        $scope.gastos[i].valorAux = $scope.formatNumber.new($scope.gastos[i].valor, "$");
                    }


                    Legalizaciones.getLegalizacionCabecera($scope.factura.entryLegMovil).then(function (resultado) {
                        $scope.res = angular.copy(resultado);
                        $scope.legalizacion = {
                            sincronizado: $scope.res.Sincronizado,
                            entryLegMovil: $scope.res.EntryLegMovil,
                            entryPerfilWeb: $scope.res.EntryPerfilWeb,
                            cargado: $scope.res.Cargado,
                            descripcion: $scope.res.Descripcion,
                            entryPerfilMovil: $scope.res.EntryPerfilMovil,
                            estado: $scope.res.Estado,
                            fechaAutorizacion: $scope.res.FechaAutorizacion,
                            fechaSincronizacion: $scope.res.FechaSincronizacion,
                            iDLeg: $scope.res.IDLeg,
                            noAprobacion: $scope.res.NoAprobacion,
                            valor: $scope.res.Valor,
                            entryLegWeb: $scope.res.EntryLegWeb,
                            nombrePerfil: $scope.res.Perfil,
                            nombreGrupo: $scope.res.NombreGrupo
                        };
                        angular.forEach($scope.opcion_sap, function (clave) {
                            if (clave.valor === $scope.perfil.dimension1) {
                                $scope.perfil.dimension1 = clave;
                            }
                        });
                        angular.forEach($scope.opcion_autorizacion, function (clave) {
                            if (clave.valor === $scope.perfil.dimension2) {
                                $scope.perfil.dimension2 = clave;
                            }
                        });
                    });

                });
            });
            var objRecargarFacturaAux = $rootScope.$on('recargarFacturaAux', function (event, data) {
                Facturas.getFactura($scope.factura.entryFactMovil).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    $scope.factura = {
                        sincronizado: $scope.res.Sincronizado,
                        entryFactMovil: $scope.res.EntryFactMovil,
                        entryPerfilMovil: $scope.res.EntryPerfilMovil,
                        entryLegMovil: $scope.res.EntryLegMovil,
                        fecha: $scope.res.Fecha,
                        iDLeg: $scope.res.IDLeg,
                        valor: $scope.res.Valor,
                        moneda: $scope.res.Moneda,
                        referencia: $scope.res.Referencia,
                        documento: $scope.res.Documento,
                        tipoDoc: $scope.res.TipoDoc,
                        adjunto: $scope.res.Adjunto,
                        lineLegSAP: $scope.res.LineLegSAP,
                        comentarioLine: $scope.res.ComentarioLine,
                        subTotalSinImpuesto: $scope.res.SubTotalSinImpuesto,
                        subTotalImpuesto: $scope.res.SubTotalImpuesto, nombreSN: $scope.res.NombreSN,
                        entryFactWeb: $scope.res.EntryFactWeb
                    };
                    var d = new Date($scope.factura.fecha);
                    $scope.factura.fecha = d.toLocaleDateString();
                    $scope.formatNumber = {
                        separador: ".", // separador para los miles
                        sepDecimal: ',', // separador para los decimales
                        formatear: function (num) {
                            num += '';
                            var splitStr = num.split('.');
                            var splitLeft = splitStr[0];
                            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                            var regx = /(\d+)(\d{3})/;
                            while (regx.test(splitLeft)) {
                                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                            }
                            return this.simbol + splitLeft + splitRight;
                        },
                        new : function (num, simbol) {
                            this.simbol = simbol || '';
                            return this.formatear(num);
                        }
                    };
                    $scope.valorAux = $scope.formatNumber.new($scope.factura.valor, "$");
                });
            });
            $scope.$on('$destroy', objRecargarGastos);
            $scope.$on('$destroy', objRecargarFacturaAux);
            $scope.eliminargasto = function (gasto) {
                if (gasto.entryGastoMovil !== '') {
                    var record = angular.copy(gasto);
                    record.sincronizado = gasto.sincronizado;
                    record.entryGastoMovil = gasto.entryGastoMovil;
                    record.entryFactMovil = gasto.entryFactMovil;
                    record.entryLegMovil = gasto.entryLegMovil;
                    record.entryPerfilMovil = gasto.entryPerfilMovil;
                    record.idGasto = gasto.idGasto;
                    record.impuesto = gasto.impuesto.valor;
                    record.info1 = gasto.info1;
                    record.info2 = gasto.info2;
                    record.info3 = gasto.info3;
                    record.tipoGasto = gasto.tipoGasto;
                    record.valor = gasto.valor;
                    record.entryGastoWeb = gasto.entryGastoWeb;
                    record.notas = gasto.notas;
                    console.log(record);
                    Gastos.deleteGasto(record, $scope.factura, $scope.legalizacion).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        console.log($scope.respuesta);
                        $rootScope.$emit('recargarGastos');
                        $rootScope.$emit('recargarFacturaAux');
                        $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarLegalizacionAux');
                        $rootScope.$emit('recargarLegalizaciones');
                    });
                } else {
                    //                    perfil.$update();
                }
            };
        })


        .controller('nuevoGastoCtrl', function ($scope, $stateParams, Facturas, Legalizaciones, Gastos, TiposGasto, $rootScope) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.tiposGasto = [];
            $scope.legalizacion;
            $scope.gasto = {
                sincronizado: '',
                entryGastoMovil: '',
                entryFactMovil: $stateParams.id_factura,
                entryLegMovil: '',
                entryPerfilMovil: '',
                idGasto: '',
                impuesto: '',
                info1: '',
                info2: '',
                info3: '',
                tipoGasto: '',
                valor: '',
                entryGastoWeb: '',
                notas: ''
            };
            $scope.tipoGasto = {
                sincronizado: '',
                tipoGasto: '',
                descripcion: '',
                nombreCampo1: '',
                nombreCampo2: '',
                nombreCampo3: '',
                tipoCampo1: '',
                tipoCampo2: '',
                tipoCampo3: '',
                exigeCampo1: '',
                exigeCampo2: '',
                exigeCampo3: '',
                grupo01: '',
                grupo02: '',
                grupo03: '',
                grupo04: '',
                grupo05: '',
                grupo06: '',
                grupo07: '',
                grupo08: ''
            };
            $scope.opcion_impuesto = [
                {opcion: "19%", valor: "0.19"},
                {opcion: "16%", valor: "0.16"},
                {opcion: "10%", valor: "0.10"},
                {opcion: "8%", valor: "0.08"},
                {opcion: "0%", valor: "0.0"}
            ];

            $scope.gasto.impuesto = $scope.opcion_impuesto[0];
            $scope.factura = {
                sincronizado: '',
                entryFactMovil: $stateParams.id_factura,
                entryPerfilMovil: '',
                entryLegMovil: '', fecha: '',
                iDLeg: '',
                valor: '',
                moneda: '',
                referencia: '',
                documento: '',
                tipoDoc: '',
                adjunto: '',
                lineLegSAP: '',
                comentarioLine: '',
                subTotalSinImpuesto: '',
                subTotalImpuesto: '', nombreSN: '',
                entryFactWeb: ''
            };
            Facturas.getFactura($scope.factura.entryFactMovil).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.factura = {
                    sincronizado: $scope.res.Sincronizado,
                    entryFactMovil: $scope.res.EntryFactMovil,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    entryLegMovil: $scope.res.EntryLegMovil,
                    fecha: $scope.res.Fecha,
                    iDLeg: $scope.res.IDLeg,
                    valor: $scope.res.Valor,
                    moneda: $scope.res.Moneda,
                    referencia: $scope.res.Referencia,
                    documento: $scope.res.Documento,
                    tipoDoc: $scope.res.TipoDoc,
                    adjunto: $scope.res.Adjunto,
                    lineLegSAP: $scope.res.LineLegSAP,
                    comentarioLine: $scope.res.ComentarioLine,
                    subTotalSinImpuesto: $scope.res.SubTotalSinImpuesto,
                    subTotalImpuesto: $scope.res.SubTotalImpuesto,
                    nombreSN: $scope.res.NombreSN,
                    entryFactWeb: $scope.res.EntryFactWeb
                };

                TiposGasto.getTiposGasto($scope.factura.entryPerfilMovil).then(function (tiposGasto) {
                    $scope.opcion_tipo_gasto = angular.copy(tiposGasto);
                    //$scope.gasto.tipoGasto = $scope.opcion_tipo_gasto[0];
                });

                Legalizaciones.getLegalizacionCabecera($scope.factura.entryLegMovil).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    $scope.legalizacion = {
                        sincronizado: $scope.res.Sincronizado,
                        entryLegMovil: $scope.res.EntryLegMovil,
                        entryPerfilWeb: $scope.res.EntryPerfilWeb,
                        cargado: $scope.res.Cargado,
                        descripcion: $scope.res.Descripcion,
                        entryPerfilMovil: $scope.res.EntryPerfilMovil,
                        estado: $scope.res.Estado,
                        fechaAutorizacion: $scope.res.FechaAutorizacion,
                        fechaSincronizacion: $scope.res.FechaSincronizacion,
                        iDLeg: $scope.res.IDLeg,
                        noAprobacion: $scope.res.NoAprobacion,
                        valor: $scope.res.Valor,
                        entryLegWeb: $scope.res.EntryLegWeb,
                        nombrePerfil: $scope.res.Perfil,
                        nombreGrupo: $scope.res.NombreGrupo
                    };
                    angular.forEach($scope.opcion_sap, function (clave) {
                        if (clave.valor === $scope.perfil.dimension1) {
                            $scope.perfil.dimension1 = clave;
                        }
                    });
                    angular.forEach($scope.opcion_autorizacion, function (clave) {
                        if (clave.valor === $scope.perfil.dimension2) {
                            $scope.perfil.dimension2 = clave;
                        }
                    });
                });
            });


            $scope.invocarCampos = function () {
                /* console.log ($scope.gasto.tipoGasto);
                 if($scope.gasto.tipoGasto === '' || $scope.gasto.tipoGasto === 'undefined'){
                 
                 $scope.gasto.tipoGasto =  {tipoGasto: ""};
                 $scope.gasto.tipoGasto.tipoGasto=$scope.opcion_tipo_gasto[0].tipoGasto;
                 }*/

                TiposGasto.getTipoGastoGto($scope.gasto.tipoGasto.tipoGasto).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    console.log($scope.res);
                    $scope.tipoGasto = {
                        sincronizado: $scope.res.Sincronizado,
                        tipoGasto: $scope.res.TipoGasto,
                        descripcion: $scope.res.Descripcion,
                        nombreCampo1: $scope.res.NombreCampo1,
                        nombreCampo2: $scope.res.NombreCampo2,
                        nombreCampo3: $scope.res.NombreCampo3,
                        tipoCampo1: $scope.res.TipoCampo1,
                        tipoCampo2: $scope.res.TipoCampo2,
                        tipoCampo3: $scope.res.TipoCampo3,
                        exigeCampo1: $scope.res.ExigeCampo1,
                        exigeCampo2: $scope.res.ExigeCampo2,
                        exigeCampo3: $scope.res.ExigeCampo3,
                        grupo01: $scope.res.Grupo01,
                        grupo02: $scope.res.Grupo02,
                        grupo03: $scope.res.Grupo03,
                        grupo04: $scope.res.Grupo04,
                        grupo05: $scope.res.Grupo05,
                        grupo06: $scope.res.Grupo06,
                        grupo07: $scope.res.Grupo07,
                        grupo08: $scope.res.Grupo08,
                        impuestoSugerido: $scope.res.ImpuestoSugerido
                    };

                    angular.forEach($scope.opcion_impuesto, function (clave) {
                        if (Number(clave.valor) === $scope.tipoGasto.impuestoSugerido) {
                            $scope.gasto.impuesto = clave;
                        }
                    });
                    console.log($scope.tipoGasto);
                });
            };


            $scope.$watch('gasto.tipoGasto', function (oldValue, newValue) {
                $scope.invocarCampos();
            });

            $scope.creargasto = function (gasto, form) {
                var camposInvalidos = 0;
                for (var x in $scope.nuevoGastoForm) {
                    var prop = $scope.nuevoGastoForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }
                if (camposInvalidos !== 1) {
                    if (gasto.entryFactMovil !== '') {
                        console.log(gasto);
                        console.log(gasto.tipoGasto);
                        var record = angular.copy(gasto);
                        record.sincronizado = '';
                        record.entryGastoMovil = '';
                        record.entryFactMovil = $scope.factura.entryFactMovil;
                        record.entryLegMovil = $scope.factura.entryLegMovil;
                        record.entryPerfilMovil = $scope.factura.entryPerfilMovil;
                        record.idGasto = gasto.idGasto;
                        record.impuesto = gasto.impuesto.valor;
                        record.info1 = gasto.info1;
                        record.info2 = gasto.info2;
                        record.info3 = gasto.info3;
                        record.tipoGasto = gasto.tipoGasto.tipoGasto;
                        record.valor = gasto.valor;
                        record.entryGastoWeb = '';
                        record.notas = gasto.notas;

                        Gastos.postGasto(record, $scope.factura).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $rootScope.$emit('recargarGastos');
                            $scope.gasto = {
                                sincronizado: '',
                                entryGastoMovil: '',
                                entryFactMovil: $stateParams.id_factura,
                                entryLegMovil: '',
                                entryPerfilMovil: '',
                                idGasto: '',
                                impuesto: '',
                                info1: '',
                                info2: '',
                                info3: '',
                                tipoGasto: '',
                                valor: '',
                                entryGastoWeb: '',
                                notas: ''
                            };
                            alert('Se ha creado el gasto con éxito');
                            $rootScope.$emit('recargarFacturaAux');
                            $rootScope.$emit('recargarFacturas');
                            $rootScope.$emit('recargarLegalizacionAux');
                            $rootScope.$emit('recargarLegalizaciones');
                            form.$setPristine();
                            form.$setUntouched();
                        });
                    } else {
                        //                    perfil.$update();
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
                $rootScope.$emit('recargarFacturaAux');
                $rootScope.$emit('recargarFacturas');
                $rootScope.$emit('recargarLegalizacionAux');
                $rootScope.$emit('recargarLegalizaciones');
                form.$setPristine();
                form.$setUntouched();
            };
        })

        .controller('gastoDetalleCtrl', function ($scope, $stateParams, Legalizaciones, Facturas, Gastos, $rootScope) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.gasto = {
                sincronizado: '',
                entryGastoMovil: $stateParams.id_gasto,
                entryFactMovil: '',
                entryLegMovil: '',
                entryPerfilMovil: '',
                idGasto: '',
                impuesto: '',
                info1: '',
                info2: '',
                info3: '',
                tipoGasto: '',
                valor: '',
                entryGastoWeb: '',
                notas: '',
                tipoGastoNombre: ''
            };
            $scope.opcion_impuesto = [
                {opcion: "19%", valor: "0.19"},
                {opcion: "16%", valor: "0.16"},
                {opcion: "10%", valor: "0.10"},
                {opcion: "8%", valor: "0.08"},
                {opcion: "0%", valor: "0.00"}
            ];
            if ($scope.gasto.entryGastoMovil !== '') {
                Gastos.getGasto($scope.gasto).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    $scope.gasto = {
                        sincronizado: $scope.res.Sincronizado,
                        entryGastoMovil: $scope.res.EntryGastoMovil,
                        entryFactMovil: $scope.res.EntryFactMovil,
                        entryLegMovil: $scope.res.EntryLegMovil,
                        entryPerfilMovil: $scope.res.EntryPerfilMovil,
                        idGasto: $scope.res.IdGasto,
                        impuesto: $scope.res.Impuesto,
                        info1: $scope.res.Info1,
                        info2: $scope.res.Info2,
                        info3: $scope.res.Info3,
                        tipoGasto: $scope.res.TipoGasto,
                        valor: $scope.res.Valor,
                        entryGastoWeb: $scope.res.EntryGastoWeb,
                        notas: $scope.res.Notas,
                        nombreTipoGasto: $scope.res.Descripcion
                    };
                    angular.forEach($scope.opcion_impuesto, function (clave) {
                        if (Number(clave.valor) === Number($scope.gasto.impuesto)) {
                            $scope.gasto.impuesto = clave;
                        }
                    });



                    Facturas.getFactura($scope.gasto.entryFactMovil).then(function (resultado) {
                        $scope.res = angular.copy(resultado);
                        $scope.factura = {
                            sincronizado: $scope.res.Sincronizado,
                            entryFactMovil: $scope.res.EntryFactMovil,
                            entryPerfilMovil: $scope.res.EntryPerfilMovil,
                            entryLegMovil: $scope.res.EntryLegMovil,
                            fecha: $scope.res.Fecha,
                            iDLeg: $scope.res.IDLeg,
                            valor: $scope.res.Valor,
                            moneda: $scope.res.Moneda,
                            referencia: $scope.res.Referencia,
                            documento: $scope.res.Documento,
                            tipoDoc: $scope.res.TipoDoc,
                            adjunto: $scope.res.Adjunto,
                            lineLegSAP: $scope.res.LineLegSAP,
                            comentarioLine: $scope.res.ComentarioLine,
                            subTotalSinImpuesto: $scope.res.SubTotalSinImpuesto,
                            subTotalImpuesto: $scope.res.SubTotalImpuesto,
                            nombreSN: $scope.res.NombreSN,
                            entryFactWeb: $scope.res.EntryFactWeb
                        };


                        Legalizaciones.getLegalizacionCabecera($scope.factura.entryLegMovil).then(function (resultado) {
                            $scope.res = angular.copy(resultado);
                            $scope.legalizacion = {
                                sincronizado: $scope.res.Sincronizado,
                                entryLegMovil: $scope.res.EntryLegMovil,
                                entryPerfilWeb: $scope.res.EntryPerfilWeb,
                                cargado: $scope.res.Cargado,
                                descripcion: $scope.res.Descripcion,
                                entryPerfilMovil: $scope.res.EntryPerfilMovil,
                                estado: $scope.res.Estado,
                                fechaAutorizacion: $scope.res.FechaAutorizacion,
                                fechaSincronizacion: $scope.res.FechaSincronizacion,
                                iDLeg: $scope.res.IDLeg,
                                noAprobacion: $scope.res.NoAprobacion,
                                valor: $scope.res.Valor,
                                entryLegWeb: $scope.res.EntryLegWeb,
                                nombrePerfil: $scope.res.Perfil,
                                nombreGrupo: $scope.res.NombreGrupo
                            };
                            angular.forEach($scope.opcion_sap, function (clave) {
                                if (clave.valor === $scope.perfil.dimension1) {
                                    $scope.perfil.dimension1 = clave;
                                }
                            });
                            angular.forEach($scope.opcion_autorizacion, function (clave) {
                                if (clave.valor === $scope.perfil.dimension2) {
                                    $scope.perfil.dimension2 = clave;
                                }
                            });
                        });
                    });



                });
            } else {
                //                    perfil.$update();
            }
        })

        .controller('tipoGastoCtrl', function ($scope, TiposGasto, $rootScope) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.tipoGasto = {
                sincronizado: '',
                tipoGasto: '',
                descripcion: ''
            };
            $scope.crear = function (tipoGasto) {
                var camposInvalidos = 0;
                for (var x in $scope.nuevoTipoGastoForm) {
                    var prop = $scope.nuevoTipoGastoForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }
                ;
                if (camposInvalidos !== 1) {
                    if (tipoGasto.tipoGasto !== '') {
                        var record = angular.copy(tipoGasto);
                        record.sincronizado = '';
                        record.tipoGasto = tipoGasto.tipoGasto;
                        record.descripcion = tipoGasto.descripcion;
                        TiposGasto.postTipoGasto(record).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $scope.tipoGasto = {
                                sincronizado: '',
                                tipoGasto: '',
                                descripcion: ''
                            };
                            alert('Se ha creado el tipo de gasto con éxito');
                        });
                    } else {
                        //                    perfil.$update();
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
            };
        })


        .controller('facturaDetalleCtrl', function ($scope, $stateParams, Facturas, Legalizaciones, Gastos, TiposGasto, $rootScope, $state) {
            $scope.factura;
            $scope.gastos;
            $scope.gastoAux;
            $scope.opcion_tipo_gasto = null;
            $scope.factura = {
                sincronizado: '',
                entryFactMovil: $stateParams.id_factura,
                entryPerfilMovil: '',
                entryLegMovil: '',
                fecha: '',
                iDLeg: '',
                valor: '',
                moneda: '',
                referencia: '',
                documento: '',
                tipoDoc: '',
                adjunto: '',
                lineLegSAP: '',
                comentarioLine: '',
                subTotalSinImpuesto: '',
                subTotalImpuesto: '',
                nombreSN: '',
                entryFactWeb: '',
                valorAux: ''
            };

            Legalizaciones.getLegalizacionCabecera($scope.factura.entryLegMovil).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.legalizacion = {
                    sincronizado: $scope.res.Sincronizado,
                    entryLegMovil: $scope.res.EntryLegMovil,
                    entryPerfilWeb: $scope.res.EntryPerfilWeb,
                    cargado: $scope.res.Cargado,
                    descripcion: $scope.res.Descripcion,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    estado: $scope.res.Estado,
                    fechaAutorizacion: $scope.res.FechaAutorizacion,
                    fechaSincronizacion: $scope.res.FechaSincronizacion,
                    iDLeg: $scope.res.IDLeg,
                    noAprobacion: $scope.res.NoAprobacion,
                    valor: $scope.res.Valor,
                    entryLegWeb: $scope.res.EntryLegWeb,
                    nombrePerfil: $scope.res.Perfil,
                    nombreGrupo: $scope.res.NombreGrupo
                };
                angular.forEach($scope.opcion_sap, function (clave) {
                    if (clave.valor === $scope.perfil.dimension1) {
                        $scope.perfil.dimension1 = clave;
                    }
                });
                angular.forEach($scope.opcion_autorizacion, function (clave) {
                    if (clave.valor === $scope.perfil.dimension2) {
                        $scope.perfil.dimension2 = clave;
                    }
                });
            });

            Facturas.getFacturaImage($scope.factura.entryFactMovil).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.factura = {
                    sincronizado: $scope.res.Sincronizado,
                    entryFactMovil: $scope.res.EntryFactMovil,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    entryLegMovil: $scope.res.EntryLegMovil,
                    fecha: $scope.res.Fecha,
                    iDLeg: $scope.res.IDLeg,
                    valor: $scope.res.Valor,
                    moneda: $scope.res.Moneda,
                    referencia: $scope.res.Referencia,
                    documento: $scope.res.Documento,
                    tipoDoc: $scope.res.TipoDoc,
                    adjunto: $scope.res.Adjunto,
                    lineLegSAP: $scope.res.LineLegSAP,
                    comentarioLine: $scope.res.ComentarioLine,
                    subTotalSinImpuesto: $scope.res.SubTotalSinImpuesto,
                    subTotalImpuesto: $scope.res.SubTotalImpuesto,
                    nombreSN: $scope.res.NombreSN,
                    entryFactWeb: $scope.res.EntryFactWeb,
                    valorAux: ''
                };
                $scope.opcion_impuesto = [
                    {opcion: "19%", valor: "0.19"},
                    {opcion: "16%", valor: "0.16"},
                    {opcion: "10%", valor: "0.10"},
                    {opcion: "8%", valor: "0.08"},
                    {opcion: "0%", valor: "0.0"}
                ];
                var d = new Date($scope.factura.fecha);
                $scope.factura.fecha = d.toLocaleDateString();
                $scope.formatNumber = {
                    separador: ".", // separador para los miles
                    sepDecimal: ',', // separador para los decimales
                    formatear: function (num) {
                        num += '';
                        var splitStr = num.split('.');
                        var splitLeft = splitStr[0];
                        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                        var regx = /(\d+)(\d{3})/;
                        while (regx.test(splitLeft)) {
                            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                        }
                        return this.simbol + splitLeft + splitRight;
                    },
                    new : function (num, simbol) {
                        this.simbol = simbol || '';
                        return this.formatear(num);
                    }
                };
                $scope.factura.valorAux = $scope.formatNumber.new($scope.factura.valor, "$");
                console.log($scope.factura);
            });
            Gastos.getGastos($scope.factura.entryFactMovil).then(function (gastos) {
                $scope.gastos = null;
                $scope.gastos = [];
                $scope.gastos = angular.copy(gastos);
                TiposGasto.getTiposGasto($scope.factura.entryPerfilMovil).then(function (tiposGasto) {
                    $scope.opcion_tipo_gasto = angular.copy(tiposGasto);
                    for (var i = 0; i < $scope.gastos.length; i++) {
                        angular.forEach($scope.opcion_tipo_gasto, function (clave) {
                            if (Number($scope.gastos[i].tipoGasto) === Number(clave.tipoGasto)) {
                                $scope.gastoAux = clave;
                                $scope.gastos[i].tipoGasto = $scope.gastoAux;
                            }
                        });
                        angular.forEach($scope.opcion_impuesto, function (clave) {
                            if (Number($scope.gastos[i].impuesto) === Number(clave.valor)) {

                                $scope.gastos[i].impuesto = clave;
                            }
                        });
                        $scope.formatNumber = {
                            separador: ".", // separador para los miles
                            sepDecimal: ',', // separador para los decimales
                            formatear: function (num) {
                                num += '';
                                var splitStr = num.split('.');
                                var splitLeft = splitStr[0];
                                var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                                var regx = /(\d+)(\d{3})/;
                                while (regx.test(splitLeft)) {
                                    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                                }
                                return this.simbol + splitLeft + splitRight;
                            },
                            new : function (num, simbol) {
                                this.simbol = simbol || '';
                                return this.formatear(num);
                            }
                        };
                        $scope.gastos[i].valorAux = $scope.formatNumber.new($scope.gastos[i].valor, "$");
                    }
                });
            });
        })

        .controller('legalizacionDetalleCtrl', function ($scope, $rootScope, $state, $stateParams, $ionicHistory, Legalizaciones, Perfiles) {
            $scope.opcion_perfil;
            $scope.perfilAux;
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.legalizacion = {
                sincronizado: '',
                entryLegMovil: $stateParams.id_legalizacion,
                cargado: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDLeg: '',
                noAprobacion: '',
                valor: '',
                entryLegWeb: ''
            };
            Legalizaciones.getLegalizacion($scope.legalizacion.entryLegMovil).then(function (legalizacion) {
                $scope.res = angular.copy(legalizacion);
                $scope.legalizacion = {
                    sincronizado: $scope.res.Sincronizado,
                    entryLegMovil: $scope.res.EntryLegMovil,
                    cargado: $scope.res.Cargado,
                    descripcion: $scope.res.Descripcion,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    estado: $scope.res.Estado,
                    sn: $scope.res.SN,
                    fechaAutorizacion: $scope.res.FechaAutorizacion,
                    fechaSincronizacion: $scope.res.FechaSincronizacion,
                    iDLeg: $scope.res.IDLeg,
                    noAprobacion: $scope.res.NoAprobacion,
                    valor: $scope.res.Valor,
                    entryLegWeb: $scope.res.EntryLegWeb,
                    valorAux: ''
                };
                Perfiles.getPerfilesHabilitados().then(function (perfiles) {
                    $scope.opcion_perfil = angular.copy(perfiles);
                    for (var i = 0; i < $scope.opcion_perfil.length; i++) {
                        if (Number($scope.opcion_perfil[i].entryPerfilMovil) === Number($scope.legalizacion.entryPerfilMovil)) {
                            $scope.perfilAux = $scope.opcion_perfil[i];
                            $scope.legalizacion.entryPerfilMovil = $scope.perfilAux;
                        }
                    }
                    ;
                });
            });
            $scope.modificarleg = function (legalizacion) {
                var camposInvalidos = 0;
                JSON.stringify(legalizacion);
                if (camposInvalidos !== 1) {
                    if (legalizacion.iDLeg !== '') {
                        var record = angular.copy(legalizacion);
                        Legalizaciones.updateLegalizacion(record.descripcion, record.entryLegMovil).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);

                            $rootScope.$emit('recargarLegalizaciones');
                            alert("La legalización se modifico correctamente");
//                            $ionicHistory.clearCache().then(function () {
//                                $state.go('menu.legalizacion.abiertas', {}, {reload: true});
//                            });
                        });
                    } else {

                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
            };
        })

        .controller('PdfCtrl', [
            '$scope',
            '$element',
            '$attrs',
            'pdfDelegate',
            '$log',
            '$q',
            function ($scope, $element, $attrs, pdfDelegate, $log, $q) {

                // Register the instance!
                var deregisterInstance = pdfDelegate._registerInstance(this, $attrs.delegateHandle);
                // De-Register on destory!
                $scope.$on('$destroy', deregisterInstance);

                var self = this;

                var url = $scope.$eval($attrs.url);
                var headers = $scope.$eval($attrs.headers);
                var pdfDoc;
                $scope.pageCount = 0;
                var currentPage = 1;
                var angle = 0;
                var scale = $attrs.scale ? $attrs.scale : 1;
                var canvas = $element.find('canvas')[0];
                var ctx = canvas.getContext('2d');

                var renderPage = function (num) {
                    if (!angular.isNumber(num))
                        num = parseInt(num);
                    pdfDoc
                            .getPage(num)
                            .then(function (page) {
                                var viewport = page.getViewport(scale);
                                canvas.height = viewport.height;
                                canvas.width = viewport.width;

                                var renderContext = {
                                    canvasContext: ctx,
                                    viewport: viewport
                                };

                                page.render(renderContext);
                            });
                };

                var transform = function () {
                    canvas.style.webkitTransform = 'rotate(' + angle + 'deg)';
                    canvas.style.MozTransform = 'rotate(' + angle + 'deg)';
                    canvas.style.msTransform = 'rotate(' + angle + 'deg)';
                    canvas.style.OTransform = 'rotate(' + angle + 'deg)';
                    canvas.style.transform = 'rotate(' + angle + 'deg)';
                };

                self.prev = function () {
                    if (currentPage <= 1)
                        return;
                    currentPage = parseInt(currentPage, 10) - 1;
                    renderPage(currentPage);
                };

                self.next = function () {
                    if (currentPage >= pdfDoc.numPages)
                        return;
                    currentPage = parseInt(currentPage, 10) + 1;
                    renderPage(currentPage);
                };

                self.zoomIn = function (amount) {
                    amount = amount || 0.2;
                    scale = parseFloat(scale) + amount;
                    renderPage(currentPage);
                    return scale;
                };

                self.zoomOut = function (amount) {
                    amount = amount || 0.2;
                    scale = parseFloat(scale) - amount;
                    scale = (scale > 0) ? scale : 0.1;
                    renderPage(currentPage);
                    return scale;
                };

                self.zoomTo = function (zoomToScale) {
                    zoomToScale = (zoomToScale) ? zoomToScale : 1.0;
                    scale = parseFloat(zoomToScale);
                    renderPage(currentPage);
                    return scale;
                };

                self.rotate = function () {
                    if (angle === 0) {
                        angle = 90;
                    } else if (angle === 90) {
                        angle = 180;
                    } else if (angle === 180) {
                        angle = 270;
                    } else {
                        angle = 0
                    }
                    transform();
                };

                self.getPageCount = function () {
                    return $scope.pageCount;
                };

                self.getCurrentPage = function () {
                    return currentPage;
                };

                self.goToPage = function (newVal) {
                    if (pdfDoc !== null) {
                        currentPage = newVal;
                        renderPage(newVal);
                    }
                };

                self.load = function (_url) {
                    if (_url) {
                        url = _url;
                    }

                    var docInitParams = {};

                    if (typeof url === 'string') {
                        docInitParams.url = url;
                    } else {
                        // use Uint8Array or request like `{data: new Uint8Array()}`.  See pdf.js for more details.
                        docInitParams.data = url;
                    }

                    if (headers) {
                        docInitParams.httpHeaders = headers;
                    }

                    return PDFJS
                            .getDocument(docInitParams)
                            .then(function (_pdfDoc) {

                                pdfDoc = _pdfDoc;
                                renderPage(1);
                                $scope.$apply(function () {
                                    $scope.pageCount = _pdfDoc.numPages;
                                });

                            }, function (error) {
                                $log.error(error);
                                return $q.reject(error);
                            });
                };

                if (url)
                    self.load();
            }])

        .controller('nuevaRequisicionCtrl', function ($scope, $rootScope, Requisiciones, Perfiles, $state, $ionicModal) {

            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.requisicion = {
                sincronizado: '',
                entryReqMovil: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDReq: '',
                noAprobacion: '',
                entryReqWeb: ''
            };
            $scope.crearreq = function (requisicion, form) {
                var camposInvalidos = 0;
                var randomString = '1';
                for (var i = 0; i < 5; i++) {
                    randomString += Math.floor((Math.random() * 10));
                }

                for (var x in $scope.nuevarequisicionForm) {
                    var prop = $scope.nuevarequisicionForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }

                if (camposInvalidos !== 1) {
                    if (requisicion.descripcion !== '') {
                        var record = angular.copy(requisicion);
                        record.sincronizado = '';
                        record.entryReqMovil = '';
                        record.descripcion = requisicion.descripcion;
                        record.entryPerfilMovil = requisicion.entryPerfilMovil.entryPerfilMovil;
                        record.estado = 'abierto';
                        record.fechaAutorizacion = '';
                        record.fechaSincronizacion = '';
                        record.iDReq = '0';
                        record.noAprobacion = '';
                        record.entryReqWeb = '';
                        Requisiciones.postRequisicion(record).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $scope.requisicion = {
                                sincronizado: '',
                                entryReqMovil: '',
                                descripcion: '',
                                entryPerfilMovil: '',
                                estado: '',
                                fechaAutorizacion: '',
                                fechaSincronizacion: '',
                                iDReq: '',
                                noAprobacion: '',
                                entryReqWeb: ''
                            };
                            $rootScope.$emit('recargarRequisiciones');
                            alert('Se ha creado la requisición con éxito');
                            $scope.requisicion.entryPerfilMovil = $scope.opcion_perfil[0].perfilGrupo;
                            form.$setPristine();
                            form.$setUntouched();
                            $state.go('menu.requisicion.abiertas');
                        });
                    } else {

//                    perfil.$update();
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
//                }
            };
            Perfiles.getPerfilesHabilitadosReq().then(function (perfiles) {
                $scope.opcion_perfil = angular.copy(perfiles);
                console.log($scope.opcion_perfil);
                $scope.requisicion.entryPerfilMovil = $scope.opcion_perfil[0].perfilGrupo;
            });
            $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                viewData.enableBack = true;
            });


            var objRecargarPerfilReqAux = $rootScope.$on('recargarPerfilReqAux', function (event, data) {
                $scope.perfiles = null;
                $scope.perfiles = [];
                $scope.opcion_perfil = null;
                $scope.opcion_perfil = [];
                try {
                    Perfiles.getPerfilesHabilitadosReq().then(function (perfiles) {
                        $scope.opcion_perfil = angular.copy(perfiles);
                        console.log($scope.opcion_perfil);
                        $scope.legalizacion.entryPerfilMovil = $scope.opcion_perfil[0].perfilGrupo;
                    });
                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarPerfilReqAux);
        })



        .controller('requisicionAbiertaCtrl', function ($scope, Requisiciones, Perfiles, Sincronizar, $rootScope, $state, $cordovaNetwork, $ionicModal) {
            $scope.requisiciones;
            $rootScope.pulsacion = 0;
            $scope.isOffline;
            $scope.iritem = function (requisicion) {
                if (requisicion.entryReqMovil !== null) {
                    $scope.estilolink = {
                        pointerEvents: 'auto',
                        cursor: 'default'
                    };

                    $state.go('menu.requisicion.item', {id_requisicion: requisicion.entryReqMovil});
                }
            };
            $scope.requisicion = {
                sincronizado: '',
                entryReqMovil: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDReq: '',
                noAprobacion: '',
                entryReqWeb: '',
                valorAux: ''
            };

            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: '',
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                perfilNombreAux: ''
            };

            $ionicModal.fromTemplateUrl('cargando-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirCargandoModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarCargandoModal = function () {
                $scope.modal.hide();
            };


            Requisiciones.getRequisiciones('abierto').then(function (requisiciones) {
                $scope.requisiciones = null;
                $scope.requisiciones = angular.copy(requisiciones);
                if ($scope.requisiciones !== null && $scope.requisiciones !== "") {
                    console.log($scope.requisiciones);
                }

            });
            var objRecargarRequisiciones = $rootScope.$on('recargarRequisiciones', function (event, data) {
                $scope.requisiciones = null;
                $scope.requisiciones = [];
                try {
                    Requisiciones.getRequisiciones('abierto').then(function (requisiciones) {
                        $scope.requisiciones = angular.copy(requisiciones);

                        console.log('recargarRequisicionesAbiertas 1');
                    });

                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarRequisiciones);
            $scope.enviar;

            $scope.enviarRequisicion = function (requisicionAux) {
                $scope.isOnline = $cordovaNetwork.isOnline();
                console.log($scope.isOnline);
                document.addEventListener("deviceready", function () {

                    var type = $cordovaNetwork.getNetwork();
                    $scope.isOnline = $cordovaNetwork.isOnline();
                    $scope.isOffline = $cordovaNetwork.isOffline();
                    // listen for Online event
                    $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                        var onlineState = networkState;
                    });
                    // listen for Offline event
                    $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                        var offlineState = networkState;
                    });
                }, false);
                $scope.estilolink = {
                    pointerEvents: 'none',
                    cursor: 'default'
                };
                if ($scope.isOnline === true) {

                    Sincronizar.getSincronizar().then(function (sincronizar) {
                        $scope.sincronizar = angular.copy(sincronizar);
                        console.log($scope.sincronizar);
                        if ($scope.sincronizar !== null) {
                            Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {
                                $scope.respuesta = angular.copy(resultado);

                                Requisiciones.getRequisicionItems(requisicionAux).then(function (requisicionAuxA) {
                                    var requisicionAux2 = angular.copy(requisicionAuxA);
                                    if (requisicionAux2 !== '0' && requisicionAux2 !== 0) {
                                        Requisiciones.getRequisicion(requisicionAux2).then(function (requisicion) {
                                            $scope.requisicion = angular.copy(requisicion);
                                            if ($scope.requisicion !== null && $scope.requisicion.entryReqMovil !== '') {
                                                console.log($scope.requisicion);


                                                $scope.abrirCargandoModal();
                                                $scope.estilolink = {
                                                    pointerEvents: 'none',
                                                    cursor: 'default'
                                                };

                                                $scope.idTransaccionReq = null;
                                                Sincronizar.getTransaccionReq().then(function (resultTransaccion) {
                                                    $scope.idTransaccionReq = angular.copy(resultTransaccion);
                                                    if ($scope.idTransaccionReq !== null) {
                                                        Sincronizar.getEnviarRequisicion($scope.requisicion, $scope.idTransaccionReq).then(function (requisicion) {
                                                            $scope.enviar = angular.copy(requisicion);
                                                            console.log($scope.enviar);
                                                            if ($scope.enviar !== null) {
                                                                Sincronizar.putEnviarRequisicion($scope.enviar).then(function (resultado) {
                                                                    $scope.respuesta = angular.copy(resultado);
                                                                    $scope.requisiciones = null;
                                                                    console.log($scope.respuesta);

                                                                    Requisiciones.getRequisiciones('abierto').then(function (requisiciones) {
                                                                        $scope.estadoRequisiciones = angular.copy(requisiciones);
                                                                        console.log($scope.estadoRequisiciones);
                                                                        $scope.cerrarCargandoModal();

                                                                        if ($scope.respuesta === '1') {
                                                                            $scope.estilolink = {
                                                                                pointerEvents: 'auto',
                                                                                cursor: 'default'
                                                                            };
                                                                            alert($scope.enviar = 'requisición Enviada');

                                                                            //                                                var millisecondsToWait = 3000;
                                                                            //                                                setTimeout(function () {
                                                                            //  $rootScope.$emit('recargarGastos');

                                                                            //  $rootScope.$emit('recargarFacturas');

                                                                            $rootScope.$emit('recargarRequisicionesPendiente');

                                                                            $rootScope.$emit('recargarRequisicionesConfirmada');

                                                                            $rootScope.$emit('recargarRequisiciones');

                                                                            console.log($scope.requisiciones);
                                                                            //                                                }, millisecondsToWait);

                                                                            console.log($scope.requisiciones);

                                                                        } else {
                                                                            $scope.estilolink = {
                                                                                pointerEvents: 'auto',
                                                                                cursor: 'default'
                                                                            };
                                                                            alert('Error en envío');

                                                                            // $rootScope.$emit('recargarGastos');

                                                                            // $rootScope.$emit('recargarFacturas');

                                                                            $rootScope.$emit('recargarRequisicionesPendiente');

                                                                            $rootScope.$emit('recargarRequisicionesConfirmada');

                                                                            $rootScope.$emit('recargarRequisiciones');

                                                                            console.log($scope.requisiciones);
                                                                        }

                                                                    });


                                                                });
                                                            }
                                                        });
                                                    }
                                                });


                                            } else {
                                                $scope.estilolink = {
                                                    pointerEvents: 'auto',
                                                    cursor: 'default'
                                                };
                                                alert('Error en requisicion');
                                            }
                                        });
                                    } else {
                                        $scope.estilolink = {
                                            pointerEvents: 'auto',
                                            cursor: 'default'
                                        };
                                        alert('Debe ingresar valores a la requisición');
                                    }
                                });
                            });
                        }
                    });
                } else {
                    alert('No existe conexión con la red, intente mas tarde');

                    $scope.estilolink = {
                        pointerEvents: 'auto',
                        cursor: 'default'
                    };
                }
            };

            $scope.eliminarRequisicion = function (requisicionAux) {
                if (requisicionAux.entryReqMovil !== null) {
                    $scope.estilolink = {
                        pointerEvents: 'auto',
                        cursor: 'default'
                    };
                    Requisiciones.deleteRequisicion(requisicionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la requisicion con exito');
                        } else {
                            alert('Error al eliminar requisicion');
                        }
                        //  $rootScope.$emit('recargarGastos');
                        // $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarRequisiciones');
                        console.log('recargarEliminarRequisicion 5');
                    });
                }
            };
        })


        .controller('nuevoItemCtrl', function ($scope, $stateParams, Sincronizar, Requisiciones, Items, $rootScope, $ionicModal, $state, $cordovaNetwork) {
            $scope.isOnline = $cordovaNetwork.isOnline();
            $scope.posi = [];
            console.log($scope.isOnline);
            document.addEventListener("deviceready", function () {

                var type = $cordovaNetwork.getNetwork();
                $scope.isOnline = $cordovaNetwork.isOnline();
                $scope.isOffline = $cordovaNetwork.isOffline();
                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                    var onlineState = networkState;
                });
                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                    var offlineState = networkState;
                });
            }, false);

            $scope.articulos = [{
                    entryPerfilWeb: '0',
                    entryArticuloCosto: '0',
                    grupoArticuloCodigo: '0',
                    grupoArticuloNombre: 'N-A',
                    articuloCodigo: '0',
                    articuloNombre: 'N-A',
                    articuloFrgnNombre: 'N-A',
                    articuloTipo: 'N',
                    entryPerfilMovil: '0'
                }];

            $scope.opcion_articulo = [];

            $scope.itemCabecera = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                nombrePerfil: '',
                nombreGrupo: '',
                idGrupo: '',
                descripcionReq: '',
                entryReqMovil: $stateParams.id_requisicion,
                almacen: '',
                idGrupoReq: '',
                nombreGrupoReq: '',
                proyecto: '',
                estadoReq: '',
                entryPerfilWebCreador: ''
            };

            $scope.item = {
                sincronizado: '',
                descripcion: '',
                articulo: '',
                articuloCodigo: '',
                articuloNombre: '',
                entryItemMovil: '',
                tipo: '',
                reqTipo: '',
                fecha: '',
                cantidadSolicitada: '',
                cantidadAprobada: '',
                proveedor: '',
                almacen: '',
                centroCosto: '',
                proyecto: '',
                entryReqMovil: ''
            };

            $scope.articuloAuxFiltro = {
                entryPerfilWeb: '',
                entryArticuloCosto: '',
                grupoArticuloCodigo: '',
                grupoArticuloNombre: '',
                articuloCodigo: '',
                articuloNombre: '',
                articuloFrgnNombre: '',
                articuloTipo: '',
                entryPerfilMovil: ''
            };

            $scope.opcion_reqtipo = [
                {opcion: "Suministro", valor: "0"},
                {opcion: "Inventario", valor: "1"}
            ];

            $scope.opcion_tipo = [
                {opcion: "Artículo", valor: "0"},
                {opcion: "Servicio", valor: "1"}
            ];

            $scope.item.reqTipo = $scope.opcion_reqtipo[0];
            $scope.item.tipo = $scope.opcion_tipo[1];

            Items.getItemsCabecera($scope.itemCabecera).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.itemCabecera = {
                    sincronizado: $scope.res.Sincronizado,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    entryPerfilWeb: $scope.res.EntryPerfilWeb,
                    nombrePerfil: $scope.res.Perfil,
                    nombreGrupo: $scope.res.NombreGrupo,
                    idGrupo: $scope.res.IdGrupo,
                    descripcionReq: $scope.res.DescripcionReq,
                    entryReqMovil: $scope.res.EntryReqMovil,
                    almacen: $scope.res.AlmacenSap,
                    idGrupoReq: $scope.res.DimensionSap,
                    nombreGrupoReq: '',
                    proyecto: $scope.res.ProyectoSap,
                    estadoReq: $scope.res.EstadoReq,
                    entryPerfilWebCreador: $scope.res.EntryPerfilWebCreador
                };
//                    Items.getItemsArticulos($scope.itemCabecera).then(function (articulos) {
//                        $scope.articulos = null;
//                        $scope.articulos = [{
//                                entryPerfilWeb: '0',
//                                entryArticuloCosto: '0',
//                                grupoArticuloCodigo: '0',
//                                grupoArticuloNombre: 'N-A',
//                                articuloCodigo: '0',
//                                articuloNombre: 'N-A',
//                                articuloFrgnNombre: 'Item',
//                                articuloTipo: 'N',
//                                entryPerfilMovil: '0'
//                            }];
//                        $scope.articulos = angular.copy(articulos);
//                        console.log($scope.articulos);
//                    });

//                Items.getItemsArticulosLite($scope.itemCabecera).then(function (articulos) {
//                    $scope.articulos = null;
//                    $scope.articulos = angular.copy(articulos);
//                    console.log($scope.articulos);
//                });
 $scope.item.cantidadSolicitada = '';
                $scope.filtroArticulo();

            });

            $scope.$watch('item.articulo', function (oldValue, newValue) {
                console.log(oldValue);
                console.log(newValue);
                console.log($scope.articulo);
                console.log($scope.item);
                $scope.dataArticulo();
                $scope.ArtFilter();
            });


            var objRecargarArticulosLite = $rootScope.$on('recargarArticulosLite', function (event, data) {
               $scope.item.cantidadSolicitada = '';
                $scope.filtroArticulo();
            });
            $scope.$on('$destroy', objRecargarArticulosLite);


            $scope.sincronizarArticulos = function () {
                alert("Recuerde: La sincronización de articulos podría tardar unos minutos, seleccione el articulo o servicio al momento de visualizar el mensaje de sincronización exitosa");
                if ($scope.isOnline === true) {
                    Sincronizar.getArticulosAgrupacion().then(function (articulos) {
                        $scope.articulosAgrupacionAux = angular.copy(articulos);
                        console.log($scope.articulosAgrupacionAux);
                        if ($scope.articulosAgrupacionAux.length > 0) {
                            Items.deleteArticulos().then(function (articulosDelete) {
                                console.log(articulosDelete);
                                $scope.articulosAgrupacionAux = JSON.parse($scope.articulosAgrupacionAux);
                                for (var i = 0; i < $scope.articulosAgrupacionAux.length; i++) {
                                    var articuloAux = $scope.articulosAgrupacionAux[i];
                                    Items.postArticulos(articuloAux).then(function (articuloRes) {
                                        $rootScope.$emit('recargarArticulosLite');
                                        console.log(articuloRes);
                                    });
                                }
                                alert("Sincronización Exitosa");
                            });
                        }
                    });
                } else {
                    alert("No se puede establecer conexión con el servidor");
                }
            };

            $scope.filtroArticulo = function () {
                $scope.item.articulo = '';
                 $scope.item.cantidadSolicitada = '';
                Items.getItemsArticulosLite($scope.itemCabecera).then(function (articulos) {
                    $scope.articulos = null;

                    $scope.articulos = angular.copy(articulos);
                    console.log($scope.articulos);
                    $scope.articulos.push({
                        entryPerfilWeb: '0',
                        entryArticuloCosto: '0',
                        grupoArticuloCodigo: '0',
                        grupoArticuloNombre: 'N-A',
                        articuloCodigo: '0',
                        articuloNombre: 'N-A',
                        articuloFrgnNombre: 'N-A',
                        articuloTipo: '0',
                        entryPerfilMovil: '0'
                    });


                    $scope.opcion_articulo = null;
                    $scope.opcion_articulo = [];
                    if ($scope.item.tipo.valor === '1' || $scope.item.tipo.valor === 1) {
                        for (var i = 0; i < $scope.articulos.length; i++) {
                            $scope.articulos[i].almacen = $scope.itemCabecera.almacen;
                            if (($scope.articulos[i].articuloTipo === 'N' || $scope.articulos[i].articuloTipo === '0' || $scope.articulos[i].articuloTipo === 0) && ($scope.articulos[i].entryArticuloCosto === '0' || $scope.articulos[i].entryArticuloCosto === 0)) {
                                $scope.opcion_articulo.push($scope.articulos[i]);
                            }
                        }
//                        $scope.opcion_articulo.push($scope.articulos[$scope.articulos.length - 1]);
                        $scope.item.reqTipo = $scope.opcion_reqtipo[0];
                        // $scope.item.articulo = $scope.opcion_articulo[0];
                        $scope.itemCabecera.nombreGrupoReq = $scope.item.articulo.grupoArticuloNombre;
                        $scope.item.almacen = $scope.itemCabecera.almacen;
                        $scope.item.cantidadSolicitada = 1;
                    } else {                        
                        if ($scope.item.reqTipo.valor === '1' || $scope.item.reqTipo.valor === 1) {
//                            $scope.opcion_articulo.push($scope.articulos[$scope.articulos.length - 1]);
                            for (var i = 0; i < $scope.articulos.length; i++) {
                                $scope.articulos[i].almacen = $scope.itemCabecera.almacen;
                                if ($scope.articulos[i].articuloTipo === 'Y' || $scope.articulos[i].entryArticuloCosto === '0') {
                                    $scope.opcion_articulo.push($scope.articulos[i]);
                                }
                            }
                            // $scope.item.articulo = $scope.opcion_articulo[0];
                            $scope.itemCabecera.nombreGrupoReq = $scope.item.articulo.grupoArticuloNombre;
                        } else {
                            for (var i = 0; i < $scope.articulos.length; i++) {
                                $scope.articulos[i].almacen = $scope.itemCabecera.almacen;
                                if ($scope.articulos[i].articuloTipo === 'N' || ($scope.articulos[i].entryArticuloCosto === '0' || $scope.articulos[i].entryArticuloCosto === 0)) {
                                    $scope.opcion_articulo.push($scope.articulos[i]);
                                }
                            }
//                            $scope.opcion_articulo.push($scope.articulos[$scope.articulos.length - 1]);
                            $scope.itemCabecera.nombreGrupoReq = $scope.item.articulo.grupoArticuloNombre;
                        }
                    }
                });
            };

            $scope.crearite = function (item, form) {
                var camposInvalidos = 0;

                for (var x in $scope.nuevoItemForm) {
                    var prop = $scope.nuevoItemForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }

                if (camposInvalidos !== 1) {
                    if (item.articulo.articuloNombre !== '' && item.articulo.articuloNombre !== null) {
                        var d = new Date(item.fecha);
                        var strFecha = d.toISOString().slice(0, 10);
                        var record = angular.copy(item);
                        record.sincronizado = '';
                        record.descripcion = item.descripcion;
                        record.articulo = item.articulo.entryArticuloCosto;
                        record.articuloNombre = item.articulo.articuloNombre;
                        record.articuloCodigo = item.articulo.articuloCodigo;
                        record.entryItemMovil = '';
                        record.tipo = item.tipo.valor;
                        record.reqTipo = item.reqTipo.valor;
                        record.fecha = strFecha;
                        record.cantidadSolicitada = item.cantidadSolicitada;
                        record.cantidadAprobada = item.cantidadAprobada;
                        record.proveedor = item.proveedor;
                        record.almacen = $scope.itemCabecera.almacen;
                        record.centroCosto = item.centroCosto;
                        record.proyecto = item.proyecto;
                        record.entryReqMovil = $scope.itemCabecera.entryReqMovil;
                        console.log(record);
                        Items.postItem(record).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $scope.item = {
                                sincronizado: '',
                                descripcion: '',
                                articulo: '',
                                articuloNombre: '',
                                articuloCodigo: '',
                                entryItemMovil: '',
                                tipo: '',
                                reqTipo: '',
                                fecha: '',
                                cantidadSolicitada: '',
                                cantidadAprobada: '',
                                proveedor: '',
                                almacen: '',
                                centroCosto: '',
                                proyecto: '',
                                entryReqMovil: ''
                            };
                            $rootScope.$emit('recargarItems');
                            alert('Se ha creado el item con éxito');

                            form.$setPristine();
                            form.$setUntouched();
                            //  $state.go('menu.requisicion.abiertas');
                        });
                    } else {
                        alert('Error: Debe seleccionar un articulo o servicio, sino tiene carga seleccione N-A');
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }

            };

            alert("Recuerde: La carga de articulos podría tardar unos minutos");

            $scope.consultarstock = function (item) {
                //if ($scope.item.articuloCodigo !== null && $scope.item.articuloCodigo !== '' && $scope.item.almacen !== null && $scope.item.almacen !== '') {
                var stockAux = $scope.item.articulo.articuloCodigo + "|" + $scope.itemCabecera.entryPerfilWeb;
                //}
                if ($scope.itemCabecera.estadoReq !== 'aprobacion') {
                    $state.go('menu.requisicion.consultarstock', {id_item: $scope.item.articuloCodigo, id_perfil: $scope.itemCabecera.entryPerfilWeb, id_requisicion: $scope.itemCabecera.entryReqMovil});
                } else {
                    $state.go('menu.requisicion.consultarstockAprobacion', {id_item: $scope.item.articuloCodigo, id_perfil: $scope.itemCabecera.entryPerfilWebCreador, id_requisicion: $scope.itemCabecera.entryReqMovil});
                }
            };


            $scope.dataArticulo = function () {
                $scope.item.articuloCodigo = $scope.item.articulo.articuloCodigo;
                $scope.item.articuloNombre = $scope.item.articulo.articuloNombre;
                $scope.item.articuloFrgnNombre = $scope.item.articulo.articuloFrgnNombre;
                $scope.item.articuloTipo = $scope.item.articulo.articuloTipo;
            };

            $scope.ArtFilter = function () {
                Items.getArticuloF($scope.item.articulo.articuloCodigo).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    console.log($scope.res);
                    $scope.articuloAuxFiltro = {
                        entryPerfilWeb: $scope.res.EntryPerfilWeb,
                        entryArticuloCosto: $scope.res.EntryArticuloCosto,
                        grupoArticuloCodigo: $scope.res.GrupoArticuloCodigo,
                        grupoArticuloNombre: $scope.res.GrupoArticuloNombre,
                        articuloCodigo: $scope.res.ArticuloCodigo,
                        articuloNombre: $scope.res.ArticuloNombre,
                        articuloFrgnNombre: $scope.res.ArticuloFrgnNombre,
                        articuloTipo: $scope.res.ArticuloTipo,
                        entryPerfilMovil: $scope.res.EtryPerfilMovil
                    };
                });
            };
        }

        )


        .controller('itemCtrl', function ($scope, $stateParams, Items, Requisiciones, Perfiles, $rootScope, $state) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.items;
            $scope.valorAux;
            $scope.itemCabecera = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                nombrePerfil: '',
                nombreGrupo: '',
                idGrupo: '',
                descripcionReq: '',
                entryReqMovil: $stateParams.id_requisicion,
                almacen: '',
                idGrupoReq: '',
                nombreGrupoReq: '',
                estadoReq: '',
                proyecto: '',
                entryPerfilWebCreador: ''
            };

            Items.getItemsCabecera($scope.itemCabecera).then(function (resultado) {
                $scope.res = angular.copy(resultado);
                $scope.itemCabecera = {
                    sincronizado: $scope.res.Sincronizado,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    entryPerfilWeb: $scope.res.EntryPerfilWeb,
                    nombrePerfil: $scope.res.Perfil,
                    nombreGrupo: $scope.res.NombreGrupo,
                    idGrupo: $scope.res.IdGrupo,
                    descripcionReq: $scope.res.DescripcionReq,
                    entryReqMovil: $scope.res.EntryReqMovil,
                    almacen: $scope.res.AlmacenSap,
                    idGrupoReq: $scope.res.DimensionSap,
                    nombreGrupoReq: $scope.res.NombreGrupoReq,
                    estadoReq: $scope.res.EstadoReq,
                    proyecto: $scope.res.ProyectoSap,
                    entryPerfilWebCreador: $scope.res.EntryPerfilWebCreador
                };
            });

            Items.getItems($scope.itemCabecera).then(function (items) {
                $scope.items = null;
                $scope.items = [];
                $scope.items = angular.copy(items);
                for (var i = 0; i < $scope.items.length; i++) {
                    if (Number($scope.items[i].tipo) === 1) {
                        $scope.items[i].tipoAux = 'Servicio';
                    } else {
                        $scope.items[i].tipoAux = 'Artículo';
                    }
                }
                console.log($scope.items);
            });
            var objRecargarItems = $rootScope.$on('recargarItems', function (event, data) {

                Items.getItems($scope.itemCabecera).then(function (items) {
                    console.log('entro');
                    $scope.items = null;
                    $scope.items = [];
                    $scope.items = angular.copy(items);
                    for (var i = 0; i < $scope.items.length; i++) {
                        if (Number($scope.items[i].tipo) === 1) {
                            $scope.items[i].tipoAux = 'Servicio';
                        } else {
                            $scope.items[i].tipoAux = 'Artículo';
                        }
                    }
                    console.log($scope.items);

                });
            });

            $scope.$on('$destroy', objRecargarItems);
            $scope.eliminaritem = function (item) {

                if (item.entryItemMovil !== '') {
                    var record = angular.copy(item);
                    record.sincronizado = item.sincronizado;
                    record.entryItemMovil = item.entryItemMovil;
                    record.tipo = item.tipo;
                    record.reqTipo = item.reqTipo;
                    record.fecha = item.fecha;
                    record.cantidadSolicitada = item.cantidadSolicitada;
                    record.cantidadAprobada = item.cantidadAprobada;
                    record.proveedor = item.proveedor;
                    record.almacen = item.almacen;
                    record.centroCosto = item.centroCosto;
                    record.proyecto = item.proyecto;
                    record.entryReqMovil = item.entryReqMovil;
                    console.log(record);
                    if ($scope.itemCabecera.estadoReq !== 'aprobacion') {
                        Items.deleteItem(record).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            console.log($scope.respuesta);
                            $rootScope.$emit('recargarItems');
                        });
                    } else {
                        Items.updateItemDeshabilitar(record).then(function (resultado) {
                            $scope.items = null;
                            $scope.items = [];
                            $scope.respuesta = angular.copy(resultado);
                            console.log($scope.respuesta);
                            $rootScope.$emit('recargarItems');
                        });
                    }
                } else {
                    //                    perfil.$update();
                }
            };
        })


        .controller('requisicionDetalleCtrl', function ($scope, $stateParams, $rootScope, Requisiciones, Perfiles, $state, $ionicModal) {

            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };
            $scope.requisicion = {
                sincronizado: '',
                entryReqMovil: $stateParams.id_requisicion,
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDReq: '',
                noAprobacion: '',
                entryReqWeb: ''
            };


            Requisiciones.getRequisicion($scope.requisicion).then(function (requisiciones) {
                $scope.requisicion = angular.copy(requisiciones);

                $scope.requisicion.entryPerfilMovil = $scope.requisicion[0].perfilGrupo;
            });


            Requisiciones.getRequisicion($scope.requisicion).then(function (requisicion) {
                $scope.res = angular.copy(requisicion);
                $scope.requisicion = {
                    sincronizado: $scope.res.Sincronizado,
                    entryReqMovil: $scope.res.EntryReqMovil,
                    descripcion: $scope.res.Descripcion,
                    entryPerfilMovil: $scope.res.EntryPerfilMovil,
                    estado: $scope.res.Estado,
                    fechaAutorizacion: $scope.res.FechaAutorizacion,
                    fechaSincronizacion: $scope.res.FechaSincronizacion,
                    iDReq: $scope.res.IDReq,
                    noAprobacion: $scope.res.NoAprobacion,
                    entryReqWeb: $scope.res.EntryReqWeb
                };

                Perfiles.getPerfilesHabilitadosReq().then(function (perfiles) {
                    $scope.opcion_perfil = angular.copy(perfiles);
                    for (var i = 0; i < $scope.opcion_perfil.length; i++) {
                        if (Number($scope.opcion_perfil[i].entryPerfilMovil) === Number($scope.requisicion.entryPerfilMovil)) {
                            $scope.requisicion.entryPerfilMovil = $scope.opcion_perfil[i];
                        }
                    }
                    ;
                });
            });

            $scope.editarreq = function (requisicion, form) {
                var camposInvalidos = 0;
                var randomString = '1';
                for (var i = 0; i < 5; i++) {
                    randomString += Math.floor((Math.random() * 10));
                }
                for (var x in $scope.nuevarequisicionForm) {
                    var prop = $scope.nuevarequisicionForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }
                if (camposInvalidos !== 1) {
                    if (requisicion.descripcion !== '') {
                        var record = angular.copy(requisicion);
                        record.sincronizado = '';
                        record.entryReqMovil = requisicion.entryReqMovil;
                        record.descripcion = requisicion.descripcion;
                        record.entryPerfilMovil = requisicion.entryPerfilMovil.entryPerfilMovil;
                        record.estado = 'abierto';
                        record.fechaAutorizacion = '';
                        record.fechaSincronizacion = '';
                        record.iDReq = '0';
                        record.noAprobacion = '';
                        record.entryReqWeb = '';
                        Requisiciones.putRequisicion(record).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $scope.requisicion = {
                                sincronizado: '',
                                entryReqMovil: '',
                                descripcion: '',
                                entryPerfilMovil: '',
                                estado: '',
                                fechaAutorizacion: '',
                                fechaSincronizacion: '',
                                iDReq: '',
                                noAprobacion: '',
                                entryReqWeb: ''
                            };
                            $rootScope.$emit('recargarRequisiciones');
                            alert('Se ha actualizado la requisición con éxito');
                            $scope.requisicion.entryPerfilMovil = $scope.opcion_perfil[0].perfilGrupo;
                            form.$setPristine();
                            form.$setUntouched();
                            $state.go('menu.requisicion.abiertas');
                        });
                    } else {
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
            };

            $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                viewData.enableBack = true;
            });
        })

        .controller('requisicionAprobacionCtrl', function ($scope, Requisiciones, Perfiles, Sincronizar, $rootScope, $state, $cordovaNetwork, $ionicModal) {
            $scope.requisiciones;
            $scope.requisicionesFiltro = null;
            $rootScope.pulsacion = 0;

            $scope.perfilesCreadorReq = null;

            $scope.isOffline;
            $scope.iritem = function (requisicion) {
                if (requisicion.entryReqMovil !== null) {
                    $state.go('menu.requisicion.item-aprobacion', {id_requisicion: requisicion.entryReqMovil});
                }
            };
            $scope.requisicion = {
                sincronizado: '',
                entryReqMovil: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDReq: '',
                noAprobacion: '',
                entryReqWeb: '',
                valorAux: '',
                entryPerfilWebCreador: '',
                perfilCreadorReq: ''
            };

            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: '',
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                perfilNombreAux: ''
            };

            $scope.filtroReq = {
                entryPerfilWebCreador: '',
                perfilCreador: '',
                seleccionarTodo: ''
            };

            $ionicModal.fromTemplateUrl('cargando-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirCargandoModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarCargandoModal = function () {
                $scope.modal.hide();
            };

            Requisiciones.getRequisiciones('aprobacion').then(function (requisiciones) {
                $scope.requisiciones = null;
                $scope.requisiciones = angular.copy(requisiciones);
                $scope.requisicionesFiltro = $scope.requisiciones;
                if ($scope.requisiciones !== null && $scope.requisiciones !== "") {
                    console.log($scope.requisiciones);
                }
            });

            Requisiciones.getPerfilesCreador().then(function (perfilesCreador) {
                $scope.perfilesCreadorReq = null;
                $scope.perfilesCreadorReq = angular.copy(perfilesCreador);
                if ($scope.perfilesCreadorReq !== null && $scope.perfilesCreadorReq !== "") {
                    console.log($scope.perfilesCreadorReq);
                }
                $scope.filtroReq.perfilCreador = $scope.perfilesCreadorReq[0];
            });

            var objRecargarRequisiciones = $rootScope.$on('recargarRequisicionesAprobacion', function (event, data) {
                $scope.requisiciones = null;
                $scope.requisiciones = [];
                try {
                    Requisiciones.getRequisiciones('aprobacion').then(function (requisiciones) {
                        $scope.requisiciones = angular.copy(requisiciones);
                        $scope.requisicionesFiltro = $scope.requisiciones;
                        console.log('recargarRequisicionesAbiertas 1');
                    });

                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarRequisiciones);
            $scope.enviar;

            $scope.eliminarRequisicion = function (requisicionAux) {
                if (requisicionAux.entryReqMovil !== null) {
                    Requisiciones.deleteRequisicionAprobacion(requisicionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la requisicion con exito');
                        } else {
                            alert('Error al eliminar requisicion');
                        }
                        //  $rootScope.$emit('recargarGastos');
                        // $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarRequisicionesAprobacion');
                        console.log('recargarEliminarRequisicion 5');
                    });
                }
            };

            $scope.seleccionTodo = function () {
                if ($scope.filtroReq.seleccionarTodo === true) {
                    if (Number($scope.filtroReq.perfilCreador.entryPerfilWebCreador) !== Number('0')) {
                        for (var i = 0; i < $scope.requisiciones.length; i++) {
                            if (Number($scope.requisiciones[i].entryPerfilWebCreador) === Number($scope.filtroReq.perfilCreador.entryPerfilWebCreador)) {
                                $scope.requisiciones[i].valorAux = true;
                            }
                        }
                    } else {
                        for (var i = 0; i < $scope.requisiciones.length; i++) {
                            $scope.requisiciones[i].valorAux = true;
                        }
                    }
                } else {
                    if (Number($scope.filtroReq.perfilCreador.entryPerfilWebCreador) !== Number('0')) {
                        for (var i = 0; i < $scope.requisiciones.length; i++) {
                            if (Number($scope.requisiciones[i].entryPerfilWebCreador) === Number($scope.filtroReq.perfilCreador.entryPerfilWebCreador)) {
                                $scope.requisiciones[i].valorAux = false;
                            }
                        }
                    } else {
                        for (var i = 0; i < $scope.requisiciones.length; i++) {
                            $scope.requisiciones[i].valorAux = false;
                        }
                    }
                }
            };

            $scope.filtroPerfilAprobacion = function () {
                $scope.requisicionesFiltro = null;
                $scope.requisicionesFiltro = [];
                $scope.filtroReq.seleccionarTodo = false;
                for (var i = 0; i < $scope.requisiciones.length; i++) {
                    $scope.requisiciones[i].valorAux = false;
                }
                if (Number($scope.filtroReq.perfilCreador.entryPerfilWebCreador) === Number('0')) {
                    $scope.requisicionesFiltro = $scope.requisiciones;
                } else {
                    for (var i = 0; i < $scope.requisiciones.length; i++) {
                        if (Number($scope.requisiciones[i].entryPerfilWebCreador) === Number($scope.filtroReq.perfilCreador.entryPerfilWebCreador)) {
                            $scope.requisicionesFiltro.push($scope.requisiciones[i]);
                        }
                    }
                }
            };

            $scope.aprobartodo = function (form) {
                var reqAprobar = '';
                for (var i = 0; i < $scope.requisiciones.length; i++) {
                    if ($scope.requisiciones[i].valorAux === true) {
                        reqAprobar = reqAprobar + "'" + $scope.requisiciones[i].entryReqMovil + "'";
                    }
                }
                reqAprobar = reqAprobar.replace("''", "','");
                console.log(reqAprobar);
                Sincronizar.getAprobarReq(reqAprobar).then(function (respuestaEnvio2) {
                    $scope.enviarReq2 = angular.copy(respuestaEnvio2);
                    if ($scope.enviarReq2 !== null) {
                        Sincronizar.deleteAprobarRequisicion($scope.enviarReq2).then(function (resultado) {
                            $scope.deleteEnviarReq = angular.copy(resultado);
                            console.log($scope.deleteEnviarReq);
                            alert("Se aprobó con éxito");

                            $rootScope.$emit('recargarRequisicionesAprobacion');
                        });
                    }
                });
            };

            $scope.aprobarUna = function (requisicionEliminar) {
                var reqAprobar = "'" + requisicionEliminar.entryReqMovil + "'";
                console.log(reqAprobar);
                Sincronizar.getAprobarReq(reqAprobar).then(function (respuestaEnvio2) {
                    $scope.enviarReq2 = angular.copy(respuestaEnvio2);
                    if ($scope.enviarReq2 !== null) {
                        Sincronizar.deleteAprobarRequisicion($scope.enviarReq2).then(function (resultado) {
                            $scope.deleteEnviarReq = angular.copy(resultado);
                            console.log($scope.deleteEnviarReq);
                            alert("Se aprobó con éxito");
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                        });
                    }
                });
            };

            $scope.rechazarUna = function (requisicionEliminar) {
                var reqAprobar = "'" + requisicionEliminar.entryReqMovil + "'";
                console.log(reqAprobar);
                Sincronizar.getRechazarReq(reqAprobar).then(function (respuestaEnvio2) {
                    $scope.enviarReq2 = angular.copy(respuestaEnvio2);
                    if ($scope.enviarReq2 !== null) {
                        Sincronizar.deleteAprobarRequisicion($scope.enviarReq2).then(function (resultado) {
                            $scope.deleteEnviarReq = angular.copy(resultado);
                            console.log($scope.deleteEnviarReq);
                            alert("Se rechazó con éxito");
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                        });
                    }
                });
            };
            
             $scope.sincronizacionReq = function (tabReq) {
                Sincronizar.getSincronizar().then(function (sincronizar) {
                    $scope.sincronizar = angular.copy(sincronizar);
                    console.log($scope.sincronizar);
                    if ($scope.sincronizar !== null) {
                        Sincronizar.getUltimaFecha().then(function (fecha) {

                            $rootScope.datos = {
                                fecha: fecha};
                            alert("Sincronización Exitosa");
                        });
                        Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {

                            $scope.respuesta = angular.copy(resultado);
                            Sincronizar.putGastosWeb($scope.respuesta[1]).then(function (resultado) {
                                console.log('ingreso Gastos');
                            });

                            Sincronizar.getUltimaFecha().then(function (fecha) {
                                $rootScope.datos = {
                                    fecha: fecha};
                            });

                            console.log('menu.requisicion.' + tabReq);
                            $state.go('menu.requisicion.' + tabReq);

                            $rootScope.$emit('recargarRequisicionesConfirmada');
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                            $rootScope.$emit('recargarRequisicionesEnviada');


                        });
                    }
                });
            };
        })

        .controller('requisicionPendienteCtrl', function ($scope, Requisiciones, Perfiles, Sincronizar, $rootScope, $state, $cordovaNetwork, $ionicModal) {
            $scope.requisiciones;
            $rootScope.pulsacion = 0;
            $scope.isOffline;
            $scope.iritem = function (requisicion) {
                if (requisicion.entryReqMovil !== null) {
                    $state.go('menu.requisicion.item', {id_requisicion: requisicion.entryReqMovil});
                }
            };
            $scope.requisicion = {
                sincronizado: '',
                entryReqMovil: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDReq: '',
                noAprobacion: '',
                entryReqWeb: '',
                valorAux: ''
            };

            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: '',
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                perfilNombreAux: ''
            };

            $ionicModal.fromTemplateUrl('cargando-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirCargandoModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarCargandoModal = function () {
                $scope.modal.hide();
            };


            Requisiciones.getRequisiciones('pendiente').then(function (requisiciones) {
                $scope.requisiciones = null;
                $scope.requisiciones = angular.copy(requisiciones);
                if ($scope.requisiciones !== null && $scope.requisiciones !== "") {
                    console.log($scope.requisiciones);
                }

            });
            var objRecargarRequisiciones = $rootScope.$on('recargarRequisicionesPendiente', function (event, data) {
                $scope.requisiciones = null;
                $scope.requisiciones = [];
                try {
                    Requisiciones.getRequisiciones('pendiente').then(function (requisiciones) {
                        $scope.requisiciones = angular.copy(requisiciones);

                        console.log('recargarRequisicionesPendiente 1');
                    });

                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarRequisiciones);
            $scope.enviar;

            $scope.eliminarRequisicion = function (requisicionAux) {
                if (requisicionAux.entryReqMovil !== null) {
                    Requisiciones.deleteRequisicion(requisicionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la requisicion con exito');
                        } else {
                            alert('Error al eliminar requisicion');
                        }
                        //  $rootScope.$emit('recargarGastos');
                        // $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarRequisicionesPendiente');
                        console.log('recargarEliminarRequisicionPendiente 5');
                    });
                }
            };
        })


        .controller('itemDetalleCtrl', function ($scope, $stateParams, Sincronizar, Requisiciones, Items, $rootScope, $ionicModal, $state) {

            $scope.articulos = [];

            $scope.stock;

            $scope.opcion_articulo = [];

            $scope.itemCabecera = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                nombrePerfil: '',
                nombreGrupo: '',
                idGrupo: '',
                descripcionReq: '',
                entryReqMovil: '',
                almacen: '',
                idGrupoReq: '',
                nombreGrupoReq: '',
                proyecto: '',
                estadoReq: '',
                entryPerfilWebCreador: ''
            };

            $scope.item = {
                sincronizado: '',
                descripcion: '',
                articulo: '',
                entryItemMovil: $stateParams.id_item,
                tipo: '',
                reqTipo: '',
                fecha: '',
                cantidadSolicitada: '',
                cantidadAprobada: '',
                proveedor: '',
                almacen: '',
                centroCosto: '',
                proyecto: '',
                entryReqMovil: '',
                articuloCodigo: '',
                articuloNombre: ''
            };

            $scope.opcion_reqtipo = [
                {opcion: "Suministro", valor: "0"},
                {opcion: "Inventario", valor: "1"}
            ];

            $scope.opcion_tipo = [
                {opcion: "Artículo", valor: "0"},
                {opcion: "Servicio", valor: "1"}
            ];

            $scope.item.reqTipo = $scope.opcion_reqtipo[0];
            $scope.item.tipo = $scope.opcion_tipo[1];

            Items.getItem($scope.item).then(function (items) {
                var itemAux = angular.copy(items);
                $scope.item = {
                    sincronizado: itemAux.Sincronizado,
                    descripcion: itemAux.Descripcion,
                    articulo: itemAux.Articulo,
                    articuloCodigo: itemAux.ArticuloCodigo,
                    articuloNombre: itemAux.ArticuloNombre,
                    entryItemMovil: $stateParams.id_item,
                    tipo: itemAux.Tipo,
                    reqTipo: itemAux.ReqTipo,
                    fecha: itemAux.Fecha,
                    cantidadSolicitada: Number(itemAux.CantidadSolicitada),
                    cantidadAprobada: Number(itemAux.CantidadAprobada),
                    proveedor: itemAux.Proveedor,
                    almacen: itemAux.Almacen,
                    centroCosto: '',
                    proyecto: '',
                    entryReqMovil: itemAux.EntryReqMovil
                };
                angular.forEach($scope.opcion_tipo, function (clave) {
                    if (clave.valor === $scope.item.tipo) {
                        $scope.item.tipo = clave;
                    }
                });
                angular.forEach($scope.opcion_reqtipo, function (clave) {
                    if (clave.valor === $scope.item.reqTipo) {
                        $scope.item.reqTipo = clave;
                    }
                });

                Items.getItemsCabecera($scope.item).then(function (resultado) {
                    $scope.res = angular.copy(resultado);
                    $scope.itemCabecera = {
                        sincronizado: $scope.res.Sincronizado,
                        entryPerfilMovil: $scope.res.EntryPerfilMovil,
                        entryPerfilWeb: $scope.res.EntryPerfilWeb,
                        nombrePerfil: $scope.res.Perfil,
                        nombreGrupo: $scope.res.NombreGrupo,
                        idGrupo: $scope.res.IdGrupo,
                        descripcionReq: $scope.res.DescripcionReq,
                        entryReqMovil: $scope.res.EntryReqMovil,
                        almacen: $scope.res.AlmacenSap,
                        idGrupoReq: $scope.res.DimensionSap,
                        nombreGrupoReq: '',
                        proyecto: $scope.res.ProyectoSap,
                        estadoReq: $scope.res.EstadoReq,
                        entryPerfilWebCreador: $scope.res.EntryPerfilWebCreador
                    };
                    $scope.item.almacen = $scope.itemCabecera.almacen;
                    $scope.item.proyecto = $scope.itemCabecera.proyecto;
                });

            });

            $scope.editarite = function (item, form) {
                var camposInvalidos = 0;
                for (var x in $scope.nuevoItemForm) {
                    var prop = $scope.nuevoItemForm[x];
                    if (prop && prop.$invalid) {
                        camposInvalidos = 1;
                    }
                }
                if (camposInvalidos !== 1) {
                    if (item.descripcion !== '') {
                        if (item.cantidadAprobada === null || item.cantidadAprobada === '') {
                            $scope.item.cantidadAprobada = '0';
                        } else {
                            $scope.item.cantidadAprobada = item.cantidadAprobada;
                        }
                        var record = angular.copy(item);
                        record.sincronizado = '';
                        record.descripcion = item.descripcion;
                        record.articulo = $scope.item.articulo;
                        record.articuloNombre = $scope.item.articuloNombre;
                        record.articuloCodigo = $scope.item.articuloCodigo;
                        record.entryItemMovil = $scope.item.entryItemMovil;
                        record.tipo = item.tipo.valor;
                        record.reqTipo = item.reqTipo.valor;
                        record.fecha = item.fecha;
                        record.cantidadSolicitada = item.cantidadSolicitada;
                        record.cantidadAprobada = $scope.item.cantidadAprobada;
                        record.proveedor = item.proveedor;
                        record.almacen = $scope.item.almacen;
                        record.centroCosto = $scope.item.centroCosto;
                        record.proyecto = item.proyecto;
                        record.entryReqMovil = $scope.item.entryReqMovil;
                        console.log(record);
                        Items.putItem(record).then(function (resultado) {
                            $scope.respuesta = angular.copy(resultado);
                            $rootScope.$emit('recargarItems');
                            alert('Se ha actualizado el item con éxito');

                            form.$setPristine();
                            form.$setUntouched();
                            //  $state.go('menu.requisicion.abiertas');
                        });
                    } else {
//                    perfil.$update();
                    }
                } else {
                    alert('Error: Uno o más campos son inválidos');
                }
//                }
            };

            $scope.consultarstock = function (item) {
                //if ($scope.item.articuloCodigo !== null && $scope.item.articuloCodigo !== '' && $scope.item.almacen !== null && $scope.item.almacen !== '') {

                //}
                if ($scope.itemCabecera.estadoReq !== 'aprobacion') {
                    $state.go('menu.requisicion.consultarstock', {id_item: $scope.item.articuloCodigo, id_perfil: $scope.itemCabecera.entryPerfilWeb, id_requisicion: $scope.itemCabecera.entryReqMovil});
                } else {
                    $state.go('menu.requisicion.consultarstockAprobacion', {id_item: $scope.item.articuloCodigo, id_perfil: $scope.itemCabecera.entryPerfilWebCreador, id_requisicion: $scope.itemCabecera.entryReqMovil});
                }
            };

            $scope.validarEntero = function (valor, formItem) {
                //intento convertir a entero. 


                //Compruebo si es un valor numérico 
                if (isNaN(valor)) {
                    //entonces (no es numero) devuelvo el valor cadena vacia 
                    alert('Debe ingresar un número');
                } else {
                    if (valor % 1 == 0) {

                    } else {
                        formItem.cantidadaprobada.$invalid = false;
                        alert("Debe ingresar un número entero");
                    }

                }
            };

        })

        .controller('stockCtrl', function ($scope, $stateParams, Sincronizar, Requisiciones, Items, $rootScope, $ionicModal, $state) {
            $scope.cancelev = function (e) {
                if (e.keyCode == 27) {
                    $scope.userForm.userName.$rollbackViewValue();
                }
            };

            $scope.item = {
                sincronizado: '',
                descripcion: '',
                articulo: '',
                articuloCodigo: $stateParams.id_item,
                articuloNombre: $stateParams.id_item,
                entryItemMovil: '',
                tipo: '',
                reqTipo: '',
                fecha: '',
                cantidadSolicitada: '',
                cantidadAprobada: '',
                proveedor: '',
                almacen: '',
                centroCosto: '',
                proyecto: '',
                entryReqMovil: $stateParams.id_requisicion,
                entryPerfilWeb: $stateParams.id_perfil
            };

            $scope.pdfUrl = 'stock.pdf';
            alert("Recuerde: La carga del archivo de stock podría tardar unos minutos");
            //if ($scope.item.articuloCodigo !== null && $scope.item.articuloCodigo !== '' && $scope.item.almacen !== null && $scope.item.almacen !== '') {

            Items.getStock($scope.item).then(function (resultado) {

                $scope.respuesta = angular.copy(resultado);
                if ($scope.respuesta !== '0') {

                    $scope.resultadoStock = $scope.respuesta[0];

                    var dataHTML = "<html><head><meta charset=\"utf-8\"></head><body><table style=\"border-width: 1px;\"><thead><th colspan=\"2\" align=\"center\">STOCK</th></thead><tbody><tr><td colspan=\"2\" align=\"center\" style=\"background: #c6c4c4;\"></td></tr><tr style=\"background: #e8e8e8;\" align=\"center\"><td>Codigo Artículo</td><td>" + $scope.resultadoStock.codigoArticulo + "</td></tr><tr style=\"background: #ffffff;\" align=\"center\"><td>Nombre Artículo</td><td>" + $scope.resultadoStock.nombreArticulo + "</td></tr><tr style=\"background: #e8e8e8;\" align=\"center\"><td>En stock</td><td>" + $scope.resultadoStock.disponible + "</td></tr><tr style=\"background: #ffffff;\" align=\"center\"><td>Comprometido</td><td>" + $scope.resultadoStock.comprometido + "</td></tr><tr style=\"background: #e8e8e8;\" align=\"center\"><td>Solicitado</td><td>" + $scope.resultadoStock.pedido + "</td></tr><tr style=\"background: #ffffff;\" align=\"center\"><td>Óptimo</td><td>" + $scope.resultadoStock.optimo + "</td></tr><tr style=\"background: #e8e8e8;\" align=\"center\"><td>Almacén</td><td>" + $scope.resultadoStock.almacen + "</td></tr></tbody></table></body></html>";
                    var ruta = "~/Documents/stock.pdf";// on iOS,
                    // "test.pdf", on Android (will be stored in /mnt/sdcard/at.modalog.cordova.plugin.html2pdf/test.pdf)
                    ruta = "img/stock.pdf";

                    var canvas = document.getElementById("thecanvas"),
                            context = canvas.getContext('2d');
                    /* html_container = document.getElementById("thehtml"),
                     html = html_container.innerHTML;*/

                    rasterizeHTML.drawHTML(dataHTML).then(function (renderResult) {
                        context.drawImage(renderResult.image, 25, 10);
                        try {
                            console.log(canvas.toDataURL());
                            var content = canvas.toDataURL('image/png');
                            console.log("generando pdf...");
                            //Generating pdf file
                            var doc = new jsPDF();
                            //Setting properties
                            doc.setProperties({
                                title: 'Stock',
                                subject: 'Consultar Stock',
                                author: 'Consensus',
                                creator: 'Consensus'
                            });
                            //Adding html content as a png image into the pdf file
                            doc.addImage(content, 'PNG', 0, 0);
                            doc.setFontSize(10);
                            doc.text(188, 290, 'Page ' + 01);
                            var data = doc.output();
                            var buffer = new ArrayBuffer(data.length);
                            var array = new Uint8Array(buffer);

                            for (var i = 0; i < data.length; i++) {
                                array[i] = data.charCodeAt(i);
                            }

                            var blob = new Blob(
                                    [array],
                                    {type: 'application/pdf', encoding: 'raw'}
                            );

                            //Save generated pdf inside local file system
                            saveAs(blob, "stock");

                            //Accessing the file system through cordova file plugin
                            console.log("file system...");
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {

                                console.log(fileSystem.name);
                                console.log(fileSystem.root.name);
                                console.log(fileSystem.root.fullPath);

                                fileSystem.root.getFile("stock.pdf", {create: true}, function (entry) {
                                    var fileEntry = entry;
                                    console.log(entry);

                                    entry.createWriter(function (writer) {
                                        writer.onwrite = function (evt) {
                                            console.log("write success");
                                        };
                                        console.log("writing to file");

                                        //Writing the pdf
                                        writer.write(blob);


                                    }, function (error) {
                                        console.log(error);
                                    });

                                }, function (error) {
                                    console.log(error);
                                });
                            },
                                    function (event) {
                                        console.log(evt.target.error.code);
                                    });

                        } catch (e) {
                            console.log(e);
                        }
                        ;
                    });

                } else {
                    alert("No se puede establecer conexión con el servidor");
                    $state.go('menu.requisicion.nuevo-item', {id_requisicion: $scope.item.entryReqMovil});
                }
            });


        })

        .controller('requisicionConfirmadaCtrl', function ($scope, Requisiciones, Perfiles, Sincronizar, $rootScope, $state, $cordovaNetwork, $ionicModal) {
            $scope.requisiciones = null;
            $rootScope.pulsacion = 0;
            $scope.isOffline;
            $scope.iritem = function (requisicion) {
                if (requisicion.entryReqMovil !== null) {
                    $state.go('menu.requisicion.item', {id_requisicion: requisicion.entryReqMovil});
                }
            };
            $scope.requisicion = {
                sincronizado: '',
                entryReqMovil: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDReq: '',
                noAprobacion: '',
                entryReqWeb: '',
                valorAux: ''
            };

            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: '',
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                perfilNombreAux: ''
            };

            $ionicModal.fromTemplateUrl('cargando-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirCargandoModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarCargandoModal = function () {
                $scope.modal.hide();
            };


            Requisiciones.getRequisiciones('aprobada').then(function (requisiciones) {
                $scope.requisiciones = null;
                $scope.requisiciones = angular.copy(requisiciones);
                if ($scope.requisiciones !== null && $scope.requisiciones !== "") {
                    console.log($scope.requisiciones);
                }

            });
            var objRecargarRequisiciones = $rootScope.$on('recargarRequisicionesConfirmada', function (event, data) {
                $scope.requisiciones = null;
                $scope.requisiciones = [];
                try {
                    Requisiciones.getRequisiciones('aprobada').then(function (requisiciones) {
                        $scope.requisiciones = angular.copy(requisiciones);

                        console.log('recargarRequisicionesConfirmada 1');
                    });

                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarRequisiciones);
            $scope.enviar;

            $scope.eliminarRequisicion = function (requisicionAux) {
                if (requisicionAux.entryReqMovil !== null) {
                    Requisiciones.deleteRequisicion(requisicionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la requisicion con exito');
                        } else {
                            alert('Error al eliminar requisicion');
                        }
                        //  $rootScope.$emit('recargarGastos');
                        // $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarRequisicionesConfirmada');
                        console.log('recargarEliminarRequisicionConfirmada 5');
                    });
                }
            };
            
             $scope.sincronizacionReq = function (tabReq) {
                Sincronizar.getSincronizar().then(function (sincronizar) {
                    $scope.sincronizar = angular.copy(sincronizar);
                    console.log($scope.sincronizar);
                    if ($scope.sincronizar !== null) {
                        Sincronizar.getUltimaFecha().then(function (fecha) {

                            $rootScope.datos = {
                                fecha: fecha};
                            alert("Sincronización Exitosa");
                        });
                        Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {

                            $scope.respuesta = angular.copy(resultado);
                            Sincronizar.putGastosWeb($scope.respuesta[1]).then(function (resultado) {
                                console.log('ingreso Gastos');
                            });

                            Sincronizar.getUltimaFecha().then(function (fecha) {
                                $rootScope.datos = {
                                    fecha: fecha};
                                alert("Sincronización Exitosa");
                            });

                            console.log('menu.requisicion.' + tabReq);
                            $state.go('menu.requisicion.' + tabReq);

                            $rootScope.$emit('recargarRequisicionesConfirmada');
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                            $rootScope.$emit('recargarRequisicionesEnviada');
                        });
                    }
                });
            };
        })

        .controller('requisicionEnviadaCtrl', function ($scope, Requisiciones, Perfiles, Sincronizar, $rootScope, $state, $cordovaNetwork, $ionicModal) {
            $scope.requisiciones;
            $rootScope.pulsacion = 0;
            $scope.isOffline;
            $scope.iritem = function (requisicion) {
                if (requisicion.entryReqMovil !== null) {
                    $state.go('menu.requisicion.item', {id_requisicion: requisicion.entryReqMovil});
                }
            };
            $scope.requisicion = {
                sincronizado: '',
                entryReqMovil: '',
                descripcion: '',
                entryPerfilMovil: '',
                estado: '',
                fechaAutorizacion: '',
                fechaSincronizacion: '',
                iDReq: '',
                noAprobacion: '',
                entryReqWeb: '',
                valorAux: ''
            };

            $scope.perfil = {
                sincronizado: '',
                entryPerfilMovil: '',
                entryPerfilWeb: '',
                docPerfil: '',
                perfil: '',
                emailPerfil: '',
                proyecto: '',
                sn: '',
                company: '',
                aprobador: '',
                dimension1: '',
                dimension2: '',
                dimension3: '',
                dimension4: '',
                dimension5: '',
                habilitado: '',
                idGrupo: '',
                enviaRequisicion: '',
                aprobadorRequisicion: '',
                dimensionSap: '',
                almacenSap: '',
                proyectoSap: '',
                perfilNombreAux: ''
            };

            $ionicModal.fromTemplateUrl('cargando-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.abrirCargandoModal = function () {
                $scope.modal.show();
            };
            $scope.cerrarCargandoModal = function () {
                $scope.modal.hide();
            };


            Requisiciones.getRequisiciones('enviada').then(function (requisiciones) {
                $scope.requisiciones = null;
                $scope.requisiciones = angular.copy(requisiciones);
                if ($scope.requisiciones !== null && $scope.requisiciones !== "") {
                    console.log($scope.requisiciones);
                }

            });
            var objRecargarRequisiciones = $rootScope.$on('recargarRequisicionesEnviada', function (event, data) {
                $scope.requisiciones = null;
                $scope.requisiciones = [];
                try {
                    Requisiciones.getRequisiciones('enviada').then(function (requisiciones) {
                        $scope.requisiciones = angular.copy(requisiciones);

                        console.log('recargarRequisicionesEnviada 1');
                    });

                } catch (e) {
                    console.log(e.message);
                }
            });
            $scope.$on('$destroy', objRecargarRequisiciones);
            $scope.enviar;

            $scope.eliminarRequisicion = function (requisicionAux) {
                if (requisicionAux.entryReqMovil !== null) {
                    Requisiciones.deleteRequisicion(requisicionAux).then(function (resultado) {
                        $scope.respuesta = angular.copy(resultado);
                        if ($scope.respuesta === '1') {
                            alert($scope.enviar = 'Se eliminó la requisicion con exito');
                        } else {
                            alert('Error al eliminar requisicion');
                        }
                        //  $rootScope.$emit('recargarGastos');
                        // $rootScope.$emit('recargarFacturas');
                        $rootScope.$emit('recargarRequisicionesEnviada');
                        console.log('recargarEliminarRequisicionEnviada 5');
                    });
                }
            };
            
             $scope.sincronizacionReq = function (tabReq) {
                Sincronizar.getSincronizar().then(function (sincronizar) {
                    $scope.sincronizar = angular.copy(sincronizar);
                    console.log($scope.sincronizar);
                    if ($scope.sincronizar !== null) {
                        Sincronizar.getUltimaFecha().then(function (fecha) {

                            $rootScope.datos = {
                                fecha: fecha};
                        });
                        Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {

                            $scope.respuesta = angular.copy(resultado);
                            Sincronizar.putGastosWeb($scope.respuesta[1]).then(function (resultado) {
                                console.log('ingreso Gastos');
                            });

                            Sincronizar.getUltimaFecha().then(function (fecha) {
                                $rootScope.datos = {
                                    fecha: fecha};
                                alert("Sincronización Exitosa");
                            });

                            console.log('menu.requisicion.' + tabReq);
                            $state.go('menu.requisicion.' + tabReq);

                            $rootScope.$emit('recargarRequisicionesConfirmada');
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                            $rootScope.$emit('recargarRequisicionesEnviada');


                        });
                    }
                });
            };
        })



        .controller('requisicionCtrl', function ($scope, Sincronizar, $rootScope, $ionicModal, Perfiles, Items, $state) {
            $scope.sincronizar;
            $scope.sincronizacionReq = function (tabReq) {
                Sincronizar.getSincronizar().then(function (sincronizar) {
                    $scope.sincronizar = angular.copy(sincronizar);
                    console.log($scope.sincronizar);
                    if ($scope.sincronizar !== null) {
                        Sincronizar.getUltimaFecha().then(function (fecha) {

                            $rootScope.datos = {
                                fecha: fecha};
                        });
                        Sincronizar.putSincronizar($scope.sincronizar).then(function (resultado) {

                            $scope.respuesta = angular.copy(resultado);
                            Sincronizar.putGastosWeb($scope.respuesta[1]).then(function (resultado) {
                                console.log('ingreso Gastos');
                            });

                            if (resultado[0] === '1') {
                                alert('Sincronizacion exitosa');
                            } else {
                                alert('Error al sincronizar');
                            }
                            Sincronizar.getUltimaFecha().then(function (fecha) {
                                $rootScope.datos = {
                                    fecha: fecha};
                                alert("Sincronización Exitosa");
                            });

                            console.log('menu.requisicion.' + tabReq);
                            $state.go('menu.requisicion.' + tabReq);

                            $rootScope.$emit('recargarRequisicionesConfirmada');
                            $rootScope.$emit('recargarRequisicionesAprobacion');
                            $rootScope.$emit('recargarRequisicionesEnviada');


                        });
                    }
                });
            };
        })
        ;



