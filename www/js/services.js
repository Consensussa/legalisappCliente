angular.module('app.services', ['ngCordova', 'ngResource'])
        .factory('Perfiles', function ($cordovaSQLite, $q, $http) {
            var perfiles = [];
            var perfilesHabilitados = [];
            return {
                postPerfil: function (perfilAux) {

                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;

                    console.log(perfilAux);

                    var query = "INSERT INTO ok1_perf (`Sincronizado`, `DocPerfil`,`Perfil`,`EmailPerfil`,`Proyecto`,`SN`,`Company`,`Aprobador`,`Dimension1`,`Dimension2`,`Dimension3`,`Dimension4`,`Dimension5`, `Habilitado`, IdGrupo, EnviaRequisicion, AprobadorRequisicion, DimensionSap, AlmacenSap, ProyectoSap, EntryPerfilWebAprobador, EntryPerfilMovilAprobador) \n\
                    VALUES ('0','" + perfilAux.docPerfil + "','" + perfilAux.perfil + "','" + perfilAux.emailPerfil + "','" + perfilAux.proyecto + "','1','" + perfilAux.company + "','" + perfilAux.aprobador + "','" + perfilAux.dimension1 + "','" + perfilAux.dimension2 + "','" + perfilAux.dimension3 + "','" + perfilAux.dimension4 + "','" + perfilAux.dimension5 + "', '1','" + perfilAux.idGrupo + "','" + perfilAux.enviaRequisicion + "','" + perfilAux.aprobadorRequisicion + "','" + perfilAux.dimensionSap + "','" + perfilAux.almacenSap + "','" + perfilAux.proyectoSap + "','" + perfilAux.entryPerfilWebAprobador + "','" + perfilAux.entryPerfilMovilAprobador + "')";

                    console.log(query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        perfiles.push({sincronizado: '0',
                            entryPerfilMovil: result.insertId,
                            entryPerfilWeb: '',
                            docPerfil: perfilAux.docPerfil,
                            perfil: perfilAux.perfil,
                            emailPerfil: perfilAux.emailPerfil,
                            proyecto: perfilAux.proyecto,
                            sn: '1',
                            company: perfilAux.company,
                            aprobador: perfilAux.aprobador,
                            dimension1: perfilAux.dimension1,
                            dimension2: perfilAux.dimension2,
                            dimension3: perfilAux.dimension3,
                            dimension4: perfilAux.dimension4,
                            dimension5: perfilAux.dimension5,
                            habilitado: '1',
                            idGrupo: perfilAux.idGrupo,
                            enviaRequisicion: perfilAux.enviaRequisicion,
                            aprobadorRequisicion: perfilAux.aprobadorRequisicion,
                            dimensionSap: perfilAux.dimensionSap,
                            almacenSap: perfilAux.almacenSap,
                            proyectoSap: perfilAux.proyectoSap,
                            entryPerfilWebAprobador: perfilAux.entryPerfilWebAprobador,
                            entryPerfilMovilAprobador: perfilAux.entryPerfilMovilAprobador
                        });
                        console.log(perfiles);
                        resultado = result.insertId;
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert perfil' + resultado);
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                },
                getPerfil: function (entryPerfilMovil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT p.*, c.Nombre FROM ok1_perf p, ok1_comp c WHERE c.Company = p.Company AND p.entryPerfilMovil =" + entryPerfilMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log(res.rows.item(0));
                                console.log(res.rows.item(0).idGrupo);
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).Aprobador);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                },
                getPerfiles: function () {
                    perfiles = null;
                    perfiles = [];
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT p.*, c.Nombre AS NombreBd FROM ok1_perf p INNER JOIN ok1_comp c ON (p.Company = c.Company)";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                perfiles.push({sincronizado: res.rows.item(i).Sincronizado,
                                    entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                    entryPerfilWeb: res.rows.item(i).EntryPerfilWeb,
                                    docPerfil: res.rows.item(i).DocPerfil,
                                    perfil: res.rows.item(i).Perfil,
                                    emailPerfil: res.rows.item(i).EmailPerfil,
                                    proyecto: res.rows.item(i).Proyecto,
                                    sn: res.rows.item(i).SN,
                                    company: res.rows.item(i).Company,
                                    aprobador: res.rows.item(i).Aprobador,
                                    dimension1: res.rows.item(i).Dimension1,
                                    dimension2: res.rows.item(i).Dimension2,
                                    dimension3: res.rows.item(i).Dimension3,
                                    dimension4: res.rows.item(i).Dimension4,
                                    dimension5: res.rows.item(i).Dimension5,
                                    habilitado: res.rows.item(i).Habilitado,
                                    idGrupo: res.rows.item(i).IdGrupo,
                                    enviaRequisicion: res.rows.item(i).EnviaRequisicion,
                                    aprobadorRequisicion: res.rows.item(i).AprobadorRequisicion,
                                    dimensionSap: res.rows.item(i).DimensionSap,
                                    almacenSap: res.rows.item(i).AlmacenSap,
                                    proyectoSap: res.rows.item(i).ProyectoSap,
                                    entryPerfilWebAprobador: res.rows.item(i).entryPerfilWebAprobador,
                                    entryPerfilMovilAprobador: res.rows.item(i).entryPerfilMovilAprobador,
                                    nombreCompany: res.rows.item(i).NombreBd,
                                    enviaRequisicionAux: ''
                                });
                            }
                            try {
                                defered.resolve(perfiles);
                                console.log('resolvió la promesa' + perfiles[0].Perfil + ' ' + perfiles[0].Habilitado);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa');
                            }
                        } else {
                            defered.resolve('no_data');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, putPerfil: function (perfilActual) {
                    var defered = $q.defer();
                    var promise = defered.promise;

                    if (perfilActual.entryPerfilWeb === '' || perfilActual.entryPerfilWeb === null) {
                        perfilActual.entryPerfilWeb = '-1';

                        var query = "UPDATE ok1_perf SET Proyecto =" + perfilActual.proyecto + ", Dimension1 =" + perfilActual.dimension1 +
                                ", Dimension2 =" + perfilActual.dimension2 + ", Aprobador ='" + perfilActual.aprobador +
                                "', EntryPerfilWeb ='" + perfilActual.entryPerfilWeb + "', EmailPerfil ='" + perfilActual.emailPerfil +
                                "', IdGrupo ='" + perfilActual.idGrupo + "', EnviaRequisicion ='" + perfilActual.enviaRequisicion +
                                "', DimensionSap ='" + perfilActual.dimensionSap + "', AlmacenSap ='" + perfilActual.almacenSap +
                                "', ProyectoSap ='" + perfilActual.proyectoSap +
                                "', EntryPerfilWebAprobador ='" + perfilActual.entryPerfilWebAprobador +
                                "', EntryPerfilMovilAprobador ='" + perfilActual.entryPerfilMovilAprobador +
                                "', AprobadorRequisicion ='" + perfilActual.aprobadorRequisicion + "' WHERE EntryPerfilMovil=" + perfilActual.entryPerfilMovil;
                        console.log(query);
                        $cordovaSQLite.execute(db, query).then(function (result) {
                            try {
                                defered.resolve('1');
                                console.log('resolvió la promesa - update resultado 1');
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa 0');
                            }

                        }, function (error) {
                            console.error(error);
                        });
                    } else {
                        console.log(perfilActual);
                        var query2 = "SELECT IdGrupo FROM ok1_grupo_gto WHERE IdGrupoWeb =" + perfilActual.idGrupo;
                        console.log(query2);

                        db.executeSql(query2, [], function (res) {
                            if (res.rows.length > 0) {
                                console.log(perfilActual);
                                try {
                                    perfilActual.idGrupo = res.rows.item(0).IdGrupo;

                                    var query = "UPDATE ok1_perf SET Proyecto =" + perfilActual.proyecto + ", Dimension1 =" + perfilActual.dimension1 +
                                            ", Dimension2 =" + perfilActual.dimension2 + ", Aprobador ='" + perfilActual.aprobador +
                                            "', EntryPerfilWeb ='" + perfilActual.entryPerfilWeb + "', EmailPerfil ='" + perfilActual.emailPerfil +
                                            "', IdGrupo ='" + perfilActual.idGrupo + "', EnviaRequisicion ='" + perfilActual.enviaRequisicion +
                                            "', DimensionSap ='" + perfilActual.dimensionSap + "', AlmacenSap ='" + perfilActual.almacenSap +
                                            "', ProyectoSap ='" + perfilActual.proyectoSap +
                                            "', EntryPerfilWebAprobador ='" + perfilActual.entryPerfilWebAprobador +
                                            "', EntryPerfilMovilAprobador ='" + perfilActual.entryPerfilMovilAprobador +
                                            "', AprobadorRequisicion ='" + perfilActual.aprobadorRequisicion + "' WHERE EntryPerfilMovil=" + perfilActual.entryPerfilMovil;
                                    console.log(query);
                                    console.log(res.rows);

                                    $cordovaSQLite.execute(db, query).then(function (result) {
                                        try {
                                            defered.resolve('1');
                                            console.log('resolvió la promesa - update resultado 1');
                                        } catch (e) {
                                            defered.resolve(e);
                                            console.log(' no es posible resolver la promesa 0');
                                        }

                                    }, function (error) {
                                        console.error(error);
                                    });

                                } catch (e) {
                                    console.log(' no se encontro grupo');
                                }
                            } else {
                                if (perfilActual.idGrupo != null && perfilActual.idGrupo != '' && perfilActual.idGrupo != '0') {
                                    try {
                                        var query = "UPDATE ok1_perf SET Proyecto =" + perfilActual.proyecto + ", Dimension1 =" + perfilActual.dimension1 +
                                                ", Dimension2 =" + perfilActual.dimension2 + ", Aprobador ='" + perfilActual.aprobador +
                                                "', EntryPerfilWeb ='" + perfilActual.entryPerfilWeb + "', EmailPerfil ='" + perfilActual.emailPerfil +
                                                "', IdGrupo ='" + perfilActual.idGrupo + "', EnviaRequisicion ='" + perfilActual.enviaRequisicion +
                                                "', DimensionSap ='" + perfilActual.dimensionSap + "', AlmacenSap ='" + perfilActual.almacenSap +
                                                "', ProyectoSap ='" + perfilActual.proyectoSap +
                                                "', EntryPerfilWebAprobador ='" + perfilActual.entryPerfilWebAprobador +
                                                "', EntryPerfilMovilAprobador ='" + perfilActual.entryPerfilMovilAprobador +
                                                "', AprobadorRequisicion ='" + perfilActual.aprobadorRequisicion + "' WHERE EntryPerfilMovil=" + perfilActual.entryPerfilMovil;
                                        console.log(query);
                                        console.log(res.rows);

                                        $cordovaSQLite.execute(db, query).then(function (result) {
                                            try {
                                                defered.resolve('1');
                                                console.log('resolvió la promesa - update resultado 1');
                                            } catch (e) {
                                                defered.resolve('0');
                                                console.log(' no es posible resolver la promesa 0');
                                            }

                                        }, function (error) {
                                            console.error(error);
                                        });

                                    } catch (e) {
                                        console.log(' no se encontro grupo');
                                    }
                                }
                            }

                        }, function (err) {
                            console.error(err);
                        });
                    }
                    return promise;
                }, habilitar: function (perfilActual) {
                    console.log(perfilActual);
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var estado = perfilActual.habilitado;
                    if (estado === 0) {
                        estado = 1;
                    } else {
                        estado = 0;
                    }
                    var query = "UPDATE ok1_perf SET Habilitado =" + estado + " WHERE EntryPerfilMovil=" + perfilActual.entryPerfilMovil;
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - habilitar resultado 1');
                        } catch (e) {
                            defered.resolve(e);
                            console.log(' no es posible resolver la promesa habilitar 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                },
                getPerfilesHabilitados: function () {
                    perfilesHabilitados = null;
                    perfilesHabilitados = [];
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT p.*, gr.NombreGrupo ,p.Perfil || ' - ' || gr.NombreGrupo AS PerfilGrupo FROM ok1_perf p, ok1_grupo_gto gr WHERE p.Habilitado = 1 AND p.IdGrupo = gr.IdGrupo";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                perfilesHabilitados.push({sincronizado: res.rows.item(i).Sincronizado,
                                    entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                    entryPerfilWeb: res.rows.item(i).EntryPerfilWeb,
                                    docPerfil: res.rows.item(i).DocPerfil,
                                    perfil: res.rows.item(i).Perfil,
                                    emailPerfil: res.rows.item(i).EmailPerfil,
                                    proyecto: res.rows.item(i).Proyecto,
                                    sn: res.rows.item(i).SN,
                                    company: res.rows.item(i).Company,
                                    aprobador: res.rows.item(i).Aprobador,
                                    dimension1: res.rows.item(i).Dimension1,
                                    dimension2: res.rows.item(i).Dimension2,
                                    dimension3: res.rows.item(i).Dimension3,
                                    dimension4: res.rows.item(i).Dimension4,
                                    dimension5: res.rows.item(i).Dimension5,
                                    habilitado: res.rows.item(i).Habilitado,
                                    idGrupo: res.rows.item(i).IdGrupo,
                                    nombreGrupo: res.rows.item(i).NombreGrupo,
                                    perfilGrupo: res.rows.item(i).PerfilGrupo,
                                    enviaRequisicion: res.rows.item(i).EnviaRequisicion,
                                    aprobadorRequisicion: res.rows.item(i).AprobadorRequisicion,
                                    dimensionSap: res.rows.item(i).DimensionSap,
                                    almacenSap: res.rows.item(i).AlmacenSap,
                                    proyectoSap: res.rows.item(i).ProyectoSap,
                                    entryPerfilWebAprobador: res.rows.item(i).EntryPerfilWebAprobador,
                                    entryPerfilMovilAprobador: res.rows.item(i).EntryPerfilMovilAprobador
                                });
                            }

                            try {
                                defered.resolve(perfilesHabilitados);
                                console.log('resolvió la promesa perfiles habilitados ' + perfilesHabilitados[0].entryPerfilMovil + ' ' + perfilesHabilitados[0].habilitado);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa');
                            }
                        } else {
                            defered.resolve('no_data');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                },
                getCompany: function (company, codv) {
                    perfiles = [];
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT Company FROM ok1_comp WHERE Nit = '" + company + "' AND CodigoVerificacion ='" + codv + "'";

                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {

                                defered.resolve(res.rows.item(0).Company);
                                console.log('resolvió la promesa company ' + res.rows.item(0).Company);
                                console.log(res.rows.item(0));
                                console.log(res.rows.item(0).Company);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa -  if company');
                            }
                        } else {
                            try {
                                defered.resolve('');
                                console.log('No existen datos company');
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa - else company');
                            }
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, postCompany: function (company, codverificacion) {

                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.get('http://cn-okone.com/legalisappServidor/public/company_nit/' + company + '/' + codverificacion).success(function (data) {
                        console.log('http://cn-okone.com/legalisappServidor/public/company_nit/' + company + '/' + codverificacion);

                        resultado = data['result'];
                        if (resultado !== null && resultado !== '') {
                            var query = "INSERT INTO ok1_comp (`Sincronizado`, `Company`,`CodigoVerificacion`,`Nit`,`Nombre`) \n\
                    VALUES ('1','" + resultado['EntryComWeb'] + "','" + resultado['CodigoVerificacion'] + "','" + resultado['Nit'] + "','" + resultado['Nombre'] + "')";
                            query = query.replace("''", "null");
                            console.log(query);
                            $cordovaSQLite.execute(db, query).then(function (result) {
                                try {
                                    defered.resolve(resultado);
                                    console.log('resolvió la promesa - insert company');
                                    console.log(resultado);

                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }

                            }, function (error) {
                                console.error(error);
                            });
                        } else {
                            try {
                                defered.resolve('1');
                                console.log('resolvió la promesa - insert' + resultado);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa');
                            }
                        }
                        defered.resolve(data['result']);
                    })
                            .error(function (msg, code) {
                                defered.resolve(msg);
                            });
                    return promise;
                }, postTiposGto: function (company) {
                    console.log('ttt');
                    console.log(company);
                    var query = '';
                    var resultado = '';
                    var resultadoAux = '';
                    var defered = $q.defer();
                    var promise = defered.promise;
                    $http.get('http://cn-okone.com/legalisappServidor/public/tiposGto/' + company).success(function (data) {
                        resultado = data['result'];
                        for (var i = 0; i < resultado.length; i++) {
                            resultadoAux = resultado[i];
                            query = "INSERT INTO ok1_tipo_gto (`Sincronizado`,`TipoGasto`,`Descripcion`,`Company`,`ExigeCampo1`,`ExigeCampo2`,\n\
                                                            `ExigeCampo3`,`NombreCampo1`,`NombreCampo2`, `NombreCampo3`,`TipoCampo1`,`TipoCampo2`,\n\
                                                            `TipoCampo3`,`Grupo01`,`Grupo02`,`Grupo03`,`Grupo04`,`Grupo05`,`Grupo06`,`Grupo07`, `Grupo08`, `ImpuestoSugerido`) \n\
                                    VALUES ('1','" + resultadoAux['EntryTipoGto'] + "','" + resultadoAux['NombreGasto'] + "','" +
                                    resultadoAux['EntryComWeb'] + "','" + resultadoAux['ExigeCampo1'] + "','" + resultadoAux['ExigeCampo2'] + "','" +
                                    resultadoAux['ExigeCampo3'] + "','" + resultadoAux['NombreCampo1'] + "','" + resultadoAux['NombreCampo2'] + "','" +
                                    resultadoAux['NombreCampo3'] + "','" + resultadoAux['TipoCampo1'] + "','" + resultadoAux['TipoCampo2'] + "','" +
                                    resultadoAux['TipoCampo3'] + "','" + resultadoAux['Grupo01'] + "','" + resultadoAux['Grupo02'] + "','" +
                                    resultadoAux['Grupo03'] + "','" + resultadoAux['Grupo04'] + "','" + resultadoAux['Grupo05'] + "','" +
                                    resultadoAux['Grupo06'] + "','" + resultadoAux['Grupo07'] + "','" + resultadoAux['Grupo08'] + "','"
                                    + resultadoAux['ImpuestoSugerido'] + "')";

                            query = query.replace("''", "null");
                            console.log(query);
                            try {
                                $cordovaSQLite.execute(db, query).then(function (result) {
                                    resultado = result;
                                }, function (error) {
                                    console.error(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                        defered.resolve(data['result']);
                    })
                            .error(function (msg, code) {
                                defered.resolve(msg);
                            });
                    return promise;
                }, getCompanyId: function (company) {
                    perfiles = [];
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT Nit FROM ok1_comp WHERE Company = '" + company + "'";

                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {

                                defered.resolve(res.rows.item(0).Nit);
                                console.log('resolvió la promesa company ' + res.rows.item(0).Nit);
                                console.log(res.rows.item(0));
                                console.log(res.rows.item(0).Nit);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa -  if company');
                            }
                        } else {
                            try {
                                defered.resolve('');
                                console.log('No existen datos company');
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa - else company');
                            }
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, postGruposGtoWeb: function (company) {
                    console.log('ggg');
                    console.log(company);
                    var query = '';
                    var resultado = '';
                    var resultadoAux = '';
                    var defered = $q.defer();
                    var promise = defered.promise;
                    $http.get('http://cn-okone.com/legalisappServidor/public/gruposGto/' + company).success(function (data) {
                        resultado = data['result'];
                        for (var i = 0; i < resultado.length; i++) {
                            resultadoAux = resultado[i];
                            console.log(resultadoAux);
                            query = "INSERT INTO ok1_grupo_gto (`Sincronizado`,`NombreGrupo`,`Company`,`IdGrupoWeb`,`IdGrupoSAP`)\n\
                                     VALUES ('1','" + resultadoAux['NombreGrupo'] + "','" +
                                    resultadoAux['EntryComWeb'] + "','" + resultadoAux['IdGrupoWeb'] + "','" +
                                    resultadoAux['IdGrupoSAP'] + "')";

                            query = query.replace("''", "null");
                            console.log(query);
                            try {
                                $cordovaSQLite.execute(db, query).then(function (result) {
                                    resultado = result;
                                }, function (error) {
                                    console.error(error);
                                    console.log(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                        defered.resolve(data['result']);
                    })
                            .error(function (msg, code) {
                                defered.resolve(msg);
                            });
                    return promise;
                },
                getPerfilNombre: function (perfil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT 1 AS valor FROM ok1_perf WHERE upper(Perfil) ='" + perfil.perfil.toUpperCase() + "'";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).valor);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                },
                getPerfilNombreWeb: function (perfil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    $http.get('http://cn-okone.com/legalisappServidor/public/perfilNombreWeb/' + perfil.perfil + '/' + perfil.company + '/').success(function (data) {
                        console.log('http://cn-okone.com/legalisappServidor/public/perfilNombreWeb/' + perfil.perfil + '/' + perfil.company + '/');
                        console.log(data['result'].valor);
                        defered.resolve(data['result'].valor);
                    })
                            .error(function (msg, code) {
                                console.log(msg);
                                console.log(code);
                                defered.resolve(msg);
                            });
                    return promise;
                },
                getPerfilesHabilitadosReq: function () {
                    perfilesHabilitados = null;
                    perfilesHabilitados = [];
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT p.*, gr.NombreGrupo ,p.Perfil || ' - ' || gr.NombreGrupo AS PerfilGrupo FROM ok1_perf p, ok1_grupo_gto gr WHERE p.Habilitado = 1 AND p.IdGrupo = gr.IdGrupo AND p.EnviaRequisicion='1'";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                perfilesHabilitados.push({sincronizado: res.rows.item(i).Sincronizado,
                                    entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                    entryPerfilWeb: res.rows.item(i).EntryPerfilWeb,
                                    docPerfil: res.rows.item(i).DocPerfil,
                                    perfil: res.rows.item(i).Perfil,
                                    emailPerfil: res.rows.item(i).EmailPerfil,
                                    proyecto: res.rows.item(i).Proyecto,
                                    sn: res.rows.item(i).SN,
                                    company: res.rows.item(i).Company,
                                    aprobador: res.rows.item(i).Aprobador,
                                    dimension1: res.rows.item(i).Dimension1,
                                    dimension2: res.rows.item(i).Dimension2,
                                    dimension3: res.rows.item(i).Dimension3,
                                    dimension4: res.rows.item(i).Dimension4,
                                    dimension5: res.rows.item(i).Dimension5,
                                    habilitado: res.rows.item(i).Habilitado,
                                    idGrupo: res.rows.item(i).IdGrupo,
                                    nombreGrupo: res.rows.item(i).NombreGrupo,
                                    perfilGrupo: res.rows.item(i).PerfilGrupo,
                                    enviaRequisicion: res.rows.item(i).EnviaRequisicion,
                                    aprobadorRequisicion: res.rows.item(i).AprobadorRequisicion,
                                    dimensionSap: res.rows.item(i).DimensionSap,
                                    almacenSap: res.rows.item(i).AlmacenSap,
                                    proyectoSap: res.rows.item(i).ProyectoSap,
                                    entryPerfilWebAprobador: res.rows.item(i).EntryPerfilWebAprobador,
                                    entryPerfilMovilAprobador: res.rows.item(i).EntryPerfilMovilAprobador
                                });
                            }

                            try {
                                defered.resolve(perfilesHabilitados);
                                console.log('resolvió la promesa perfiles habilitados ' + perfilesHabilitados[0].entryPerfilMovil + ' ' + perfilesHabilitados[0].habilitado);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa');
                            }
                        } else {
                            defered.resolve('no_data');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }
            };
        })



        .factory('Legalizaciones', function ($cordovaSQLite, $q) {
            var legalizaciones = [];
            var legalizacionesP = [];
            var legalizacionesA = [];
            var legalizacionesS = [];
            return {
                postLegalizacion: function (descripcion, entryPerfilMovil) {
                    var resultado = '';
                    var deferedleg = $q.defer();
                    var promise = deferedleg.promise;
                    var query = "INSERT INTO ok1_leg (`Sincronizado`, `Cargado`,`Descripcion`,`EntryPerfilMovil`,`Estado`,`FechaAutorizacion`,`FechaSincronizacion`,`IDLeg`,`NoAprobacion`,`Valor`,`EntryLegWeb`) \n\
                                 VALUES ('0','0','" + descripcion + "'," + entryPerfilMovil + ",'Abierto','01-01-2016','01-01-2016','','0','0','0')";
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        legalizaciones.push({
                            sincronizado: '',
                            entryLegMovil: result.insertId,
                            cargado: '',
                            descripcion: descripcion,
                            entryPerfilMovil: entryPerfilMovil,
                            estado: 'Abierto',
                            fechaAutorizacion: '',
                            fechaSincronizacion: '',
                            iDLeg: '',
                            noAprobacion: '',
                            valor: '',
                            entryLegWeb: ''
                        });
                        resultado = result.insertId;
                        try {
                            deferedleg.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            deferedleg.resolve(e);
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                },
                getLegalizacion: function (entryLegMovil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_leg WHERE EntryLegMovil =" + entryLegMovil;
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).EntryLegMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).EntryLegMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, getLegalizaciones: function (estleg) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "";

                    if (estleg === 'abierto') {
                        legalizaciones = null;
                        legalizaciones = [];

                        query = "SELECT l.*, p.Perfil as Nombre, gr.IdGrupo, gr.NombreGrupo  FROM ok1_leg l, ok1_perf p, ok1_grupo_gto gr WHERE l.entryPerfilMovil= p.entryPerfilMovil AND p.IdGrupo = gr.IdGrupo AND lower(Estado) = 'abierto' ORDER BY EntryLegMovil DESC";

                        db.executeSql(query, [], function (res) {
                            if (res.rows.length > 0) {
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    legalizaciones.push({sincronizado: res.rows.item(i).Sincronizado,
                                        entryLegMovil: res.rows.item(i).EntryLegMovil,
                                        cargado: res.rows.item(i).Cargado,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        estado: res.rows.item(i).Estado,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDLeg: res.rows.item(i).IDLeg,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        valor: res.rows.item(i).Valor,
                                        entryLegWeb: res.rows.item(i).EntryLegWeb,
                                        nombre: res.rows.item(i).Nombre,
                                        valorAux: '',
                                        idGrupo: res.rows.item(i).IdGrupo,
                                        nombreGrupo: res.rows.item(i).NombreGrupo
                                    });
                                }
                                console.log(legalizaciones);
                                try {
                                    defered.resolve(legalizaciones);
                                    console.log('resolvió la promesa');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }
                            } else {
                                defered.resolve('no_data');
                                console.log('No existen datos');
                            }
                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });

                    } else if (estleg === 'pendiente') {

                        legalizacionesP = null;
                        legalizacionesP = [];

                        query = "SELECT l.*, p.Perfil as Nombre,gr.IdGrupo,  gr.NombreGrupo FROM ok1_leg l, ok1_perf p, ok1_grupo_gto gr WHERE l.entryPerfilMovil= p.entryPerfilMovil AND p.IdGrupo = gr.IdGrupo AND lower(Estado) = 'pendiente' ORDER BY EntryLegMovil DESC";

                        db.executeSql(query, [], function (res) {
                            if (res.rows.length > 0) {
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    legalizacionesP.push({sincronizado: res.rows.item(i).Sincronizado,
                                        entryLegMovil: res.rows.item(i).EntryLegMovil,
                                        cargado: res.rows.item(i).Cargado,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        estado: res.rows.item(i).Estado,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDLeg: res.rows.item(i).IDLeg,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        valor: res.rows.item(i).Valor,
                                        entryLegWeb: res.rows.item(i).EntryLegWeb,
                                        nombre: res.rows.item(i).Nombre,
                                        valorAux: '',
                                        idGrupo: res.rows.item(i).IdGrupo,
                                        nombreGrupo: res.rows.item(i).NombreGrupo
                                    });
                                }
                                console.log(legalizacionesP);
                                try {
                                    defered.resolve(legalizacionesP);
                                    console.log('resolvió la promesaP');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesaP');
                                }
                            } else {
                                defered.resolve('no_data');
                                console.log('No existen datos');
                            }
                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });


                    } else if (estleg === 'enviado') {

                        legalizacionesS = null;
                        legalizacionesS = [];
                        query = "SELECT l.*, p.Perfil as Nombre, gr.IdGrupo, gr.NombreGrupo FROM ok1_leg l, ok1_perf p, ok1_grupo_gto gr WHERE l.entryPerfilMovil= p.entryPerfilMovil AND p.IdGrupo = gr.IdGrupo AND lower(Estado) = 'enviado' ORDER BY EntryLegMovil DESC";
                        db.executeSql(query, [], function (res) {
                            if (res.rows.length > 0) {
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    legalizacionesS.push({sincronizado: res.rows.item(i).Sincronizado,
                                        entryLegMovil: res.rows.item(i).EntryLegMovil,
                                        cargado: res.rows.item(i).Cargado,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        estado: res.rows.item(i).Estado,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDLeg: res.rows.item(i).IDLeg,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        valor: res.rows.item(i).Valor,
                                        entryLegWeb: res.rows.item(i).EntryLegWeb,
                                        nombre: res.rows.item(i).Nombre,
                                        valorAux: '',
                                        idGrupo: res.rows.item(i).IdGrupo,
                                        nombreGrupo: res.rows.item(i).NombreGrupo
                                    });
                                }
                                console.log(legalizacionesS);
                                try {
                                    defered.resolve(legalizacionesS);
                                    console.log('resolvió la promesaS');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesaS');
                                }
                            } else {
                                defered.resolve('no_data');
                                console.log('No existen datos');
                            }
                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });


                    } else {

                        legalizacionesA = null;
                        legalizacionesA = [];
                        query = "SELECT l.*, p.Perfil as Nombre, gr.IdGrupo,  gr.NombreGrupo FROM ok1_leg l, ok1_perf p, ok1_grupo_gto gr WHERE l.entryPerfilMovil= p.entryPerfilMovil AND p.IdGrupo = gr.IdGrupo AND lower(Estado) = 'aprobado' ORDER BY EntryLegMovil DESC";

                        db.executeSql(query, [], function (res) {
                            if (res.rows.length > 0) {
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    legalizacionesA.push({sincronizado: res.rows.item(i).Sincronizado,
                                        entryLegMovil: res.rows.item(i).EntryLegMovil,
                                        cargado: res.rows.item(i).Cargado,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        estado: res.rows.item(i).Estado,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDLeg: res.rows.item(i).IDLeg,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        valor: res.rows.item(i).Valor,
                                        entryLegWeb: res.rows.item(i).EntryLegWeb,
                                        nombre: res.rows.item(i).Nombre,
                                        valorAux: '',
                                        idGrupo: res.rows.item(i).IdGrupo,
                                        nombreGrupo: res.rows.item(i).NombreGrupo
                                    });
                                }
                                console.log(legalizacionesA);
                                try {
                                    defered.resolve(legalizacionesA);
                                    console.log('resolvió la promesaA');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesaA');
                                }
                            } else {
                                defered.resolve('no_data');
                                console.log('No existen datos');
                            }
                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });
                    }

                    return promise;
                }, updateLegalizacion: function (descripcion, entryLegMovil) {
                    var resultado = '';
                    var deferedleg = $q.defer();
                    var promise = deferedleg.promise;
                    var query = "UPDATE ok1_leg SET `Descripcion` = '" + descripcion + "' where EntryLegMovil=" + entryLegMovil;
                    console.log('consulta: ' + query);
                    $cordovaSQLite.execute(db, query).then(function (result) {

                        try {
                            var legalizaciones = null;
                            var legalizaciones = [];
                            deferedleg.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            deferedleg.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, putLegalizacionAprobacion: function (legalizacion) {
                    var resultado = '';
                    var deferedleg = $q.defer();
                    var promise = deferedleg.promise;
                    var query = "UPDATE ok1_leg SET `NoAprobacion` = '" + legalizacion.noAprobacion + "', Estado='aprobado' WHERE EntryLegMovil=" + legalizacion.entryLegMovil;
                    console.log('consulta: ' + query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            deferedleg.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            deferedleg.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, deleteLegalizacion: function (legalizacion) {
                    var resultado = '';
                    var deferedleg = $q.defer();
                    var promise = deferedleg.promise;
                    var query = "SELECT EntryGastoMovil FROM ok1_gto WHERE EntryLegMovil = " + legalizacion.entryLegMovil;
                    var cad = '';
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {
                                cad = cad + "DELETE FROM ok1_gto WHERE EntryGastoMovil = " + res.rows.item(i).EntryGastoMovil + "; \n";
                            }
                            $cordovaSQLite.execute(db, cad).then(function (result) {
                            }, function (error) {
                                console.error(error);
                            });
                        }
                    });

                    query = "SELECT EntryFactMovil FROM ok1_fact WHERE EntryLegMovil = " + legalizacion.entryLegMovil;
                    cad = '';
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {
                                cad = cad + "DELETE FROM ok1_fact WHERE EntryFactMovil = " + res.rows.item(i).EntryFactMovil + "; \n";
                            }
                            $cordovaSQLite.execute(db, cad).then(function (result) {

                            }, function (error) {
                                console.error(error);
                            });
                        }
                    }, function (error) {
                        console.error(error);
                    });

                    query = "DELETE FROM ok1_leg WHERE EntryLegMovil = " + legalizacion.entryLegMovil;
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            deferedleg.resolve('1');
                            console.log('resolvió la promesa - delete' + '11');
                        } catch (e) {
                            deferedleg.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, getLegalizacionCabecera: function (entryLegMovil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT l.*, p.Perfil, gr.NombreGrupo FROM ok1_leg l, ok1_perf p, ok1_grupo_gto gr  WHERE p.EntryPerfilMovil = l.EntryPerfilMovil AND p.IdGrupo = gr.IdGrupo AND l.EntryLegMovil =" + entryLegMovil;
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).EntryLegMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).EntryLegMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }

            };
        })

        .factory('Facturas', function ($cordovaSQLite, $q) {
            var facturas = [];
            return {
                getFacturas: function (clave) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT Sincronizado,EntryFactMovil,EntryPerfilMovil,EntryLegMovil,Fecha,IDLeg,Valor,Moneda,Referencia,Documento,TipoDoc,\n\
                                 CASE WHEN Adjunto IS NULL THEN 'Sin Adjunto' ELSE 'Posee Adjunto' END AS Adjunto, LineLegSAP,ComentarioLine,SubTotalSinImpuesto,SubTotalImpuesto,\n\
                                 NombreSN,EntryFactWeb FROM ok1_fact WHERE EntryLegMovil = " + clave;
                    facturas = [];
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                facturas.push({
                                    sincronizado: res.rows.item(i).Sincronizado,
                                    entryFactMovil: res.rows.item(i).EntryFactMovil,
                                    entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                    entryLegMovil: res.rows.item(i).EntryLegMovil,
                                    fecha: res.rows.item(i).Fecha,
                                    iDLeg: res.rows.item(i).IDLeg,
                                    valor: res.rows.item(i).Valor,
                                    moneda: res.rows.item(i).Moneda,
                                    referencia: res.rows.item(i).Referencia,
                                    documento: res.rows.item(i).Documento,
                                    tipoDoc: res.rows.item(i).TipoDoc,
                                    adjunto: res.rows.item(i).Adjunto,
                                    lineLegSAP: res.rows.item(i).LineLegSAP,
                                    comentarioLine: res.rows.item(i).ComentarioLine,
                                    subTotalSinImpuesto: res.rows.item(i).SubTotalSinImpuesto,
                                    subTotalImpuesto: res.rows.item(i).SubTotalImpuesto,
                                    nombreSN: res.rows.item(i).NombreSN,
                                    entryFactWeb: res.rows.item(i).EntryFactWeb
                                });
                            }
                            try {
                                defered.resolve(facturas);
                                console.log('resolvió la promesa');
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa');
                            }
                        } else {
                            defered.resolve('no_data');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, postFactura: function (factura, legalizacion) {
                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;

                    var query = "SELECT EntryLegMovil, EntryLegWeb, EntryPerfilMovil FROM ok1_leg  WHERE EntryLegMovil =" + legalizacion.entryLegMovil;

                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log(res.rows.item(0));

                            var query = "INSERT INTO ok1_fact (`Sincronizado`,`EntryPerfilMovil`,`EntryLegMovil`,`Fecha`,`IDLeg`,`Valor`,`Moneda`,\n\
                                `Referencia`,`Documento`,`TipoDoc`,`Adjunto`,`LineLegSAP`,`ComentarioLine`,`SubTotalSinImpuesto`,`SubTotalImpuesto`,`NombreSN`,\n\
                                 `EntryFactWeb`) VALUES ('0'," + res.rows.item(0).EntryPerfilMovil + "," + factura.entryLegMovil + ",'" + factura.fecha + "','" + factura.iDLeg + "',0,'" + factura.moneda + "','" + factura.referencia + "','" + factura.documento + "','" + factura.tipoDoc + "','" + factura.adjunto + "','" + factura.lineLegSAP + "','" + factura.comentarioLine + "','" + factura.subTotalSinImpuesto + "','" + factura.subTotalImpuesto + "','" + factura.nombreSN + "','" + factura.entryFactWeb + "')";
                            var query = query.replace(/''/gi, null);
                            console.log(query);
                            $cordovaSQLite.execute(db, query).then(function (result) {
                                resultado = result.insertId;
                                try {
                                    defered.resolve(resultado);
                                    console.log('resolvió la promesa - insert' + resultado);
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }

                            }, function (error) {
                                console.error(error);
                            });


                            var valor = Number(legalizacion.valor) + Number(factura.valor);


                            var query = "UPDATE ok1_leg SET Valor =" + valor + " WHERE EntryLegMovil=" + legalizacion.entryLegMovil;
                            $cordovaSQLite.execute(db, query).then(function (result) {
                                try {
                                    defered.resolve('1');
                                    console.log('resolvió la promesa - update resultado 1');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa 0');
                                }

                            }, function (error) {
                                console.error(error);
                            });
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryLegMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });

                    return promise;
                },
                getFactura: function (entryFactMovil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT Sincronizado,EntryFactMovil,EntryPerfilMovil,EntryLegMovil,Fecha,IDLeg,Valor,Moneda,Referencia,Documento,TipoDoc,\n\
                                 CASE WHEN Adjunto IS NULL THEN 'Sin Adjunto' ELSE 'Posee Adjunto' END AS Adjunto, LineLegSAP,ComentarioLine,SubTotalSinImpuesto,SubTotalImpuesto,\n\
                                 NombreSN,EntryFactWeb FROM ok1_fact  WHERE EntryFactMovil =" + entryFactMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryFactMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryFactMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, deleteFactura: function (factura, legalizacion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "DELETE FROM ok1_fact WHERE EntryFactMovil=" + factura.entryFactMovil;

                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - delete resultado 1');
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });

                    var valor = Number(legalizacion.valor) - Number(factura.valor);
                    var query = "UPDATE ok1_leg SET Valor =" + valor + " WHERE EntryLegMovil =" + legalizacion.entryLegMovil;
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - update resultado 1');
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, getFacturaImage: function (entryFactMovil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_fact  WHERE EntryFactMovil =" + entryFactMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryFactMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryFactMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }

            };
        })


        .factory('Gastos', function ($cordovaSQLite, $q) {
            var gastos = [];
            return {
                getGastos: function (clave) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_gto WHERE EntryFactMovil = " + clave;
                    gastos = null;
                    gastos = [];
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                gastos.push({
                                    sincronizado: res.rows.item(i).Sincronizado,
                                    entryGastoMovil: res.rows.item(i).EntryGastoMovil,
                                    entryFactMovil: res.rows.item(i).EntryFactMovil,
                                    entryLegMovil: res.rows.item(i).EntryLegMovil,
                                    entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                    idGasto: res.rows.item(i).IdGasto,
                                    impuesto: res.rows.item(i).Impuesto,
                                    info1: res.rows.item(i).Info1,
                                    info2: res.rows.item(i).Info2,
                                    info3: res.rows.item(i).Info3,
                                    tipoGasto: res.rows.item(i).TipoGasto,
                                    valor: res.rows.item(i).Valor,
                                    entryGastoWeb: res.rows.item(i).EntryGastoWeb,
                                    notas: res.rows.item(i).Notas
                                });
                            }
                            try {
                                defered.resolve(gastos);
                                console.log('resolvió la promesa');
                            } catch (e) {
                                defered.resolve(e);
                                console.log('1');
                            }
                        } else {
                            defered.resolve('2');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, postGasto: function (gasto, factura, legalizacion) {
                    var resultado = '';
                    var valor;
                    var defered = $q.defer();
                    var promise = defered.promise;

                    var query = "SELECT EntryLegMovil, EntryFactMovil, EntryPerfilMovil FROM ok1_fact  WHERE EntryFactMovil =" + factura.entryFactMovil;
                    console.log(query);

                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {

                            var query = "INSERT INTO ok1_gto (`Sincronizado`,`EntryFactMovil`,`EntryLegMovil`,`EntryPerfilMovil`,`Impuesto`,`Info1`,`Info2`,`Info3`,`TipoGasto`,`Valor`,`Notas`) VALUES \n\
                                                      ('0'," + gasto.entryFactMovil + "," + res.rows.item(0).EntryLegMovil + "," + res.rows.item(0).EntryPerfilMovil + "," +
                                    gasto.impuesto + ",'" + gasto.info1 + "','" + gasto.info2 + "','" +
                                    gasto.info3 + "'," + gasto.tipoGasto + "," + gasto.valor + ",'" + gasto.notas + "')";
                            query = query.replace(/''/gi, null);
                            query = query.replace(/'undefined'/gi, null);
                            console.log(query);
                            $cordovaSQLite.execute(db, query).then(function (result) {
                                resultado = result.insertId;
//                                try {
//                                    defered.resolve(resultado);
//                                    console.log('resolvió la promesa - insert' + resultado);
//                                } catch (e) {
//                                    defered.resolve('0');
//                                    console.log(' no es posible resolver la promesa');
//                                }

                            }, function (error) {
                                console.error(error);
                            });

                            valor = Number(factura.valor) + Number(gasto.valor);
                            var query2 = "UPDATE ok1_fact SET Valor =(SELECT (l.valor + " + Number(gasto.valor) + ") as Valor  FROM ok1_fact l, ok1_gto g WHERE g.EntryFactMovil = l.EntryFactMovil AND  l.EntryFactMovil=" + gasto.entryFactMovil + ") WHERE EntryFactMovil=" + gasto.entryFactMovil;

                            $cordovaSQLite.execute(db, query2).then(function (result) {
                                console.log(query2);
                            }, function (error) {
                                console.error(error);
                            });

                            var query3 = "UPDATE ok1_leg  SET  Valor =  (SELECT (l.valor + " + Number(gasto.valor) + ") as Valor  FROM ok1_leg l, ok1_gto g WHERE g.EntryLegMovil = l.EntryLegMovil AND  l.EntryLegMovil=" + gasto.entryLegMovil + ")  WHERE  ok1_leg.EntryLegMovil=" + gasto.entryLegMovil;

                            $cordovaSQLite.execute(db, query3).then(function (result) {
                                console.log(query3);
                                try {
                                    defered.resolve('1');
                                    console.log('resolvió la promesa - update resultado 1');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa 0');
                                }

                            }, function (error) {
                                console.error(error);
                            });
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryGastoMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });


                    return promise;
                },
                getGasto: function (gasto) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT g.*, t.Descripcion FROM ok1_gto g, ok1_tipo_gto t WHERE t.TipoGasto = g.TipoGasto AND g.EntryGastoMovil =" + gasto.entryGastoMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryGastoMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryGastoMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, deleteGasto: function (gasto, factura, legalizacion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "DELETE FROM ok1_gto WHERE EntryGastoMovil =" + gasto.entryGastoMovil;
                    console.log(query);
                    var valor;
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - delete resultado 1');
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });

                    valor = Number(factura.valor) - Number(gasto.valor);
                    query = "UPDATE ok1_fact SET Valor =" + valor + " WHERE EntryFactMovil=" + factura.entryFactMovil;
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - update resultado 1');
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });

                    var query2 = "UPDATE ok1_leg  SET  Valor =  (SELECT (l.valor -" + Number(gasto.valor) + ") as Valor  FROM ok1_leg l, ok1_gto g WHERE g.EntryLegMovil = l.EntryLegMovil AND  l.EntryLegMovil=" + gasto.entryLegMovil + ")  WHERE  ok1_leg.EntryLegMovil=" + gasto.entryLegMovil;
                    console.log(query2);

                    $cordovaSQLite.execute(db, query2).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - update resultado 1');
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });


                    return promise;
                }

            };
        })

        .factory('TiposGasto', function ($cordovaSQLite, $q) {
            var tiposgasto = [];
            return {
                postTipoGasto: function (tipoGasto) {
                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "INSERT INTO ok1_tipo_gto (`Sincronizado`, `TipoGasto`,`Descripcion`) VALUES ('0','" + tipoGasto.tipoGasto + "','" + tipoGasto.descripcion + "')";
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        resultado = result.insertId;
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }
                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                },
                getTipoGasto: function (tipoGasto) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_tipo_gto WHERE TipoGasto =" + tipoGasto.tipoGasto;
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).tipoGasto);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                },
                getTiposGasto: function (entryPerfilMovil) {
                    tiposgasto = [];
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var idGrupo = 0;
                    var query = "";
                    var query1 = "SELECT gr.IdGrupoSAP FROM ok1_perf p, ok1_grupo_gto gr WHERE p.IdGrupo = gr.IdGrupo AND p.EntryPerfilMovil = " + entryPerfilMovil;

                    console.log(query1);

                    db.executeSql(query1, [], function (res) {
                        if (res.rows.length > 0) {
                            idGrupo = res.rows.item(0).IdGrupoSAP;

                            if (Number(idGrupo) === 1) {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo01 = 1";
                                console.log(query);
                                console.log('grupo 01');
                            } else if (Number(idGrupo) === 2) {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo02 = 1";
                                console.log(query);
                                console.log('grupo 02');
                            } else if (Number(idGrupo) === 3) {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo03 = 1";
                                console.log(query);
                                console.log('grupo 03');
                            } else if (Number(idGrupo) === 4) {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo04 = 1";
                                console.log(query);
                                console.log('grupo 04');
                            } else if (Number(idGrupo) === 5) {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo05 = 1";
                                console.log(query);
                                console.log('grupo 05');
                            } else if (Number(idGrupo) === 6) {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo06 = 1";
                                console.log(query);
                                console.log('grupo 06');
                            } else if (Number(idGrupo) === 7) {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo07 = 1";
                                console.log(query);
                                console.log('grupo 07');
                            } else {
                                query = "SELECT * FROM ok1_tipo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + entryPerfilMovil + ") t1 WHERE t.Company = t1.Company AND t.Grupo08 = 1";
                                console.log(query);
                                console.log('grupo 08');
                            }

                            db.executeSql(query, [], function (res) {
                                if (res.rows.length > 0) {
                                    for (var i = 0; i < res.rows.length; i++)
                                    {
                                        tiposgasto.push({
                                            sincronizado: res.rows.item(i).Sincronizado,
                                            tipoGasto: res.rows.item(i).TipoGasto,
                                            descripcion: res.rows.item(i).Descripcion
                                        });
                                    }
                                    try {
                                        defered.resolve(tiposgasto);
                                        console.log('resolvió la promesa' + tiposgasto[0].TipoGasto);
                                    } catch (e) {
                                        defered.resolve('0');
                                        console.log(' no es posible resolver la promesa');
                                    }
                                } else {
                                    defered.resolve('no_data');
                                    console.log('No existen datos');
                                }
                            }, function (error) {
                                console.log('SELECT error: ' + error.message);
                            });
                        } else {
                            console.log("vacio res.rows.item(0)");
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, getTipoGastoGto: function (tipoGasto) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_tipo_gto WHERE TipoGasto =" + tipoGasto;
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).tipoGasto);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }
            };
        })



        .factory('Sincronizar', function ($cordovaSQLite, $q, $resource, $http) {
            var sincronizar = [];
            return {
                getSincronizar: function () {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT p.*, gr.IdGrupoSAP FROM ok1_perf p, ok1_grupo_gto gr WHERE p.Sincronizado = 0 AND p.IdGrupo= gr.IdGrupo AND p.Company <> 1";
                    var json = "{";
                    var i = 0;
                    sincronizar.push(json);
                    db.executeSql(query, [], function (res) {
                        json = json + "\"perfiles\":[";
                        if (res.rows.length > 0) {
                            for (var i = 0; i < (res.rows.length - 1); i++) {
                                json = json + "{";
                                json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                                json = json + "\"entryPerfilWeb\":\"" + res.rows.item(i).EntryPerfilWeb + "\",";
                                json = json + "\"docPerfil\":\"" + res.rows.item(i).DocPerfil + "\",";
                                json = json + "\"perfil\":\"" + res.rows.item(i).Perfil + "\",";
                                json = json + "\"emailPerfil\":\"" + res.rows.item(i).EmailPerfil + "\",";
                                json = json + "\"proyecto\":\"" + res.rows.item(i).Proyecto + "\",";
                                json = json + "\"sn\":\"" + res.rows.item(i).SN + "\",";
                                json = json + "\"company\":\"" + res.rows.item(i).Company + "\",";
                                json = json + "\"aprobador\":\"" + res.rows.item(i).Aprobador + "\",";
                                json = json + "\"dimension1\":\"" + res.rows.item(i).Dimension1 + "\",";
                                json = json + "\"dimension2\":\"" + res.rows.item(i).Dimension2 + "\",";
                                json = json + "\"dimension3\":\"" + res.rows.item(i).Dimension3 + "\",";
                                json = json + "\"dimension4\":\"" + res.rows.item(i).Dimension4 + "\",";
                                json = json + "\"dimension5\":\"" + res.rows.item(i).Dimension5 + "\",";
                                json = json + "\"habilitado\":\"" + res.rows.item(i).Habilitado + "\",";
                                json = json + "\"idGrupo\":\"" + res.rows.item(i).IdGrupoSAP + "\",";
                                json = json + "\"enviaRequisicion\":\"" + res.rows.item(i).EnviaRequisicion + "\",";
                                json = json + "\"aprobadorRequisicion\":\"" + res.rows.item(i).AprobadorRequisicion + "\",";
                                json = json + "\"dimensionSap\":\"" + res.rows.item(i).DimensionSap + "\",";
                                json = json + "\"almacenSap\":\"" + res.rows.item(i).AlmacenSap + "\",";
                                json = json + "\"proyectoSap\":\"" + res.rows.item(i).ProyectoSap + "\",";
                                json = json + "\"entryPerfilWebAprobador\":\"" + res.rows.item(i).EntryPerfilWebAprobador + "\",";
                                json = json + "\"entryPerfilMovilAprobador\":\"" + res.rows.item(i).EntryPerfilMovilAprobador + "\"";
                                json = json + "},";
                            }
                            json = json + "{";
                            json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                            json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                            json = json + "\"entryPerfilWeb\":\"" + res.rows.item(i).EntryPerfilWeb + "\",";
                            json = json + "\"docPerfil\":\"" + res.rows.item(i).DocPerfil + "\",";
                            json = json + "\"perfil\":\"" + res.rows.item(i).Perfil + "\",";
                            json = json + "\"emailPerfil\":\"" + res.rows.item(i).EmailPerfil + "\",";
                            json = json + "\"proyecto\":\"" + res.rows.item(i).Proyecto + "\",";
                            json = json + "\"sn\":\"" + res.rows.item(i).SN + "\",";
                            json = json + "\"company\":\"" + res.rows.item(i).Company + "\",";
                            json = json + "\"aprobador\":\"" + res.rows.item(i).Aprobador + "\",";
                            json = json + "\"dimension1\":\"" + res.rows.item(i).Dimension1 + "\",";
                            json = json + "\"dimension2\":\"" + res.rows.item(i).Dimension2 + "\",";
                            json = json + "\"dimension3\":\"" + res.rows.item(i).Dimension3 + "\",";
                            json = json + "\"dimension4\":\"" + res.rows.item(i).Dimension4 + "\",";
                            json = json + "\"dimension5\":\"" + res.rows.item(i).Dimension5 + "\",";
                            json = json + "\"habilitado\":\"" + res.rows.item(i).Habilitado + "\",";
                            json = json + "\"idGrupo\":\"" + res.rows.item(i).IdGrupoSAP + "\",";
                            json = json + "\"enviaRequisicion\":\"" + res.rows.item(i).EnviaRequisicion + "\",";
                            json = json + "\"aprobadorRequisicion\":\"" + res.rows.item(i).AprobadorRequisicion + "\",";
                            json = json + "\"dimensionSap\":\"" + res.rows.item(i).DimensionSap + "\",";
                            json = json + "\"almacenSap\":\"" + res.rows.item(i).AlmacenSap + "\",";
                            json = json + "\"proyectoSap\":\"" + res.rows.item(i).ProyectoSap + "\",";
                            json = json + "\"entryPerfilWebAprobador\":\"" + res.rows.item(i).EntryPerfilWebAprobador + "\",";
                            json = json + "\"entryPerfilMovilAprobador\":\"" + res.rows.item(i).EntryPerfilMovilAprobador + "\"";
                            json = json + "}";
                        } else {
                            console.log('No existen datos');
                        }
                        json = json + "]";
                        var i = 0;
                        var query4 = "SELECT * FROM ok1_comp";
                        db.executeSql(query4, [], function (res) {
                            if (res.rows.length > 0) {
                                json = json + ",\"company\":[";
                                for (var i = 0; i < (res.rows.length - 1); i++) {
                                    console.log(res.rows.item(i));
                                    json = json + "{";
                                    json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                    json = json + "\"company\":\"" + res.rows.item(i).Company + "\",";
                                    json = json + "\"codigoVerificacion\":\"" + res.rows.item(i).CodigoVerificacion + "\",";
                                    json = json + "\"nombre\":\"" + res.rows.item(i).Nombre + "\",";
                                    json = json + "\"usuario\":\"" + res.rows.item(i).Usuario + "\",";
                                    json = json + "\"nit\":\"" + res.rows.item(i).Nit + "\"";
                                    json = json + "},";
                                }
                                console.log(res.rows.item(i));
                                json = json + "{";
                                json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                json = json + "\"company\":\"" + res.rows.item(i).Company + "\",";
                                json = json + "\"codigoVerificacion\":\"" + res.rows.item(i).CodigoVerificacion + "\",";
                                json = json + "\"nombre\":\"" + res.rows.item(i).Nombre + "\",";
                                json = json + "\"usuario\":\"" + res.rows.item(i).Usuario + "\",";
                                json = json + "\"nit\":\"" + res.rows.item(i).Nit + "\"";
                                json = json + "}";
                                json = json + "]";
                            }

                            var i = 0;
                            var query2 = "SELECT * FROM ok1_tipo_gto";

                            db.executeSql(query2, [], function (res) {

                                if (res.rows.length > 0) {

                                    json = json + ",\"tipos_gto\":[";
                                    for (var i = 0; i < (res.rows.length - 1); i++) {
                                        console.log(res.rows.item(i));
                                        json = json + "{";
                                        json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                        json = json + "\"tipoGasto\":\"" + res.rows.item(i).TipoGasto + "\",";
                                        json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                        json = json + "\"cuenta\":\"" + res.rows.item(i).Cuenta + "\",";
                                        json = json + "\"company\":\"" + res.rows.item(i).Company + "\",";
                                        json = json + "\"exigeCampo1\":\"" + res.rows.item(i).ExigeCampo1 + "\",";
                                        json = json + "\"exigeCampo2\":\"" + res.rows.item(i).ExigeCampo2 + "\",";
                                        json = json + "\"exigeCampo3\":\"" + res.rows.item(i).ExigeCampo3 + "\",";
                                        json = json + "\"nombreCampo1\":\"" + res.rows.item(i).NombreCampo1 + "\",";
                                        json = json + "\"nombreCampo2\":\"" + res.rows.item(i).NombreCampo2 + "\",";
                                        json = json + "\"nombreCampo3\":\"" + res.rows.item(i).NombreCampo3 + "\",";
                                        json = json + "\"tipoCampo1\":\"" + res.rows.item(i).TipoCampo1 + "\",";
                                        json = json + "\"tipoCampo2\":\"" + res.rows.item(i).TipoCampo2 + "\",";
                                        json = json + "\"tipoCampo3\":\"" + res.rows.item(i).TipoCampo3 + "\",";
                                        json = json + "\"grupo01\":\"" + res.rows.item(i).Grupo01 + "\",";
                                        json = json + "\"grupo02\":\"" + res.rows.item(i).Grupo02 + "\",";
                                        json = json + "\"grupo03\":\"" + res.rows.item(i).Grupo03 + "\",";
                                        json = json + "\"grupo04\":\"" + res.rows.item(i).Grupo04 + "\",";
                                        json = json + "\"grupo05\":\"" + res.rows.item(i).Grupo05 + "\",";
                                        json = json + "\"grupo06\":\"" + res.rows.item(i).Grupo06 + "\",";
                                        json = json + "\"grupo07\":\"" + res.rows.item(i).Grupo07 + "\",";
                                        json = json + "\"grupo08\":\"" + res.rows.item(i).Grupo08 + "\"";
                                        json = json + "},";
                                    }
                                    console.log(res.rows.item(i));
                                    json = json + "{";
                                    json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                    json = json + "\"tipoGasto\":\"" + res.rows.item(i).TipoGasto + "\",";
                                    json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                    json = json + "\"cuenta\":\"" + res.rows.item(i).Cuenta + "\",";
                                    json = json + "\"company\":\"" + res.rows.item(i).Company + "\",";
                                    json = json + "\"exigeCampo1\":\"" + res.rows.item(i).ExigeCampo1 + "\",";
                                    json = json + "\"exigeCampo2\":\"" + res.rows.item(i).ExigeCampo2 + "\",";
                                    json = json + "\"exigeCampo3\":\"" + res.rows.item(i).ExigeCampo3 + "\",";
                                    json = json + "\"nombreCampo1\":\"" + res.rows.item(i).NombreCampo1 + "\",";
                                    json = json + "\"nombreCampo2\":\"" + res.rows.item(i).NombreCampo2 + "\",";
                                    json = json + "\"nombreCampo3\":\"" + res.rows.item(i).NombreCampo3 + "\",";
                                    json = json + "\"tipoCampo1\":\"" + res.rows.item(i).TipoCampo1 + "\",";
                                    json = json + "\"tipoCampo2\":\"" + res.rows.item(i).TipoCampo2 + "\",";
                                    json = json + "\"tipoCampo3\":\"" + res.rows.item(i).TipoCampo3 + "\",";
                                    json = json + "\"grupo01\":\"" + res.rows.item(i).Grupo01 + "\",";
                                    json = json + "\"grupo02\":\"" + res.rows.item(i).Grupo02 + "\",";
                                    json = json + "\"grupo03\":\"" + res.rows.item(i).Grupo03 + "\",";
                                    json = json + "\"grupo04\":\"" + res.rows.item(i).Grupo04 + "\",";
                                    json = json + "\"grupo05\":\"" + res.rows.item(i).Grupo05 + "\",";
                                    json = json + "\"grupo06\":\"" + res.rows.item(i).Grupo06 + "\",";
                                    json = json + "\"grupo07\":\"" + res.rows.item(i).Grupo07 + "\",";
                                    json = json + "\"grupo08\":\"" + res.rows.item(i).Grupo08 + "\"";
                                    json = json + "}";
                                    json = json + "]";
                                }
                                var i = 0;
                                var query3 = "SELECT * FROM ok1_leg WHERE Estado = 'aprobado'";
                                db.executeSql(query3, [], function (res) {
                                    if (res.rows.length > 0) {
                                        json = json + ",\"legalizaciones\":[";
                                        for (var i = 0; i < (res.rows.length - 1); i++) {
                                            json = json + "{";
                                            json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                            json = json + "\"entryLegMovil\":\"" + res.rows.item(i).EntryLegMovil + "\",";
                                            json = json + "\"cargado\":\"" + res.rows.item(i).Cargado + "\",";
                                            json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                            json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                                            json = json + "\"estado\":\"" + res.rows.item(i).Estado + "\",";
                                            json = json + "\"fechaAutorizacion\":\"" + res.rows.item(i).FechaAutorizacion + "\",";
                                            json = json + "\"fechaSincronizacion\":\"" + res.rows.item(i).FechaSincronizacion + "\",";
                                            json = json + "\"iDLeg\":\"" + res.rows.item(i).IDLeg + "\",";
                                            json = json + "\"noAprobacion\":\"" + res.rows.item(i).NoAprobacion + "\",";
                                            json = json + "\"valor\":\"" + res.rows.item(i).Valor + "\",";
                                            json = json + "\"entryLegWeb\":\"" + res.rows.item(i).EntryLegWeb + "\"";
                                            json = json + "},";
                                        }
                                        json = json + "{";
                                        json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                        json = json + "\"entryLegMovil\":\"" + res.rows.item(i).EntryLegMovil + "\",";
                                        json = json + "\"cargado\":\"" + res.rows.item(i).Cargado + "\",";
                                        json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                        json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                                        json = json + "\"estado\":\"" + res.rows.item(i).Estado + "\",";
                                        json = json + "\"fechaAutorizacion\":\"" + res.rows.item(i).FechaAutorizacion + "\",";
                                        json = json + "\"fechaSincronizacion\":\"" + res.rows.item(i).FechaSincronizacion + "\",";
                                        json = json + "\"iDLeg\":\"" + res.rows.item(i).IDLeg + "\",";
                                        json = json + "\"noAprobacion\":\"" + res.rows.item(i).NoAprobacion + "\",";
                                        json = json + "\"valor\":\"" + res.rows.item(i).Valor + "\",";
                                        json = json + "\"entryLegWeb\":\"" + res.rows.item(i).EntryLegWeb + "\"";
                                        json = json + "}";
                                        json = json + "]";
                                    }
                                    var i = 0;
                                    var query4 = "SELECT EntryReqWeb,Estado FROM ok1_req WHERE EntryReqWeb <> 0 AND (LOWER(Estado) <> 'abierta' AND LOWER(Estado) <> 'aprobacion')";
                                    //   var query4 = "SELECT EntryReqWeb,Estado FROM ok1_req WHERE EntryReqWeb <> 0 AND (LOWER(Estado) <> 'abierta' AND LOWER(Estado) <> 'aprobacion')";
                                    db.executeSql(query4, [], function (res4) {
                                        json = json + ",\"requisiciones\":[";
                                        if (res4.rows.length > 0) {
                                            for (var i = 0; i < (res4.rows.length); i++) {
                                                json = json + "{";
                                                json = json + "\"entryReqWeb\":\"" + res4.rows.item(i).EntryReqWeb + "\",";
                                                json = json + "\"estado\":\"" + res4.rows.item(i).Estado + "\"";
                                                json = json + "},";
                                            }
                                            json = json.substring(0, json.length - 1);
                                        }
                                        json = json + "]";
                                        json = json + "}";
                                        console.log(json);
                                        $http({
                                            method: 'POST',
                                            url: 'http://cn-okone.com/legalisappServidor/public/api.php',
                                            data: json,
                                            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Control': '*'}
                                        })
                                                .success(function (response) {
                                                    // handle success things
                                                    try {
                                                        console.log(response);
                                                        defered.resolve(response['message']);
                                                        console.log('resolvió la promesa de sincronizar success');
                                                    } catch (e) {
                                                        defered.resolve('0');
                                                        console.log(' no es posible resolver la promesa de sincronizar success');
                                                    }
                                                })
                                                .error(function (data, status, headers, config) {
                                                    // handle error things
                                                    try {
                                                        defered.resolve('0');
                                                        console.log('resolvió la promesa de sincronizar error');
                                                    } catch (e) {
                                                        defered.resolve('0');
                                                        console.log(' no es posible resolver la promesa de sincronizar error');
                                                    }
                                                });
                                    });
                                });
                            });


                        });
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                },
                getEnviarLegalizacion: function (legalizacion, idTransaccion) {

                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT l.Sincronizado, l.EntryLegMovil, l.Cargado, l.Descripcion, p.EntryPerfilWeb, l.Estado, l.FechaAutorizacion,\n\
                                        l.FechaSincronizacion, l.IDLeg, l.NoAprobacion, l.Valor, l.EntryLegWeb FROM ok1_leg l, ok1_perf p \n\
                                        WHERE l.EntryPerfilMovil=p.EntryPerfilMovil AND p.Company <> 1 AND l.EntryLegMovil =" + legalizacion.EntryLegMovil;
                    console.log(query);
                    var json = "{";
                    sincronizar.push(json);
                    db.executeSql(query, [], function (res) {
                        json = json + "\"legalizaciones\":[";
                        json = json + "{";
                        json = json + "\"sincronizado\":\"" + res.rows.item(0).Sincronizado + "\",";
                        json = json + "\"entryLegMovil\":\"" + res.rows.item(0).EntryLegMovil + "\",";
                        json = json + "\"cargado\":\"1\",";
                        json = json + "\"descripcion\":\"" + res.rows.item(0).Descripcion + "\",";
                        json = json + "\"entryPerfilMovil\":\"" + res.rows.item(0).EntryPerfilWeb + "\",";
                        json = json + "\"estado\":\"" + res.rows.item(0).Estado + "\",";
                        json = json + "\"fechaAutorizacion\":\"" + res.rows.item(0).FechaAutorizacion + "\",";
                        json = json + "\"fechaSincronizacion\":\"" + res.rows.item(0).FechaSincronizacion + "\",";
                        json = json + "\"iDLeg\":\"" + res.rows.item(0).IDLeg + "\",";
                        json = json + "\"noAprobacion\":\"" + res.rows.item(0).NoAprobacion + "\",";
                        json = json + "\"valor\":\"" + res.rows.item(0).Valor + "\",";
                        json = json + "\"entryLegWeb\":\"" + res.rows.item(0).EntryLegWeb + "\",";
                        json = json + "\"idTransaccion\":\"" + idTransaccion + "\"";
                        json = json + "}";
                        json = json + "],";

                        var query = "SELECT * FROM ok1_fact WHERE EntryLegMovil =" + legalizacion.EntryLegMovil;
                        console.log(query);
                        db.executeSql(query, [], function (res) {
                            json = json + "\"facturas\":[";
                            if (res.rows.length > 0) {
                                for (var i = 0; i < (res.rows.length - 1); i++)
                                {
                                    json = json + "{";
                                    json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                    json = json + "\"entryFactMovil\":\"" + res.rows.item(i).EntryFactMovil + "\",";
                                    json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                                    json = json + "\"entryLegMovil\":\"" + res.rows.item(i).EntryLegMovil + "\",";
                                    json = json + "\"fecha\":\"" + res.rows.item(i).Fecha + "\",";
                                    json = json + "\"iDLeg\":\"" + res.rows.item(i).IDLeg + "\",";
                                    json = json + "\"valor\":\"" + res.rows.item(i).Valor + "\",";
                                    json = json + "\"moneda\":\"" + res.rows.item(i).Moneda + "\",";
                                    json = json + "\"referencia\":\"" + res.rows.item(i).Referencia + "\",";
                                    json = json + "\"documento\":\"" + res.rows.item(i).Documento + "\",";
                                    json = json + "\"tipoDoc\":\"" + res.rows.item(i).TipoDoc + "\",";
                                    json = json + "\"adjunto\":\"" + res.rows.item(i).Adjunto + "\",";
                                    json = json + "\"lineLegSAP\":\"" + res.rows.item(i).LineLegSAP + "\",";
                                    json = json + "\"comentarioLine\":\"" + res.rows.item(i).ComentarioLine + "\",";
                                    json = json + "\"subTotalSinImpuesto\":\"" + res.rows.item(i).SubTotalSinImpuesto + "\",";
                                    json = json + "\"subTotalImpuesto\":\"" + res.rows.item(i).SubTotalImpuesto + "\",";
                                    json = json + "\"nombreSN\":\"" + res.rows.item(i).NombreSN + "\",";
                                    json = json + "\"entryFactWeb\":\"" + res.rows.item(i).EntryFactWeb + "\",";
                                    json = json + "\"idTransaccion\":\"" + idTransaccion + "\"";
                                    json = json + "},";
                                }
                                json = json + "{";
                                json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                json = json + "\"entryFactMovil\":\"" + res.rows.item(i).EntryFactMovil + "\",";
                                json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                                json = json + "\"entryLegMovil\":\"" + res.rows.item(i).EntryLegMovil + "\",";
                                json = json + "\"fecha\":\"" + res.rows.item(i).Fecha + "\",";
                                json = json + "\"iDLeg\":\"" + res.rows.item(i).IDLeg + "\",";
                                json = json + "\"valor\":\"" + res.rows.item(i).Valor + "\",";
                                json = json + "\"moneda\":\"" + res.rows.item(i).Moneda + "\",";
                                json = json + "\"referencia\":\"" + res.rows.item(i).Referencia + "\",";
                                json = json + "\"documento\":\"" + res.rows.item(i).Documento + "\",";
                                json = json + "\"tipoDoc\":\"" + res.rows.item(i).TipoDoc + "\",";
                                json = json + "\"adjunto\":\"" + res.rows.item(i).Adjunto + "\",";
                                json = json + "\"lineLegSAP\":\"" + res.rows.item(i).LineLegSAP + "\",";
                                json = json + "\"comentarioLine\":\"" + res.rows.item(i).ComentarioLine + "\",";
                                json = json + "\"subTotalSinImpuesto\":\"" + res.rows.item(i).SubTotalSinImpuesto + "\",";
                                json = json + "\"subTotalImpuesto\":\"" + res.rows.item(i).SubTotalImpuesto + "\",";
                                json = json + "\"nombreSN\":\"" + res.rows.item(i).NombreSN + "\",";
                                json = json + "\"entryFactWeb\":\"" + res.rows.item(i).EntryFactWeb + "\",";
                                json = json + "\"idTransaccion\":\"" + idTransaccion + "\"";
                                json = json + "}";
                            } else {
                                console.log('No existen datos');
                            }
                            json = json + "],";
                            var query = "SELECT * FROM ok1_gto WHERE EntryLegMovil =" + legalizacion.EntryLegMovil;
                            console.log(query);
                            db.executeSql(query, [], function (res) {
                                json = json + "\"gastos\":[";
                                if (res.rows.length > 0) {
                                    for (var i = 0; i < (res.rows.length - 1); i++)
                                    {
                                        json = json + "{";
                                        json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                        json = json + "\"entryGastoMovil\":\"" + res.rows.item(i).EntryGastoMovil + "\",";
                                        json = json + "\"entryFactMovil\":\"" + res.rows.item(i).EntryFactMovil + "\",";
                                        json = json + "\"entryLegMovil\":\"" + res.rows.item(i).EntryLegMovil + "\",";
                                        json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                                        json = json + "\"idGasto\":\"" + res.rows.item(i).IdGasto + "\",";
                                        json = json + "\"impuesto\":\"" + res.rows.item(i).Impuesto + "\",";
                                        json = json + "\"info1\":\"" + res.rows.item(i).Info1 + "\",";
                                        json = json + "\"info2\":\"" + res.rows.item(i).Info2 + "\",";
                                        json = json + "\"info3\":\"" + res.rows.item(i).Info3 + "\",";
                                        json = json + "\"tipoGasto\":\"" + res.rows.item(i).TipoGasto + "\",";
                                        json = json + "\"valor\":\"" + res.rows.item(i).Valor + "\",";
                                        json = json + "\"entryGastoWeb\":\"" + res.rows.item(i).EntryGastoWeb + "\",";
                                        json = json + "\"notas\":\"" + res.rows.item(i).Notas + "\",";
                                        json = json + "\"idTransaccion\":\"" + idTransaccion + "\"";
                                        json = json + "},";
                                    }
                                    json = json + "{";
                                    json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                    json = json + "\"entryGastoMovil\":\"" + res.rows.item(i).EntryGastoMovil + "\",";
                                    json = json + "\"entryFactMovil\":\"" + res.rows.item(i).EntryFactMovil + "\",";
                                    json = json + "\"entryLegMovil\":\"" + res.rows.item(i).EntryLegMovil + "\",";
                                    json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilMovil + "\",";
                                    json = json + "\"idGasto\":\"" + res.rows.item(i).IdGasto + "\",";
                                    json = json + "\"impuesto\":\"" + res.rows.item(i).Impuesto + "\",";
                                    json = json + "\"info1\":\"" + res.rows.item(i).Info1 + "\",";
                                    json = json + "\"info2\":\"" + res.rows.item(i).Info2 + "\",";
                                    json = json + "\"info3\":\"" + res.rows.item(i).Info3 + "\",";
                                    json = json + "\"tipoGasto\":\"" + res.rows.item(i).TipoGasto + "\",";
                                    json = json + "\"valor\":\"" + res.rows.item(i).Valor + "\",";
                                    json = json + "\"entryGastoWeb\":\"" + res.rows.item(i).EntryGastoWeb + "\",";
                                    json = json + "\"notas\":\"" + res.rows.item(i).Notas + "\",";
                                    json = json + "\"idTransaccion\":\"" + idTransaccion + "\"";
                                    json = json + "}";
                                } else {
                                    console.log('No existen datos');
                                }
                                json = json + "]";
                                json = json + "}";
                                console.log(json);
                                $http({
                                    method: 'POST',
                                    url: 'http://cn-okone.com/legalisappServidor/public/apiLegalizacion.php',
                                    data: json,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Control': '*'}
                                })
                                        .success(function (response) {
                                            console.log(response);
                                            // handle success things
                                            try {
                                                defered.resolve(response['message']);
                                                console.log('resolvió la promesa de enviar legalizacion success');
                                            } catch (e) {
                                                defered.resolve('0');
                                                console.log(' no es posible resolver la promesa de sincronizar success');
                                            }
                                        })
                                        .error(function (data, status, headers, config) {
                                            // handle error things
                                            try {
                                                defered.resolve(data);
                                                console.log('resolvió la promesa de enviar legalizacion error');
                                                console.log(data);
                                            } catch (e) {
                                                defered.resolve('0');
                                                console.log(' no es posible resolver la promesa de sincronizar error');
                                            }
                                        });
                            }, function (error) {
                                console.log('SELECT error: ' + error.message);
                            });
                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                },
                getTransaccion: function () {
                    var deferred = $q.defer();
                    $http.get('http://cn-okone.com/legalisappServidor/public/transaccion/').success(function (data) {
                        resultado = data['result'];
                        console.log(data['result']);
                        deferred.resolve(data['result']);
                    })
                            .error(function (msg, code) {
                                console.log(msg);
                                console.log(code);
                                deferred.resolve(msg);
                            });
                    return deferred.promise;
                }, putSincronizar: function (sincronizar) {
                    console.log(sincronizar);
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var sincronizarPerfil = "";
                    var sincronizarTipoGto = "";
                    var sincronizarLegalizacion = "";
                    var sincronizarGrupoGto = "";
                    var sincronizarRequisicionAprobacion = "";
                    var sincronizarRequisicion = "";
                    var resultadoAux = "";
                    sincronizar = JSON.parse(sincronizar);
                    sincronizarPerfil = sincronizar['perfiles'];
                    sincronizarTipoGto = sincronizar['tipos_gto'];
                    sincronizarLegalizacion = sincronizar['legalizaciones'];
                    var sincronizarLegalizacionWeb = sincronizar['legalizacionesWeb'];
                    sincronizarGrupoGto = sincronizar['grupos_gto'];
                    sincronizarRequisicionAprobacion = sincronizar['requisicionesAprobacion'];
                    sincronizarRequisicion = sincronizar['requisiciones'];
                    var sincronizarFactura = sincronizar['facturas'];
                    var sincronizarGasto = sincronizar['gastos'];


                    console.log(sincronizarGrupoGto);
                    var query = '';
                    var query2 = '';
                    var query3 = '';
                    var query4 = '';
                    var query5 = '';
                    var query6 = '';
                    var query7 = '';
                    var query8 = '';
                    var query9 = '';

                    var queryA = '';
                    var queryB = '';
                    var queryC = '';

                    var f = new Date();
                    var fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();

                    angular.forEach(sincronizarPerfil, function (clave) {
                        query7 = "SELECT IdGrupo FROM ok1_grupo_gto WHERE IdGrupoWeb='" + clave.idGrupo + "'";
                        console.log(query7);
                        db.executeSql(query7, [], function (res) {
                            if (res.rows.item(0).IdGrupo !== null && res.rows.item(0).IdGrupo !== '') {
                                clave.idGrupo = res.rows.item(0).IdGrupo;
                                if (clave.enviaRequisicion !== null && clave.enviaRequisicion !== '') {
                                    if (clave.enviaRequisicion === 'Y') {
                                        clave.enviaRequisicion = '1';
                                    } else {
                                        clave.enviaRequisicion = '0';
                                    }
                                }
                                query = "UPDATE ok1_perf SET EntryPerfilWeb =" + clave.entryPerfilWeb + ", Aprobador = '" + clave.aprobador +
                                        "', Dimension2 = '" + clave.dimension2 + "', IdGrupo= '" + clave.idGrupo +
                                        "', AlmacenSap= '" + clave.almacenSap + "', EnviaRequisicion= '" + clave.enviaRequisicion +
                                        "', AprobadorRequisicion= '" + clave.aprobadorRequisicion + "', EntryPerfilWebAprobador= '" + clave.entryPerfilWebAprobador +
                                        "', EntryPerfilMovilAprobador= '" + clave.entryPerfilMovilAprobador + "', DimensionSap= '" + clave.dimensionSap +
                                        "', ProyectoSap= '" + clave.proyectoSap + "' WHERE EntryPerfilMovil=" + clave.entryPerfilMovil;

                                console.log(query);
                            } else {
                                query = "UPDATE ok1_perf SET EntryPerfilWeb =" + clave.entryPerfilWeb + ", Aprobador = '" + clave.aprobador +
                                        "', Dimension2 = '" + clave.dimension2 + "', AlmacenSap= '" + clave.almacenSap + "', EnviaRequisicion= '" + clave.enviaRequisicion +
                                        "', AprobadorRequisicion= '" + clave.aprobadorRequisicion + "', EntryPerfilWebAprobador= '" + clave.entryPerfilWebAprobador +
                                        "', EntryPerfilMovilAprobador= '" + clave.entryPerfilMovilAprobador + "', DimensionSap= '" + clave.dimensionSap +
                                        "', ProyectoSap= '" + clave.proyectoSap + "' WHERE EntryPerfilMovil=" + clave.entryPerfilMovil;
                                console.log(query);
                            }
                            try {
                                $cordovaSQLite.execute(db, query).then(function (result) {
                                }, function (error) {
                                    console.error(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        });
                    });
                    angular.forEach(sincronizarTipoGto, function (resultadoAux) {
                        console.log(resultadoAux);
                        query2 = "INSERT INTO ok1_tipo_gto (`Sincronizado`,`TipoGasto`,`Descripcion`,`Company`,`ExigeCampo1`,`ExigeCampo2`,\n\
                                                            `ExigeCampo3`,`NombreCampo1`,`NombreCampo2`, `NombreCampo3`,`TipoCampo1`,`TipoCampo2`,\n\
                                                            `TipoCampo3`,`Grupo01`,`Grupo02`,`Grupo03`,`Grupo04`,`Grupo05`,`Grupo06`,`Grupo07`, `Grupo08`, `ImpuestoSugerido`) \n\
                                VALUES ('1','" + resultadoAux.tipoGasto + "','" + resultadoAux.descripcion + "','" +
                                resultadoAux.company + "','" + resultadoAux.exigeCampo1 + "','" + resultadoAux.exigeCampo2 + "','" +
                                resultadoAux.exigeCampo3 + "','" + resultadoAux.nombreCampo1 + "','" + resultadoAux.nombreCampo2 + "','" +
                                resultadoAux.nombreCampo3 + "','" + resultadoAux.tipoCampo1 + "','" + resultadoAux.tipoCampo2 + "','" + resultadoAux.tipoCampo3 + "','" +
                                resultadoAux.grupo01 + "','" + resultadoAux.grupo02 + "','" + resultadoAux.grupo03 + "','" +
                                resultadoAux.grupo04 + "','" + resultadoAux.grupo05 + "','" + resultadoAux.grupo06 + "','" +
                                resultadoAux.grupo07 + "','" + resultadoAux.grupo08 + "','" + resultadoAux.impuestoSugerido + "')";

                        query2 = query2.replace("''", "null");
                        console.log(query2);
                        try {
                            $cordovaSQLite.execute(db, query2).then(function (result) {
                                console.log(result);
                            }, function (error) {
                                console.error(error);
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    });

                    angular.forEach(sincronizarLegalizacion, function (clave) {
                        query3 = "UPDATE ok1_leg SET Estado ='enviado' WHERE EntryLegMovil=" + clave.entryLegMovil;
                        try {
                            $cordovaSQLite.execute(db, query3).then(function (result) {
                            }, function (error) {
                                console.error(error);
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    });
                    console.log(query3);


                    angular.forEach(sincronizarLegalizacionWeb, function (clave) {
                        queryA = "INSERT INTO ok1_leg (`Sincronizado`, `Cargado`,`Descripcion`,`EntryPerfilMovil`\n\
                            ,`Estado`,`FechaAutorizacion`,`FechaSincronizacion`,`IDLeg`,`NoAprobacion`,`Valor`,`EntryLegWeb`) \n\
                            VALUES ('0'," + clave.cargado + ",'" + clave.descripcion + "'," + clave.entryPerfilMovil
                                + ",'" + clave.estado + "','" + clave.fechaAutorizacion + "','" + clave.fechaSincronizacion
                                + "','" + clave.iDLeg + "','" + clave.noAprobacion + "'," + clave.valor + ","
                                + clave.entryLegWeb + ")";
                        try {
                            $cordovaSQLite.execute(db, queryA).then(function (result) {
                                try {
                                    var urlRes = 'http://cn-okone.com/legalisappServidor/public/resSincroLegas/' + clave.entryLegWeb + '/2';
                                    $http.get(urlRes).success(function (dataRes) {
                                        console.log(dataRes['result']);

                                    }).error(function (msg, code) {
                                        console.log(msg);
                                    });

                                } catch (e2) {
                                    console.log(e2);
                                }
                                console.log(result);


                            }, function (error) {
                                try {
                                    var urlRes = 'http://cn-okone.com/legalisappServidor/public/resSincroLegas/' + clave.entryLegWeb + '/1';
                                    $http.get(urlRes).success(function (dataRes) {
                                        console.log(dataRes['result']);

                                    }).error(function (msg, code) {
                                        console.log(msg);
                                    });
                                } catch (e1) {
                                    console.log(e1);
                                }
                                console.error(error);
                            });
                        } catch (er) {
                            console.log(er);
                        }
                    });
                    console.log(queryA);

                    angular.forEach(sincronizarFactura, function (clave) {
                        var queryD = '';
                        // var entryLegMovil = '';
                        queryD = "Select EntryLegMovil,EntryPerfilMovil from ok1_leg WHERE EntryLegWeb = '" + clave.entryLegMovil + "' ";
                        try {
                            $cordovaSQLite.execute(db, queryD).then(function (result) {
                                console.log(result);
                                queryB = "INSERT INTO ok1_fact (`Sincronizado`,`EntryPerfilMovil`,`EntryLegMovil`,`Fecha`,`IDLeg`,`Valor`,`Moneda`,\n\
                                `Referencia`,`Documento`,`TipoDoc`,`LineLegSAP`,`ComentarioLine`,`SubTotalSinImpuesto`,`SubTotalImpuesto`,`NombreSN`,\n\
                                 `EntryFactWeb`) VALUES ('0','" + result.rows.item(0).EntryPerfilMovil + "','" + result.rows.item(0).EntryLegMovil + "','" + clave.fecha + "','" + clave.iDLeg + "','" + clave.valor
                                        + "','" + clave.moneda + "','" + clave.referencia + "','" + clave.documento + "','" + clave.tipoDoc
                                        + "','" + clave.lineLegSAP + "','" + clave.comentarioLine + "','" + clave.subTotalSinImpuesto
                                        + "','" + clave.subTotalImpuesto + "','" + clave.nombreSN + "','" + clave.entryFactWeb + "')";

                                queryB = queryB.replace(/''/gi, null);
                                try {
                                    $cordovaSQLite.execute(db, queryB).then(function (result) {
                                        console.log("facturaWEB:" + result.insertId);
                                        console.log(queryB);



                                    }, function (errora) {
                                        console.error(errora);
                                    });
                                } catch (e) {
                                    console.log(e);
                                }
                            }, function (errora) {
                                console.error(errora);
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    });
                    console.log(queryB);


                    angular.forEach(sincronizarGrupoGto, function (clave) {
                        query6 = "SELECT 1 as valor FROM ok1_grupo_gto WHERE IdGrupoWeb='" + clave.idGrupoWeb + "'";
                        console.log(query6);
                        db.executeSql(query6, [], function (res) {
                            if (res.rows.item(0).valor !== 1) {
                                query5 = "INSERT INTO ok1_grupo_gto (Sincronizado, NombreGrupo, Company, IdGrupoWeb, IdGrupoSAP) \n\
                                          VALUES('1', '" + clave.nombreGrupo + "','" + clave.company + "','" + clave.idGrupoWeb + "','" +
                                        clave.idGrupoSAP + "')";
                            } else {
                                query5 = "UPDATE ok1_grupo_gto SET NombreGrupo ='" + clave.nombreGrupo + "' WHERE IdGrupoWeb='" + clave.idGrupoWeb + "'";

                            }
                            console.log('putLega');
                            console.log(query6);
                            console.log(query5);

                            try {
                                $cordovaSQLite.execute(db, query5).then(function (result) {
                                }, function (error) {
                                    console.error(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        });
                        console.log(query5);

                    }, function (err) {
                        console.error(err);
                    });

//                    $cordovaSQLite.execute(db, query3).then(function (result) {


                    angular.forEach(sincronizarRequisicion, function (clave) {
                        var query9 = "UPDATE ok1_req SET Estado ='" + clave.estado + "' WHERE EntryReqWeb='" + clave.entryReqWeb + "' AND LOWER(Estado)<>'aprobacion'";
                        try {
                            $cordovaSQLite.execute(db, query9).then(function (result) {
                                console.log(result);
                            }, function (error) {
                                console.error(error);
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    }, function (err) {
                        console.error(err);
                    });

                    angular.forEach(sincronizarRequisicionAprobacion, function (resultadoAux) {
                        var mensaje = resultadoAux.mensaje;
                        mensaje = mensaje.replace(/\'/g, '"');
                        var mensajeAux = JSON.parse(mensaje);
                        var sincroRequisiciones = mensajeAux['requisiciones'];
                        var sincroItems = mensajeAux['items'];

                        console.log(resultadoAux);
                        console.log(mensajeAux);

                        angular.forEach(sincroRequisiciones, function (resAux) {
                            var query8 = "INSERT INTO ok1_req (Sincronizado,Descripcion,EntryPerfilMovil,Estado,FechaAutorizacion,\n\
                                          FechaSincronizacion,IDReq,NoAprobacion,EntryReqWeb,EntryPerfilWebCreador,PerfilCreadorReq) \n\
                                VALUES ('0','" + resAux.descripcion + "','" + resultadoAux.entryPerfilMovilAprobador + "','aprobacion','" +
                                    resAux.fechaAutorizacion + "','" + resultadoAux.fechaSincronizacion
                                    + "','" + resAux.IDReq + "','" + resAux.noAprobacion + "','" + resultadoAux.entryReqWeb + "','" + resultadoAux.entryPerfilWebCreador + "','" + resultadoAux.perfilCreadorReq + "')";
                            query8 = query8.replace("''", "null");
                            console.log(query8);
                            try {
                                $cordovaSQLite.execute(db, query8).then(function (result) {
                                    var resInsertReq = result.insertId;
                                    angular.forEach(sincroItems, function (resAux2) {

                                        var query9 = "INSERT INTO ok1_ite (Sincronizado,Articulo,ArticuloCodigo,ArticuloNombre,Descripcion,Tipo,ReqTipo,Fecha,\n\
                                                                CantidadSolicitada,CantidadAprobada,Proveedor,Almacen,CentroCosto, \n\
                                                                Proyecto, EntryReqMovil, EntryItemMovilCreador) VALUES ('" + resultadoAux.sincronizado + "','"
                                                + resAux2.articulo + "','" + resAux2.articuloCodigo + "','" + resAux2.articuloNombre + "','" + resAux2.descripcion + "','"
                                                + resAux2.tipo + "','" + resAux2.reqTipo + "','" + resAux2.fecha + "','"
                                                + resAux2.cantidadSolicitada + "','" + resAux2.cantidadAprobada + "','" + resAux2.proveedor
                                                + "','" + resAux2.almacen + "','" + resAux2.grupoArticuloReq + "','"
                                                + resAux2.proyecto + "','" + resInsertReq + "','" + resAux2.entryItemMovil + "')";
                                        query9 = query9.replace("''", "null");
                                        console.log(query9);
                                        try {
                                            $cordovaSQLite.execute(db, query9).then(function (result) {
                                                var resultado = result.insertId;

                                                console.log(resultado);
                                            }, function (error) {
                                                console.error(error);
                                            });
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    });
                                    try {
                                        var urlRes = 'http://cn-okone.com/legalisappServidor/public/resSincroAprobacion/' + resultadoAux.entryReqWeb + '/1';
                                        $http.get(urlRes).success(function (dataRes) {
                                            console.log(dataRes['result']);

                                        }).error(function (msg, code) {
                                            console.log(msg);
                                        });

                                    } catch (e2) {
                                        console.log(e2);
                                    }
                                    console.log(result);

                                }, function (error) {
                                    try {
                                        var urlRes = 'http://cn-okone.com/legalisappServidor/public/resSincroAprobacion/' + resultadoAux.entryReqWeb + '/0';
                                        $http.get(urlRes).success(function (dataRes) {
                                            console.log(dataRes['result']);

                                        }).error(function (msg, code) {
                                            console.log(msg);
                                        });
                                    } catch (e1) {
                                        console.log(e1);
                                    }
                                    console.error(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        });

                    });




                    query4 = "UPDATE ok1_perf SET FechaSincronizacion = '" + fecha + "'";

                    $cordovaSQLite.execute(db, query4).then(function (result) {
                        try {
                            var arrayRes = new Array();
                            arrayRes[0] = '1';
                            arrayRes[1] = sincronizarGasto;
                            defered.resolve(arrayRes);
                            console.log('resolvió la promesa - update sicronizacion resultado 1');
                        } catch (e) {
                            var arrayRes = new Array();
                            arrayRes[0] = '0';
                            arrayRes[1] = '0';
                            defered.resolve(arrayRes);
                            console.log(' no es posible resolver la promesa 0');
                        }
                    }, function (error) {
                        console.error(error);
                    });
//                    }, function (error) {
//                        console.error(error);
//                    });
                    return promise;
                }, putGastosWeb: function (gastos) {
                    var resultado = '';
                    var valor;
                    var defered = $q.defer();
                    var promise = defered.promise;
                    if (gastos === '0') {
                        try {
                            defered.resolve('0');
                            console.log('no es posible resolver la promesa 1');

                        } catch (e) {
                            defered.resolve('0');
                            console.log('no es posible resolver la promesa 0');
                        }
                    } else {
                        angular.forEach(gastos, function (clave) {
                            var queryE = '';
                            queryE = "SELECT f.EntryFactMovil,f.EntryLegMovil, l.EntryPerfilMovil FROM ok1_fact f inner join ok1_leg l on (f.EntryLegMovil = l.EntryLegMovil)  WHERE f.EntryFactWeb = '" + clave.entryFactMovil + "' ";
                            console.log(queryE);
                            try {
                                $cordovaSQLite.execute(db, queryE).then(function (resulta) {
                                    console.log(resulta);
                                    queryC = "INSERT INTO ok1_gto (`Sincronizado`,`EntryFactMovil`,`EntryLegMovil`,`EntryPerfilMovil`,`Impuesto`,`Info1`,`Info2`,`Info3`,`TipoGasto`,`Valor`,`Notas`) VALUES \n\
                                                                          ('0','" + resulta.rows.item(0).EntryFactMovil + "','" + resulta.rows.item(0).EntryLegMovil + "','" + resulta.rows.item(0).EntryPerfilMovil + "','" +
                                            clave.impuesto + "','" + clave.info1 + "','" + clave.info2 + "','" +
                                            clave.info3 + "','" + clave.tipoGasto + "','" + clave.valor + "','" + clave.notas + "')";
                                    queryC = queryC.replace(/''/gi, null);
                                    try {
                                        $cordovaSQLite.execute(db, queryC).then(function (resultg) {
                                            console.log("gastoWEB:" + resultg.insertId);
                                            console.log(queryC);
                                            try {
                                                defered.resolve('1');
                                                console.log('resolvió la promesa - update resultado 1');


                                            } catch (e) {
                                                defered.resolve('0');
                                                console.log(' no es posible resolver la promesa 0');
                                            }

                                        }, function (errora) {
                                            console.error(errora);
                                        });
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }, function (errora) {
                                    console.error(errora);
                                });
                            } catch (e) {
                                console.log(e);
                            }

                        });
                    }

                    return promise;
                }, putEnviarLegalizacion: function (enviar) {
                    console.log(enviar);
                    var defered = $q.defer();
                    var promise = defered.promise;
                    enviar = JSON.parse(enviar);
                    var legalizaciones = enviar['legalizaciones'];
                    var facturas = enviar['facturas'];
                    var gastos = enviar['gastos'];
                    var query = '';

                    angular.forEach(legalizaciones, function (clave) {
                        query = "SELECT Dimension2 FROM ok1_perf WHERE EntryPerfilWeb =" + clave.entryPerfilMovil;
                        console.log(query);
                        db.executeSql(query, [], function (res) {
                            console.log(res.rows.item(0));
                            if (res.rows.item(0).Dimension2 === '1' || res.rows.item(0).Dimension2 === 1) {
                                query = "UPDATE ok1_leg SET EntryLegWeb =" + clave.entryLegWeb + ", Estado = 'pendiente' WHERE EntryLegMovil=" + clave.entryLegMovil;
                            } else {
                                query = "UPDATE ok1_leg SET EntryLegWeb =" + clave.entryLegWeb + ", Estado = 'aprobado' WHERE EntryLegMovil=" + clave.entryLegMovil;
                            }
                            console.log('putLega');
                            console.log(query);

                            try {
                                $cordovaSQLite.execute(db, query).then(function (result) {

                                }, function (error) {
                                    console.error(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }, function (err) {
                            console.error(err);
                        });
                    });

                    angular.forEach(facturas, function (clave) {
                        query = "UPDATE ok1_fact SET EntryFactWeb =" + clave.entryFactWeb + " WHERE EntryFactMovil=" + clave.entryFactMovil;
                        try {
                            $cordovaSQLite.execute(db, query).then(function (result) {
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    });
                    angular.forEach(gastos, function (clave) {
                        query = "UPDATE ok1_gto SET EntryGastoWeb =" + clave.entryGastoWeb + " WHERE EntryGastoMovil=" + clave.entryGastoMovil;

                        try {
                            $cordovaSQLite.execute(db, query).then(function (result) {

                            });
                        } catch (e) {
                            console.log(e);
                        }

                    });


                    try {
                        defered.resolve('1');
                        console.log('resolvió la promesa - update envio legalizacion resultado 1');
                    } catch (e) {
                        defered.resolve('0');
                        console.log(' no es posible resolver la promesa 0');
                    }

                    return promise;
                }, getVerificarAprobacion: function (legalizacion) {
                    var deferred = $q.defer();
                    var url = 'http://cn-okone.com/legalisappServidor/public/aprobar/' + legalizacion.entryLegWeb + '/' + legalizacion.noAprobacion;
                    $http.get(url).success(function (data) {
                        console.log(data['result'].NoAprobacion);
                        deferred.resolve(data['result'].NoAprobacion);
                    })
                            .error(function (msg, code) {
                                deferred.resolve(msg);
                            });
                    return deferred.promise;
                }, getReenviarEmail: function (legalizacion) {
                    var deferred = $q.defer();
                    console.log(legalizacion);
                    var url = 'http://cn-okone.com/legalisappServidor/public/reenviar/' + legalizacion.entryLegWeb;
                    console.log(url);
                    $http.get(url).success(function (data) {
                        console.log(data['response']);
                        deferred.resolve(data['response']);
                    })
                            .error(function (msg, code) {
                                deferred.resolve(msg);
                            });
                    return deferred.promise;
                }

                , getUltimaFecha: function () {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT FechaSincronizacion FROM ok1_perf  ORDER BY 1 DESC LIMIT 1";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0).FechaSincronizacion);
                                console.log('resolvió la promesa if - get fecha' + res.rows.item(0).FechaSincronizacion);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa fecha if - get');
                            }
                        } else {
                            try {
                                var f = new Date();
                                var fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds()
                                defered.resolve(fecha);
                                console.log('resolvió la promesa else - get' + fecha);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, getSincronizarPerfil: function (entryPerfilMovil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT p.*, gr.IdGrupoSAP, gr.NombreGrupo FROM ok1_perf p, ok1_grupo_gto gr WHERE p.Sincronizado = 0 AND p.Company <> 1 AND p.IdGrupo = gr.IdGrupo AND p.EntryPerfilMovil=" + entryPerfilMovil;
                    var json;
                    sincronizar.push(json);
                    db.executeSql(query, [], function (res) {

                        if (res.rows.length > 0) {
                            json = "{";
                            json = json + "\"sincronizado\":\"" + res.rows.item(0).Sincronizado + "\",";
                            json = json + "\"entryPerfilMovil\":\"" + res.rows.item(0).EntryPerfilMovil + "\",";
                            json = json + "\"entryPerfilWeb\":\"" + res.rows.item(0).EntryPerfilWeb + "\",";
                            json = json + "\"docPerfil\":\"" + res.rows.item(0).DocPerfil + "\",";
                            json = json + "\"perfil\":\"" + res.rows.item(0).Perfil + "\",";
                            json = json + "\"emailPerfil\":\"" + res.rows.item(0).EmailPerfil + "\",";
                            json = json + "\"proyecto\":\"" + res.rows.item(0).Proyecto + "\",";
                            json = json + "\"sn\":\"" + res.rows.item(0).SN + "\",";
                            json = json + "\"company\":\"" + res.rows.item(0).Company + "\",";
                            json = json + "\"aprobador\":\"" + res.rows.item(0).Aprobador + "\",";
                            json = json + "\"dimension1\":\"" + res.rows.item(0).Dimension1 + "\",";
                            json = json + "\"dimension2\":\"" + res.rows.item(0).Dimension2 + "\",";
                            json = json + "\"dimension3\":\"" + res.rows.item(0).Dimension3 + "\",";
                            json = json + "\"dimension4\":\"" + res.rows.item(0).Dimension4 + "\",";
                            json = json + "\"dimension5\":\"" + res.rows.item(0).Dimension5 + "\",";
                            json = json + "\"habilitado\":\"" + res.rows.item(0).Habilitado + "\",";
                            json = json + "\"idGrupo\":\"" + res.rows.item(0).IdGrupoSAP + "\",";
                            json = json + "\"enviaRequisicion\":\"" + res.rows.item(0).EnviaRequisicion + "\",";
                            json = json + "\"aprobadorRequisicion\":\"" + res.rows.item(0).AprobadorRequisicion + "\",";
                            json = json + "\"dimensionSap\":\"" + res.rows.item(0).DimensionSap + "\",";
                            json = json + "\"almacenSap\":\"" + res.rows.item(0).AlmacenSap + "\",";
                            json = json + "\"proyectoSap\":\"" + res.rows.item(0).ProyectoSap + "\",";
                            json = json + "\"entryPerfilWebAprobador\":\"" + res.rows.item(0).EntryPerfilWebAprobador + "\",";
                            json = json + "\"entryPerfilMovilAprobador\":\"" + res.rows.item(0).EntryPerfilMovilAprobador + "\"";
                            json = json + "}";

                        } else {
                            console.log('No existen datos');
                        }
                        console.log(json);
                        $http({
                            method: 'POST',
                            url: 'http://cn-okone.com/legalisappServidor/public/apiPerfil.php',
                            data: json,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Control': '*'}
                        })
                                .success(function (response) {
                                    // handle success things
                                    try {
                                        console.log(response);
                                        defered.resolve(response['message']);
                                        console.log('resolvió la promesa de sincronizar success');
                                    } catch (e) {
                                        defered.resolve('0');
                                        console.log(' no es posible resolver la promesa de sincronizar success');
                                    }
                                })
                                .error(function (data, status, headers, config) {
                                    // handle error things
                                    try {
                                        defered.resolve('0');
                                        console.log('resolvió la promesa de sincronizar error');
                                    } catch (e) {
                                        defered.resolve('0');
                                        console.log(' no es posible resolver la promesa de sincronizar error');
                                    }
                                });

                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, getEnviarRequisicion: function (requisicion, idTransaccion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT r.EntryReqWeb, r.EntryReqMovil,r.Estado,p.EntryPerfilWebAprobador,\n\
                                p.EntryPerfilWeb,p.EntryPerfilMovil,r.Sincronizado,r.FechaSincronizacion \n\
                                FROM ok1_req r, ok1_perf p WHERE r.EntryPerfilMovil=p.EntryPerfilMovil \n\
                                AND p.Company <> 1 AND r.EntryReqMovil =" + requisicion.EntryReqMovil;
                    console.log(query);
                    var json = "{";
                    sincronizar.push(json);
                    db.executeSql(query, [], function (res) {
                        json = json + "\"metadataRequisicion\":[";
                        json = json + "{";
                        json = json + "\"entryReqWeb\":\"" + res.rows.item(0).EntryReqWeb + "\",";
                        json = json + "\"entryReqMovil\":\"" + res.rows.item(0).EntryReqMovil + "\",";
                        json = json + "\"estado\":\"" + res.rows.item(0).Estado + "\",";
                        json = json + "\"entryPerfilWebAprobador\":\"" + res.rows.item(0).EntryPerfilWebAprobador + "\",";
                        json = json + "\"entryPerfilWeb\":\"" + res.rows.item(0).EntryPerfilWeb + "\",";
                        json = json + "\"entryPerfilMovil\":\"" + res.rows.item(0).EntryPerfilMovil + "\",";
                        json = json + "\"sincronizado\":\"" + res.rows.item(0).Sincronizado + "\",";
                        json = json + "\"fechaSincronizacion\":\"" + res.rows.item(0).FechaSincronizacion + "\",";
                        json = json + "\"idTran\":\"" + idTransaccion + "\"";
                        json = json + "}";
                        json = json + "],";
                        var query = "SELECT p.EntryPerfilWeb,r.Sincronizado,r.EntryReqMovil,r.Descripcion,\n\
                                r.EntryPerfilMovil,r.Estado,r.FechaAutorizacion,r.FechaSincronizacion,\n\
                                r.IDReq,r.NoAprobacion,r.EntryReqWeb FROM ok1_req r, ok1_perf p \n\
                                WHERE r.EntryPerfilMovil=p.EntryPerfilMovil AND p.Company <> 1 AND r.EntryReqMovil =" + requisicion.EntryReqMovil;
                        console.log(query);
                        db.executeSql(query, [], function (res) {
                            json = json + "\"requisiciones\":[";
                            json = json + "{";
                            json = json + "\"sincronizado\":\"" + res.rows.item(0).Sincronizado + "\",";
                            json = json + "\"entryReqMovil\":\"" + res.rows.item(0).EntryReqMovil + "\",";
                            json = json + "\"cargado\":\"" + res.rows.item(0).Cargado + "\",";
                            json = json + "\"descripcion\":\"" + res.rows.item(0).Descripcion + "\",";
                            json = json + "\"entryPerfilMovil\":\"" + res.rows.item(0).EntryPerfilWeb + "\",";
                            json = json + "\"estado\":\"" + res.rows.item(0).Estado + "\",";
                            json = json + "\"fechaAutorizacion\":\"" + res.rows.item(0).FechaAutorizacion + "\",";
                            json = json + "\"fechaSincronizacion\":\"" + res.rows.item(0).FechaSincronizacion + "\",";
                            json = json + "\"iDReq\":\"" + res.rows.item(0).IDReq + "\",";
                            json = json + "\"noAprobacion\":\"" + res.rows.item(0).NoAprobacion + "\",";
                            json = json + "\"entryReqWeb\":\"" + res.rows.item(0).EntryReqWeb + "\",";
                            json = json + "\"idTran\":\"" + idTransaccion + "\"";
                            json = json + "}";
                            json = json + "],";

                            var query = "SELECT * FROM ok1_ite WHERE EntryReqMovil =" + requisicion.EntryReqMovil;
                            console.log(query);
                            db.executeSql(query, [], function (res) {
                                json = json + "\"items\":[";
                                if (res.rows.length > 0) {
                                    for (var i = 0; i < (res.rows.length - 1); i++)
                                    {
                                        json = json + "{";
                                        json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                        json = json + "\"entryItemMovil\":\"" + res.rows.item(i).EntryItemMovil + "\",";
                                        json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                        json = json + "\"articulo\":\"" + res.rows.item(i).Articulo + "\",";
                                        json = json + "\"articuloCodigo\":\"" + res.rows.item(i).ArticuloCodigo + "\",";
                                        json = json + "\"articuloNombre\":\"" + res.rows.item(i).ArticuloNombre + "\",";
                                        json = json + "\"tipo\":\"" + res.rows.item(i).Tipo + "\",";
                                        json = json + "\"reqTipo\":\"" + res.rows.item(i).ReqTipo + "\",";
                                        json = json + "\"fecha\":\"" + res.rows.item(i).Fecha + "\",";
                                        json = json + "\"cantidadSolicitada\":\"" + res.rows.item(i).CantidadSolicitada + "\",";
                                        json = json + "\"cantidadAprobada\":\"" + res.rows.item(i).CantidadSolicitada + "\",";
                                        json = json + "\"proveedor\":\"" + res.rows.item(i).Proveedor + "\",";
                                        json = json + "\"almacen\":\"" + res.rows.item(i).Almacen + "\",";
                                        json = json + "\"grupoArticuloReq\":\"" + res.rows.item(i).CentroCosto + "\",";
                                        json = json + "\"proyecto\":\"" + res.rows.item(i).Proyecto + "\",";
                                        json = json + "\"entryReqMovil\":\"" + res.rows.item(i).EntryReqMovil + "\",";
                                        json = json + "\"entryItemMovilCreador\":\"" + res.rows.item(i).EntryItemMovil + "\",";
                                        json = json + "\"idTran\":\"" + idTransaccion + "\"";
                                        json = json + "},";
                                    }
                                    json = json + "{";
                                    json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                    json = json + "\"entryItemMovil\":\"" + res.rows.item(i).EntryItemMovil + "\",";
                                    json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                    json = json + "\"articulo\":\"" + res.rows.item(i).Articulo + "\",";
                                    json = json + "\"articuloCodigo\":\"" + res.rows.item(i).ArticuloCodigo + "\",";
                                    json = json + "\"articuloNombre\":\"" + res.rows.item(i).ArticuloNombre + "\",";
                                    json = json + "\"tipo\":\"" + res.rows.item(i).Tipo + "\",";
                                    json = json + "\"reqTipo\":\"" + res.rows.item(i).ReqTipo + "\",";
                                    json = json + "\"fecha\":\"" + res.rows.item(i).Fecha + "\",";
                                    json = json + "\"cantidadSolicitada\":\"" + res.rows.item(i).CantidadSolicitada + "\",";
                                    json = json + "\"cantidadAprobada\":\"" + res.rows.item(i).CantidadSolicitada + "\",";
                                    json = json + "\"proveedor\":\"" + res.rows.item(i).Proveedor + "\",";
                                    json = json + "\"almacen\":\"" + res.rows.item(i).Almacen + "\",";
                                    json = json + "\"grupoArticuloReq\":\"" + res.rows.item(i).CentroCosto + "\",";
                                    json = json + "\"proyecto\":\"" + res.rows.item(i).Proyecto + "\",";
                                    json = json + "\"entryReqMovil\":\"" + res.rows.item(i).EntryReqMovil + "\",";
                                    json = json + "\"entryItemMovilCreador\":\"" + res.rows.item(i).EntryItemMovil + "\",";
                                    json = json + "\"idTran\":\"" + idTransaccion + "\"";
                                    json = json + "}";
                                } else {
                                    console.log('No existen datos');
                                }
                                json = json + "]";
                                json = json + "}";
                                console.log(json);
                                $http({
                                    method: 'POST',
                                    url: 'http://cn-okone.com/legalisappServidor/public/apiRequisicion.php',
                                    data: json,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Control': '*'}
                                })
                                        .success(function (response) {
                                            console.log(response);
                                            // handle success things
                                            try {
                                                defered.resolve(response['message']);
                                                console.log('resolvió la promesa de enviar legalizacion success');
                                            } catch (e) {
                                                defered.resolve('0');
                                                console.log(' no es posible resolver la promesa de sincronizar success');
                                            }
                                        })
                                        .error(function (data, status, headers, config) {
                                            // handle error things
                                            try {
                                                defered.resolve(data);
                                                console.log('resolvió la promesa de enviar legalizacion error');
                                                console.log(data);
                                            } catch (e) {
                                                defered.resolve(e);
                                                console.log(' no es posible resolver la promesa de sincronizar error');
                                            }
                                        });
                            }, function (error) {
                                console.log('SELECT error: ' + error.message);
                            });

                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });

                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, putEnviarRequisicion: function (enviar) {
                    console.log(enviar);
                    var defered = $q.defer();
                    var promise = defered.promise;
                    /*  var mensaje2= enviar.replace(/\//g, "|");
                     mensaje2= mensaje2.replace('|"', "'");*/
                    enviar = JSON.parse(enviar);
                    var mensaje = enviar['mensaje'];
                    mensaje = mensaje.replace(/\'/g, '"');
                    var mensaje2 = JSON.parse(mensaje);
                    var requisiciones = mensaje2['requisiciones'];
                    var items = mensaje2['items'];
                    var query = '';

                    angular.forEach(requisiciones, function (clave) {
                        query = "SELECT EntryPerfilWebAprobador FROM ok1_perf WHERE EntryPerfilMovil =" + clave.entryPerfilMovil;
                        console.log(query);
                        db.executeSql(query, [], function (res) {
                            console.log(res.rows.item(0));
                            if (res.rows.item(0).EntryPerfilWebAprobador !== null && res.rows.item(0).EntryPerfilWebAprobador !== '' && Number(res.rows.item(0).EntryPerfilWebAprobador) > 0) {
                                query = "UPDATE ok1_req SET EntryReqWeb =" + enviar['entryReqWeb'] + ", Estado = 'pendiente' WHERE EntryReqMovil=" + clave.entryReqMovil;
                            } else {
                                query = "UPDATE ok1_req SET EntryReqWeb =" + enviar['entryReqWeb'] + ", Estado = 'aprobado' WHERE EntryReqMovil=" + clave.entryReqMovil;
                            }
                            console.log('putReq');
                            console.log(query);

                            try {
                                $cordovaSQLite.execute(db, query).then(function (result) {
                                    try {
                                        defered.resolve('1');
                                        console.log('resolvió la promesa - update envio requisicion resultado 1');
                                    } catch (e) {
                                        defered.resolve('0');
                                        console.log(' no es posible resolver la promesa 0');
                                    }
                                }, function (error) {
                                    console.error(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }, function (err) {
                            console.error(err);
                        });
                    });
                    return promise;
                }, getResSincroAprobacion: function (requisicion) {
                    var deferred = $q.defer();
                    var url = 'http://cn-okone.com/legalisappServidor/public/resSincroAprobacion/' + requisicion.entryReqWeb + '/' + requisicion.entryReqMovil;
                    $http.get(url).success(function (data) {
                        console.log(data['result']);
                        deferred.resolve(data['result']);
                    })
                            .error(function (msg, code) {
                                deferred.resolve(msg);
                            });
                    return deferred.promise;
                }, getTransaccionReq: function () {
                    var deferred = $q.defer();
                    $http.get('http://cn-okone.com/legalisappServidor/public/transaccionReq/').success(function (data) {
                        resultado = data['result'];
                        console.log(data['result']);
                        deferred.resolve(data['result']);
                    })
                            .error(function (msg, code) {
                                console.log(msg);
                                console.log(code);
                                deferred.resolve(msg);
                            });
                    return deferred.promise;
                }, deleteAprobarRequisicion: function (enviar) {
                    console.log(enviar);
                    var defered = $q.defer();
                    var promise = defered.promise;
                    enviar = JSON.parse(enviar);
                    var query = '';

                    angular.forEach(enviar, function (clave) {
                        if (clave.sincronizado === 1 || clave.sincronizado === '1') {
                            query = "DELETE FROM ok1_ite  WHERE EntryReqMovil=(SELECT EntryReqMovil FROM ok1_req WHERE EntryReqWeb=" + clave.entryReqWeb + ")";
                            console.log(query);
                            try {
                                $cordovaSQLite.execute(db, query).then(function (result) {
                                    var query2 = "DELETE FROM ok1_req WHERE EntryReqWeb=" + clave.entryReqWeb;
                                    console.log(query);
                                    try {
                                        $cordovaSQLite.execute(db, query2).then(function (result2) {
                                            try {
                                                defered.resolve('1');
                                                console.log('resolvió la promesa - delete req aprobacion resultado 1');
                                            } catch (e) {
                                                defered.resolve('-1');
                                                console.log(' no es posible resolver la promesa 0');
                                            }
                                        }, function (error) {
                                            console.error(error);
                                        });
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }, function (error) {
                                    console.error(error);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });
                    return promise;
                }, getAprobarReq: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT r.EntryReqWeb,r.EntryReqMovil,'aprobada' AS Estado,\n\
                                 p.EntryPerfilWebAprobador, p.EntryPerfilWeb,p.EntryPerfilMovil,\n\
                                 r.Sincronizado,r.FechaAutorizacion,r.FechaSincronizacion,\n\
                                 r.Descripcion FROM ok1_req r, ok1_perf p WHERE \n\
                                 r.EntryPerfilMovil=p.EntryPerfilMovil AND p.Company <> 1 \n\
                                 AND r.EntryReqMovil IN(" + requisicion + ")";
                    console.log(query);
                    var json = "{";
                    sincronizar.push(json);
                    json = json + "\"requisiciones\":[";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                json = json + "{";
                                json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                json = json + "\"entryReqMovil\":\"" + res.rows.item(i).EntryReqMovil + "\",";
                                json = json + "\"cargado\":\"" + res.rows.item(i).Cargado + "\",";
                                json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilWeb + "\",";
                                json = json + "\"estado\":\"aprobada\",";
                                json = json + "\"fechaAutorizacion\":\"" + res.rows.item(i).FechaAutorizacion + "\",";
                                json = json + "\"fechaSincronizacion\":\"" + res.rows.item(i).FechaSincronizacion + "\",";
                                json = json + "\"iDReq\":\"" + res.rows.item(i).IDReq + "\",";
                                json = json + "\"noAprobacion\":\"" + res.rows.item(i).NoAprobacion + "\",";
                                json = json + "\"entryReqWeb\":\"" + res.rows.item(i).EntryReqWeb + "\",";
                                json = json + "\"idTran\":\"-1\"";
                                json = json + "},";
                            }
                        }
                        json = json.substring(0, json.length - 1);
                        json = json + "],";
                        var query3 = "SELECT * FROM ok1_ite WHERE EntryReqMovil IN(" + requisicion + ")";
                        db.executeSql(query3, [], function (res3) {
                            json = json + "\"items\":[";
                            if (res3.rows.length > 0) {
                                for (var j = 0; j < res3.rows.length; j++)
                                {
                                    json = json + "{";
                                    json = json + "\"sincronizado\":\"" + res3.rows.item(j).Sincronizado + "\",";
                                    json = json + "\"entryItemMovil\":\"" + res3.rows.item(j).EntryItemMovil + "\",";
                                    json = json + "\"descripcion\":\"" + res3.rows.item(j).Descripcion + "\",";
                                    json = json + "\"articulo\":\"" + res3.rows.item(j).Articulo + "\",";
                                    json = json + "\"articuloCodigo\":\"" + res3.rows.item(j).ArticuloCodigo + "\",";
                                    json = json + "\"articuloNombre\":\"" + res3.rows.item(j).ArticuloNombre + "\",";
                                    json = json + "\"tipo\":\"" + res3.rows.item(j).Tipo + "\",";
                                    json = json + "\"reqTipo\":\"" + res3.rows.item(j).ReqTipo + "\",";
                                    json = json + "\"fecha\":\"" + res3.rows.item(j).Fecha + "\",";
                                    json = json + "\"cantidadSolicitada\":\"" + res3.rows.item(j).CantidadSolicitada + "\",";
                                    json = json + "\"cantidadAprobada\":\"" + res3.rows.item(j).CantidadAprobada + "\",";
                                    json = json + "\"proveedor\":\"" + res3.rows.item(j).Proveedor + "\",";
                                    json = json + "\"almacen\":\"" + res3.rows.item(j).Almacen + "\",";
                                    json = json + "\"grupoArticuloReq\":\"" + res3.rows.item(j).CentroCosto + "\",";
                                    json = json + "\"proyecto\":\"" + res3.rows.item(j).Proyecto + "\",";
                                    json = json + "\"entryReqMovil\":\"" + res3.rows.item(j).EntryReqMovil + "\",";
                                    json = json + "\"entryItemMovilCreador\":\"" + res3.rows.item(j).EntryItemMovilCreador + "\",";
                                    json = json + "\"idTran\":\"-1\"";
                                    json = json + "},";
                                }
                                json = json.substring(0, json.length - 1);
                            } else {
                                console.log('No existen datos');
                            }
                            json = json + "]";
                            json = json + "}";
                            console.log(json);
                            $http({
                                method: 'POST',
                                url: 'http://cn-okone.com/legalisappServidor/public/apiRequisicionAprobacion.php',
                                data: json,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Control': '*'}
                            })
                                    .success(function (response) {
                                        console.log(response);
                                        // handle success things
                                        try {
                                            defered.resolve(response['message']);
                                            console.log('resolvió la promesa de aprobar requisicion success');
                                        } catch (e) {
                                            defered.resolve('0');
                                            console.log(' no es posible resolver la promesa de aprobar requisicion success');
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        // handle error things
                                        try {
                                            defered.resolve(data);
                                            console.log('resolvió la promesa de enviar aprobar requisicion error');
                                            console.log(data);
                                        } catch (e) {
                                            defered.resolve(e);
                                            console.log(' no es posible resolver la promesa de aprobar requisicion error');
                                        }
                                    });
                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });

                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, getRechazarReq: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT r.EntryReqWeb,r.EntryReqMovil,'rechazada' AS Estado,\n\
                                 p.EntryPerfilWebAprobador, p.EntryPerfilWeb,p.EntryPerfilMovil,\n\
                                 r.Sincronizado,r.FechaAutorizacion,r.FechaSincronizacion,\n\
                                 r.Descripcion FROM ok1_req r, ok1_perf p WHERE \n\
                                 r.EntryPerfilMovil=p.EntryPerfilMovil AND p.Company <> 1 \n\
                                 AND r.EntryReqMovil IN(" + requisicion + ")";
                    console.log(query);
                    var json = "{";
                    sincronizar.push(json);
                    json = json + "\"requisiciones\":[";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                json = json + "{";
                                json = json + "\"sincronizado\":\"" + res.rows.item(i).Sincronizado + "\",";
                                json = json + "\"entryReqMovil\":\"" + res.rows.item(i).EntryReqMovil + "\",";
                                json = json + "\"cargado\":\"" + res.rows.item(i).Cargado + "\",";
                                json = json + "\"descripcion\":\"" + res.rows.item(i).Descripcion + "\",";
                                json = json + "\"entryPerfilMovil\":\"" + res.rows.item(i).EntryPerfilWeb + "\",";
                                json = json + "\"estado\":\"aprobada\",";
                                json = json + "\"fechaAutorizacion\":\"" + res.rows.item(i).FechaAutorizacion + "\",";
                                json = json + "\"fechaSincronizacion\":\"" + res.rows.item(i).FechaSincronizacion + "\",";
                                json = json + "\"iDReq\":\"" + res.rows.item(i).IDReq + "\",";
                                json = json + "\"noAprobacion\":\"" + res.rows.item(i).NoAprobacion + "\",";
                                json = json + "\"entryReqWeb\":\"" + res.rows.item(i).EntryReqWeb + "\",";
                                json = json + "\"idTran\":\"-1\"";
                                json = json + "},";
                            }
                        }
                        json = json.substring(0, json.length - 1);
                        json = json + "],";
                        var query3 = "SELECT * FROM ok1_ite WHERE EntryReqMovil IN(" + requisicion + ")";
                        db.executeSql(query3, [], function (res3) {
                            json = json + "\"items\":[";
                            if (res3.rows.length > 0) {
                                for (var j = 0; j < res3.rows.length; j++)
                                {
                                    json = json + "{";
                                    json = json + "\"sincronizado\":\"" + res3.rows.item(j).Sincronizado + "\",";
                                    json = json + "\"entryItemMovil\":\"" + res3.rows.item(j).EntryItemMovil + "\",";
                                    json = json + "\"descripcion\":\"" + res3.rows.item(j).Descripcion + "\",";
                                    json = json + "\"articulo\":\"" + res3.rows.item(j).Articulo + "\",";
                                    json = json + "\"articuloCodigo\":\"" + res3.rows.item(j).ArticuloCodigo + "\",";
                                    json = json + "\"articuloNombre\":\"" + res3.rows.item(j).ArticuloNombre + "\",";
                                    json = json + "\"tipo\":\"" + res3.rows.item(j).Tipo + "\",";
                                    json = json + "\"reqTipo\":\"" + res3.rows.item(j).ReqTipo + "\",";
                                    json = json + "\"fecha\":\"" + res3.rows.item(j).Fecha + "\",";
                                    json = json + "\"cantidadSolicitada\":\"" + res3.rows.item(j).CantidadSolicitada + "\",";
                                    json = json + "\"cantidadAprobada\":\"" + res3.rows.item(j).CantidadAprobada + "\",";
                                    json = json + "\"proveedor\":\"" + res3.rows.item(j).Proveedor + "\",";
                                    json = json + "\"almacen\":\"" + res3.rows.item(j).Almacen + "\",";
                                    json = json + "\"grupoArticuloReq\":\"" + res3.rows.item(j).CentroCosto + "\",";
                                    json = json + "\"proyecto\":\"" + res3.rows.item(j).Proyecto + "\",";
                                    json = json + "\"entryReqMovil\":\"" + res3.rows.item(j).EntryReqMovil + "\",";
                                    json = json + "\"entryItemMovilCreador\":\"" + res3.rows.item(j).EntryItemMovilCreador + "\",";
                                    json = json + "\"idTran\":\"-1\"";
                                    json = json + "},";
                                }
                                json = json.substring(0, json.length - 1);
                            } else {
                                console.log('No existen datos');
                            }
                            json = json + "]";
                            json = json + "}";
                            console.log(json);
                            $http({
                                method: 'POST',
                                url: 'http://cn-okone.com/legalisappServidor/public/apiRequisicionAprobacion.php',
                                data: json,
                                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Control': '*'}
                            })
                                    .success(function (response) {
                                        console.log(response);
                                        // handle success things
                                        try {
                                            defered.resolve(response['message']);
                                            console.log('resolvió la promesa de aprobar requisicion success');
                                        } catch (e) {
                                            defered.resolve('0');
                                            console.log(' no es posible resolver la promesa de aprobar requisicion success');
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        // handle error things
                                        try {
                                            defered.resolve(data);
                                            console.log('resolvió la promesa de enviar aprobar requisicion error');
                                            console.log(data);
                                        } catch (e) {
                                            defered.resolve('0');
                                            console.log(' no es posible resolver la promesa de aprobar requisicion error');
                                        }
                                    });
                        }, function (error) {
                            console.log('SELECT error: ' + error.message);
                        });

                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, getArticulosAgrupacion: function () {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_perf WHERE EnviaRequisicion='1' AND Company <> 1";
                    var json = "[";
                    sincronizar.push(json);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < (res.rows.length); i++) {
                                json = json + "{";
                                json = json + "\"entryPerfilWeb\":\"" + res.rows.item(i).EntryPerfilWeb + "\"";
                                json = json + "},";
                            }
                            json = json.substring(0, json.length - 1);
                        }
                        json = json + "]";
                        console.log(json);
                        $http({
                            method: 'POST',
                            url: 'http://cn-okone.com/legalisappServidor/public/apiArticulosAgrupacion.php',
                            data: json,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Control': '*'}
                        })
                                .success(function (response) {
                                    // handle success things
                                    try {
                                        console.log(response);
                                        defered.resolve(response['message']);
                                        console.log('resolvió la promesa de sincronizar success');
                                    } catch (e) {
                                        defered.resolve('0');
                                        console.log(' no es posible resolver la promesa de sincronizar success');
                                    }
                                })
                                .error(function (data, status, headers, config) {
                                    // handle error things
                                    try {
                                        defered.resolve('0');
                                        console.log('resolvió la promesa de sincronizar error');
                                    } catch (e) {
                                        defered.resolve('0');
                                        console.log(' no es posible resolver la promesa de sincronizar error');
                                    }
                                });
                    });
                    return promise;
                }
            };
        })

        .factory('ServicioPDF', [function ($q) {
                function createPdf(invoice) {
                    return $q(function (resolve, resolve) {
                        var dd = createDocumentDefinition(invoice);
                        var pdf = pdfMake.createPdf(dd);

                        pdf.getBase64(function (output) {
                            resolve(base64ToUint8Array(output));
                        });
                    });
                }

                return {
                    createPdf: createPdf
                };
            }
            ,
            function createDocumentDefinition(invoice) {

                var items = invoice.Items.map(function (item) {
                    return [item.Description, item.Quantity, item.Price];
                });

                var dd = {
                    content: [
                        {text: 'INVOICE', style: 'header'},
                        {text: invoice.Date, alignment: 'right'},
                        {text: 'From', style: 'subheader'},
                        invoice.AddressFrom.Name,
                        invoice.AddressFrom.Address,
                        invoice.AddressFrom.Country,
                        {text: 'To', style: 'subheader'},
                        invoice.AddressTo.Name,
                        invoice.AddressTo.Address,
                        invoice.AddressTo.Country,
                        {text: 'Items', style: 'subheader'},
                        {
                            style: 'itemsTable',
                            table: {
                                widths: ['*', 75, 75],
                                body: [
                                    [
                                        {text: 'Description', style: 'itemsTableHeader'},
                                        {text: 'Quantity', style: 'itemsTableHeader'},
                                        {text: 'Price', style: 'itemsTableHeader'},
                                    ]
                                ].concat(items)
                            }
                        },
                        {
                            style: 'totalsTable',
                            table: {
                                widths: ['*', 75, 75],
                                body: [
                                    [
                                        '',
                                        'Subtotal',
                                        invoice.Subtotal,
                                    ],
                                    [
                                        '',
                                        'Shipping',
                                        invoice.Shipping,
                                    ],
                                    [
                                        '',
                                        'Total',
                                        invoice.Total,
                                    ]
                                ]
                            },
                            layout: 'noBorders'
                        },
                    ],
                    styles: {
                        header: {
                            fontSize: 20,
                            bold: true,
                            margin: [0, 0, 0, 10],
                            alignment: 'right'
                        },
                        subheader: {
                            fontSize: 16,
                            bold: true,
                            margin: [0, 20, 0, 5]
                        },
                        itemsTable: {
                            margin: [0, 5, 0, 15]
                        },
                        itemsTableHeader: {
                            bold: true,
                            fontSize: 13,
                            color: 'black'
                        },
                        totalsTable: {
                            bold: true,
                            margin: [0, 30, 0, 0]
                        }
                    },
                    defaultStyle: {
                    }
                };

                return dd;
            }, function base64ToUint8Array(base64) {
                var raw = atob(base64);
                var uint8Array = new Uint8Array(raw.length);
                for (var i = 0; i < raw.length; i++) {
                    uint8Array[i] = raw.charCodeAt(i);
                }
                return uint8Array;
            }
        ])


        .factory('GruposGasto', function ($cordovaSQLite, $q) {
            var gruposgasto = [];
            return {
                postGrupoGasto: function (grupoGasto) {
                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "INSERT INTO ok1_grupo_gto (`Sincronizado`, `IdGrupo`,`NombreGrupo`,`Company`,`IdGrupoWeb`,`IdGrupoSAP`) VALUES \n\
                                  ('0','" + grupoGasto.idGrupo + "','" + grupoGasto.nombreGrupo + "','" + grupoGasto.company + "','" + grupoGasto.idGrupoWeb + "','" + grupoGasto.idGrupoSAP + "')";
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        resultado = result.insertId;
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }
                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                },
                getGrupoGasto: function (grupoGasto) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_grupo_gto WHERE IdGrupo =" + grupoGasto.idGrupo;
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).IdGrupo);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                },
                getGruposGasto: function (perfil) {

                    gruposgasto = [];
                    var defered = $q.defer();
                    var promise = defered.promise;
                    //var query = "SELECT * FROM ok1_grupo_gto t, (SELECT c.Company FROM ok1_comp c, ok1_perf p WHERE p.Company = c.Company AND p.EntryPerfilMovil= " + perfil.entryPerfilMovil + ") t1 WHERE t.Company = t1.Company";
                    var query = "SELECT * FROM ok1_grupo_gto WHERE Company = '" + perfil.company + "'";

                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                gruposgasto.push({
                                    sincronizado: res.rows.item(i).Sincronizado,
                                    idGrupo: res.rows.item(i).IdGrupo,
                                    nombreGrupo: res.rows.item(i).NombreGrupo,
                                    company: res.rows.item(i).Company,
                                    idGrupoWeb: res.rows.item(i).IdGrupoWeb,
                                    idGrupoSAP: res.rows.item(i).IdGrupoSAP
                                });
                            }

                            try {
                                console.log(gruposgasto);
                                defered.resolve(gruposgasto);
                                console.log('resolvió la promesa' + gruposgasto[0].IdGrupo);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa');
                            }
                        } else {
                            defered.resolve('no_data');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, getGrupoGastoGto: function (grupoGasto) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_grupo_gto WHERE IdGrupo =" + grupoGasto;
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).grupoGasto);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, getGrupoGastoAsociado: function (perfil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT IdGrupo FROM ok1_grupo_gto WHERE Company = '" + perfil.company + "' AND IdGrupoSAP = '" + perfil.idGrupo.valor + "'";
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).IdGrupo);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }
            };
        })



        .factory('Requisiciones', function ($cordovaSQLite, $q) {
            var requisiciones = [];
            var requisicionesPendientes = [];
            var requisicionesAprobacion = [];
            var requisicionesConfirmadas = [];
            var requisicionesEnviadas = [];
            var perfilesCreador = [];
            return {
                getRequisiciones: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "";
                    query = "SELECT r.Sincronizado,r.EntryReqMovil,r.Descripcion,r.EntryPerfilMovil,\n\
                                r.FechaAutorizacion,r.FechaSincronizacion,r.EntryPerfilWebCreador,\n\
                                r.PerfilCreadorReq,p.Perfil,r.EntryReqWeb,r.Estado FROM ok1_req r INNER JOIN ok1_perf p \n\
                                ON (r.EntryPerfilMovil= p.EntryPerfilMovil) WHERE \n\
                                r.Estado = '" + requisicion + "'";
                    if (requisicion === 'aprobada') {
                        query = "SELECT r.Sincronizado,r.EntryReqMovil,r.Descripcion,r.EntryPerfilMovil,\n\
                                r.FechaAutorizacion,r.FechaSincronizacion,r.EntryPerfilWebCreador,\n\
                                r.PerfilCreadorReq,p.Perfil,r.EntryReqWeb,r.Estado FROM ok1_req r INNER JOIN ok1_perf p \n\
                                ON (r.EntryPerfilMovil= p.EntryPerfilMovil) WHERE \n\
                                r.Estado = 'aprobada' OR r.Estado = 'rechazada'";
                    }

                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            if (requisicion === 'pendiente') {
                                requisicionesPendientes = null;
                                requisicionesPendientes = [];
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    requisicionesPendientes.push({
                                        sincronizado: res.rows.item(i).Sincronizado,
                                        entryReqMovil: res.rows.item(i).EntryReqMovil,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDReq: res.rows.item(i).iDReq,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        entryReqWeb: res.rows.item(i).EntryReqWeb,
                                        entryPerfilWebCreador: res.rows.item(i).EntryPerfilWebCreador,
                                        perfilCreadorReq: res.rows.item(i).PerfilCreadorReq,
                                        perfilNombreAux: res.rows.item(i).Perfil,
                                        estado: res.rows.item(i).Estado,
                                        valorAux: ''
                                    });
                                }
                                try {
                                    defered.resolve(requisicionesPendientes);
                                    console.log('resolvió la promesa');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }
                            } else if (requisicion === 'aprobada') {
                                requisicionesConfirmadas = null;
                                requisicionesConfirmadas = [];
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    requisicionesConfirmadas.push({
                                        sincronizado: res.rows.item(i).Sincronizado,
                                        entryReqMovil: res.rows.item(i).EntryReqMovil,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDReq: res.rows.item(i).iDReq,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        entryReqWeb: res.rows.item(i).EntryReqWeb,
                                        entryPerfilWebCreador: res.rows.item(i).EntryPerfilWebCreador,
                                        perfilCreadorReq: res.rows.item(i).PerfilCreadorReq,
                                        perfilNombreAux: res.rows.item(i).Perfil,
                                        estado: res.rows.item(i).Estado,
                                        valorAux: ''
                                    });
                                }
                                try {
                                    defered.resolve(requisicionesConfirmadas);
                                    console.log('resolvió la promesa');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }
                            } else if (requisicion === 'aprobacion') {
                                requisicionesAprobacion = null;
                                requisicionesAprobacion = [];
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    requisicionesAprobacion.push({
                                        sincronizado: res.rows.item(i).Sincronizado,
                                        entryReqMovil: res.rows.item(i).EntryReqMovil,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDReq: res.rows.item(i).iDReq,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        entryReqWeb: res.rows.item(i).EntryReqWeb,
                                        entryPerfilWebCreador: res.rows.item(i).EntryPerfilWebCreador,
                                        perfilCreadorReq: res.rows.item(i).PerfilCreadorReq,
                                        perfilNombreAux: res.rows.item(i).Perfil,
                                        estado: res.rows.item(i).Estado,
                                        valorAux: ''
                                    });
                                }
                                try {
                                    defered.resolve(requisicionesAprobacion);
                                    console.log('resolvió la promesa');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }
                            } else if (requisicion === 'enviada') {
                                requisicionesEnviadas = null;
                                requisicionesEnviadas = [];
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    requisicionesEnviadas.push({
                                        sincronizado: res.rows.item(i).Sincronizado,
                                        entryReqMovil: res.rows.item(i).EntryReqMovil,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDReq: res.rows.item(i).iDReq,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        entryReqWeb: res.rows.item(i).EntryReqWeb,
                                        entryPerfilWebCreador: res.rows.item(i).EntryPerfilWebCreador,
                                        perfilCreadorReq: res.rows.item(i).PerfilCreadorReq,
                                        perfilNombreAux: res.rows.item(i).Perfil,
                                        estado: res.rows.item(i).Estado,
                                        valorAux: ''
                                    });
                                }
                                try {
                                    defered.resolve(requisicionesEnviadas);
                                    console.log('resolvió la promesa');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }
                            } else {
                                requisiciones = null;
                                requisiciones = [];
                                for (var i = 0; i < res.rows.length; i++)
                                {
                                    requisiciones.push({
                                        sincronizado: res.rows.item(i).Sincronizado,
                                        entryReqMovil: res.rows.item(i).EntryReqMovil,
                                        descripcion: res.rows.item(i).Descripcion,
                                        entryPerfilMovil: res.rows.item(i).EntryPerfilMovil,
                                        fechaAutorizacion: res.rows.item(i).FechaAutorizacion,
                                        fechaSincronizacion: res.rows.item(i).FechaSincronizacion,
                                        iDReq: res.rows.item(i).iDReq,
                                        noAprobacion: res.rows.item(i).NoAprobacion,
                                        entryReqWeb: res.rows.item(i).EntryReqWeb,
                                        entryPerfilWebCreador: res.rows.item(i).EntryPerfilWebCreador,
                                        perfilCreadorReq: res.rows.item(i).PerfilCreadorReq,
                                        perfilNombreAux: res.rows.item(i).Perfil,
                                        estado: res.rows.item(i).Estado,
                                        valorAux: ''
                                    });
                                }
                                try {
                                    defered.resolve(requisiciones);
                                    console.log('resolvió la promesa');
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa');
                                }
                            }
                        } else {
                            defered.resolve('0');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, postRequisicion: function (requisicion) {
                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;

                    var query = "INSERT INTO ok1_req (Sincronizado,Descripcion,EntryPerfilMovil,Estado,FechaAutorizacion,\n\
                                                                FechaSincronizacion,IDReq,NoAprobacion,EntryReqWeb) \n\
                                VALUES ('0','" + requisicion.descripcion + "','" + requisicion.entryPerfilMovil + "','"
                            + requisicion.estado + "','" + requisicion.fechaAutorizacion + "','" + requisicion.fechaSincronizacion
                            + "','" + requisicion.IDReq + "','" + requisicion.noAprobacion + "','" + requisicion.entryReqWeb + "')";

                    var query = query.replace(/''/gi, null);
                    console.log(query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        resultado = result.insertId;
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, getRequisicion: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT EntryReqMovil, Descripcion,EntryPerfilMovil,Estado,FechaAutorizacion,\n\
                                 FechaSincronizacion,EntryPerfilWebCreador,PerfilCreadorReq FROM ok1_req  WHERE EntryReqMovil =" + requisicion.entryReqMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryReqMovil);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryReqMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, deleteRequisicion: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "DELETE FROM ok1_req WHERE EntryReqMovil=" + requisicion.entryReqMovil;

                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - delete resultado 1');
                        } catch (e) {
                            defered.resolve(e);
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });

                    return promise;
                }, getRequisicionPerfil: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT EntryReqMovil, Descripcion,EntryPerfilMovil,Estado,FechaAutorizacion,\n\
                                 FechaSincronizacion FROM ok1_req T0  WHERE T0.EntryReqMovil =" + requisicion.entryReqMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryReqMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryReqMovil);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, putRequisicion: function (requisicion) {
                    var resultado = '';
                    var deferedleg = $q.defer();
                    var promise = deferedleg.promise;
                    var query = "UPDATE ok1_req SET Descripcion = '" + requisicion.descripcion + "' WHERE EntryReqMovil=" + requisicion.entryReqMovil;
                    console.log('consulta: ' + query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            deferedleg.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            deferedleg.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, getPerfilesCreador: function () {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT DISTINCT(EntryPerfilWebCreador),PerfilCreadorReq FROM ok1_req WHERE Estado = 'aprobacion'";
                    perfilesCreador = [];
                    db.executeSql(query, [], function (res) {
                        perfilesCreador.push({
                            entryPerfilWebCreador: '0',
                            perfilCreadorReq: 'N-A'
                        });
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                perfilesCreador.push({
                                    entryPerfilWebCreador: res.rows.item(i).EntryPerfilWebCreador,
                                    perfilCreadorReq: res.rows.item(i).PerfilCreadorReq
                                });
                            }
                            try {
                                defered.resolve(perfilesCreador);
                                console.log('resolvió la promesa');
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa');
                            }
                        } else {
                            defered.resolve(perfilesCreador);
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, deleteRequisicionAprobacion: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "DELETE FROM ok1_req WHERE EntryReqMovil=" + requisicion.entryReqMovil + " Estado='aprobacion'";

                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - delete resultado 1');
                        } catch (e) {
                            defered.resolve(e);
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });

                    return promise;
                }, getRequisicionItems: function (requisicion) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT COUNT(1) AS valor FROM ok1_ite  WHERE EntryReqMovil =" + requisicion.entryReqMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            if (res.rows.item(0).valor === 0 || res.rows.item(0).valor === '0') {
                                try {
                                    defered.resolve('0');
                                    console.log('resolvió la promesa else - get' + res.rows.item(0).entryReqMovil);
                                } catch (e) {
                                    defered.resolve('0');
                                    console.log(' no es posible resolver la promesa else - get');
                                }
                            } else {
                                try {
                                    console.log(res.rows.item(0).valor);
                                    defered.resolve(requisicion);
                                    console.log('resolvió la promesa if - get ' + res.rows.item(0).entryReqMovil);
                                } catch (e) {
                                    defered.resolve(e);
                                    console.log(' no es posible resolver la promesa if - get');
                                }
                            }
                        } else {
                            try {
                                defered.resolve('0');
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryReqMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }

            };
        })


        .factory('Items', function ($cordovaSQLite, $q, $http) {
            var items = [];
            return {
                getItems: function (item) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT Sincronizado,EntryItemMovil,Descripcion,Tipo,ReqTipo,CantidadSolicitada FROM ok1_ite WHERE EntryReqMovil = " + item.entryReqMovil + " AND Sincronizado <> -2";
                    items = [];
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++)
                            {
                                items.push({
                                    sincronizado: res.rows.item(i).Sincronizado,
                                    entryItemMovil: res.rows.item(i).EntryItemMovil,
                                    articulo: res.rows.item(i).Articulo,
                                    articuloCodigo: res.rows.item(i).ArticuloCodigo,
                                    articuloNombre: res.rows.item(i).ArticuloNombre,
                                    descripcion: res.rows.item(i).Descripcion,
                                    tipo: res.rows.item(i).Tipo,
                                    reqTipo: res.rows.item(i).ReqTipo,
                                    fecha: res.rows.item(i).Fecha,
                                    cantidadSolicitada: res.rows.item(i).CantidadSolicitada,
                                    cantidadAprobada: res.rows.item(i).CantidadAprobada,
                                    proveedor: res.rows.item(i).Proveedor,
                                    almacen: res.rows.item(i).Almacen,
                                    centroCosto: res.rows.item(i).CentroCosto,
                                    proyecto: res.rows.item(i).Proyecto,
                                    entryReqMovil: res.rows.item(i).EntryReqMovil
                                });
                            }
                            try {
                                defered.resolve(items);
                                console.log('resolvió la promesa');
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa');
                            }
                        } else {
                            defered.resolve('no_data');
                            console.log('No existen datos');
                        }
                    }, function (error) {
                        console.log('SELECT error: ' + error.message);
                    });
                    return promise;
                }, postItem: function (item) {
                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;

                    var query = "INSERT INTO ok1_ite (Sincronizado,Articulo,ArticuloCodigo,ArticuloNombre,Descripcion,Tipo,ReqTipo,Fecha,\n\
                                                                CantidadSolicitada,CantidadAprobada,Proveedor,Almacen,CentroCosto, \n\
                                                                Proyecto, EntryReqMovil, EntryItemMovilCreador) VALUES ('0','" + item.articulo + "','" + item.articuloCodigo + "','" + item.articuloNombre + "','" + item.descripcion + "','"
                            + item.tipo + "','" + item.reqTipo + "','" + item.fecha + "','"
                            + item.cantidadSolicitada + "','" + item.cantidadAprobada + "','" + item.proveedor
                            + "','" + item.almacen + "','" + item.centroCosto + "','"
                            + item.proyecto + "','" + item.entryReqMovil + "','-1')";
                    var query = query.replace(/''/gi, null);
                    console.log(query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        resultado = result.insertId;
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            defered.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                },
                getItem: function (item) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT Sincronizado,EntryItemMovil,Articulo,ArticuloCodigo,ArticuloNombre,Descripcion,Tipo,ReqTipo,EntryReqMovil,Sincronizado,Fecha,CantidadSolicitada,CantidadAprobada,Almacen,Proveedor FROM ok1_ite  WHERE EntryItemMovil =" + item.entryItemMovil;

                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryItemMovil);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryItemMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, deleteItem: function (item) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "DELETE FROM ok1_ite WHERE EntryItemMovil=" + item.entryItemMovil;

                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - delete resultado 1');
                        } catch (e) {
                            defered.resolve('');
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });

                    return promise;
                }, getItemsCabecera: function (item) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var objeto;

                    var query = "SELECT r.Sincronizado, r.EntryReqMovil, r.Descripcion AS DescripcionReq, r.Estado AS EstadoReq, r.EntryPerfilWebCreador, p.AlmacenSap,p.DimensionSap,p.ProyectoSap,p.EntryPerfilMovil,p.EntryPerfilWeb, p.Perfil, gr.IdGrupo, gr.NombreGrupo FROM ok1_req r INNER JOIN ok1_perf p ON r.EntryPerfilMovil=p.EntryPerfilMovil INNER JOIN ok1_grupo_gto gr ON p.IdGrupo= gr.IdGrupo WHERE r.EntryReqMovil =" + item.entryReqMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryReqMovil);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryReqMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }
                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, getItemImage: function (entryFactMovil) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_fact  WHERE EntryFactMovil =" + entryFactMovil;
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryFactMovil);
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0).entryFactMovil);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }
                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }, getItemsArticulos: function (items) {
                    var deferred = $q.defer();
                    var resultado = "";
                    var resultadoAux = "";
                    var articulos = null;
                    articulos = [];
                    var url = 'http://192.168.1.53/proyectos/legalisappServidor/public/requisicionitems/' + items.entryPerfilWeb;
                    $http.get(url).success(function (data) {
                        resultado = data['message'];
                        resultado = JSON.parse(resultado);

                        for (var i = 0; i < resultado.length; i++) {
                            resultadoAux = resultado[i];

                            articulos.push({
                                entryPerfilWeb: resultadoAux['DocEntryPerfil'],
                                entryArticuloCosto: resultadoAux['DocEntryItemGrupo'],
                                grupoArticuloCodigo: resultadoAux['DocEntryGrupo'],
                                grupoArticuloNombre: resultadoAux['U_GrpName'],
                                articuloCodigo: resultadoAux['U_ItemCode'],
                                articuloNombre: resultadoAux['U_ItemName'],
                                articuloFrgnNombre: resultadoAux['U_FrgnName'],
                                articuloTipo: resultadoAux['U_InvntItem'],
                                entryPerfilMovil: items.entryPerfilMovil
                            });
                        }
                        deferred.resolve(articulos);
                    })
                            .error(function (msg, code) {
                                articulos.push({
                                    entryPerfilWeb: '0',
                                    entryArticuloCosto: '0',
                                    grupoArticuloCodigo: '0',
                                    grupoArticuloNombre: 'N-A',
                                    articuloCodigo: '0',
                                    articuloNombre: 'N-A',
                                    articuloFrgnNombre: 'Item',
                                    articuloTipo: 'N',
                                    entryPerfilMovil: '0'
                                });
                                deferred.resolve(articulos);
                            });
                    return deferred.promise;
                }, putItem: function (item) {
                    var resultado = '';
                    var deferedleg = $q.defer();
                    var promise = deferedleg.promise;
                    if (item.cantidadAprobada === null || item.cantidadAprobada === '') {
                        item.cantidadAprobada = 0;
                    }
                    if (item.cantidadSolicitada === null || item.cantidadSolicitada === '') {
                        item.cantidadSolicitada = 0;
                    }
                    var query = "UPDATE ok1_ite SET Descripcion = '" + item.descripcion + "', CantidadSolicitada=" + item.cantidadSolicitada + ", CantidadAprobada=" + item.cantidadAprobada + ", Proveedor='" + item.proveedor + "' WHERE EntryItemMovil=" + item.entryItemMovil;
                    console.log('consulta: ' + query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            deferedleg.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            deferedleg.resolve(e);
                            console.log(' no es posible resolver la promesa');
                        }
                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, getStock: function (item) {
                    var deferred = $q.defer();
                    var resultado = "";
                    var resultadoAux = "";
                    var stock = null;
                    stock = [];
                    if (item.articuloCodigo === null || item.articuloCodigo === '') {
                        item.articuloCodigo = '0';
                    }
                    if (item.entryPerfilWeb === null || item.entryPerfilWeb === '') {
                        item.entryPerfilWeb = '0';
                    }
                    var url = 'http://192.168.1.53/proyectos/legalisappServidor/public/requisicionStock/' + item.articuloCodigo + "/" + item.entryPerfilWeb;
                    $http.get(url).success(function (data) {
                        resultado = data['message'];
                        resultado = JSON.parse(resultado);
                        if (resultado !== false && resultado !== 'false' && resultado !== '' && resultado !== null) {
                            //for (var i = 0; i < resultado.length; i++) {
                            //resultadoAux = resultado[i];

                            stock.push({
                                codigoArticulo: resultado['CodigoArticulo'],
                                nombreArticulo: resultado['NombreArticulo'],
                                almacen: resultado['Almacen'],
                                disponible: resultado['Disponible'],
                                comprometido: resultado['Comprometido'],
                                pedido: resultado['Pedido'],
                                optimo: resultado['Optimo']
                            });
                            //}
                            deferred.resolve(stock);
                        } else {
                            deferred.resolve('0');
                        }
                    })
                            .error(function (msg, code) {

                                deferred.resolve('0');
                            });
                    return deferred.promise;
                }, updateItemDeshabilitar: function (item) {
                    var resultado = '';
                    var deferedleg = $q.defer();
                    var promise = deferedleg.promise;
                    var query = "UPDATE ok1_ite SET Sincronizado = '-2' WHERE EntryItemMovil=" + item.entryItemMovil;
                    console.log('consulta: ' + query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            deferedleg.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            deferedleg.resolve('0');
                            console.log(' no es posible resolver la promesa');
                        }
                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, postArticulos: function (articulo) {
                    var resultado = '';
                    var defered = $q.defer();
                    var promise = defered.promise;

                    var query = "INSERT INTO ok1_art (EntryPerfilWeb,EntryArticuloCosto,GrupoArticuloCodigo,\n\
                                GrupoArticuloNombre,ArticuloCodigo,ArticuloNombre,ArticuloFrgnNombre,\n\
                                ArticuloTipo,EntryPerfilMovil) VALUES ('" + articulo.DocEntryPerfil + "','"
                            + articulo.DocEntryItemGrupo + "','" + articulo.DocEntryGrupo + "','"
                            + articulo.U_GrpName + "','"
                            + articulo.U_ItemCode + "','" + articulo.U_ItemName + "','"
                            + articulo.U_FrgnName + "','" + articulo.U_InvntItem + "','"
                            + articulo.DocEntryPerfilMovil + "')";
                    var query = query.replace(/''/gi, null);
                    console.log(query);
                    $cordovaSQLite.execute(db, query).then(function (result) {
                        resultado = result.insertId;
                        try {
                            defered.resolve(resultado);
                            console.log('resolvió la promesa - insert' + resultado);
                        } catch (e) {
                            defered.resolve(e);
                            console.log(' no es posible resolver la promesa');
                        }

                    }, function (error) {
                        console.error(error);
                    });
                    return promise;
                }, deleteArticulos: function () {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "DELETE FROM ok1_art";

                    $cordovaSQLite.execute(db, query).then(function (result) {
                        try {
                            defered.resolve('1');
                            console.log('resolvió la promesa - delete resultado 1');
                        } catch (e) {
                            defered.resolve('');
                            console.log(' no es posible resolver la promesa 0');
                        }

                    }, function (error) {
                        console.error(error);
                    });

                    return promise;
                }, getItemsArticulosLite: function (art) {
                    var deferred = $q.defer();
                    var resultadoAux = "";
                    var articulos = null;
                    articulos = [];

                    var query = "SELECT DocEntryArt,EntryPerfilWeb,EntryArticuloCosto,GrupoArticuloCodigo,\n\
                                 GrupoArticuloNombre,ArticuloCodigo,ArticuloNombre,ArticuloFrgnNombre,\n\
                                    ArticuloTipo,EntryPerfilMovil FROM ok1_art WHERE\n\
                                     EntryPerfilWeb ='" + art.entryPerfilWeb + "' AND EntryArticuloCosto<>'0'";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                for (var i = 0; i < res.rows.length; i++) {                                   
                                    resultadoAux = res.rows.item(i);
                                    // if(!articulos.find(resultadoAux.ArticuloCodigo))
                                    articulos.push({
                                        entryPerfilWeb: resultadoAux['EntryPerfilWeb'],
                                        entryArticuloCosto: resultadoAux['EntryArticuloCosto'],
                                        grupoArticuloCodigo: resultadoAux['GrupoArticuloCodigo'],
                                        grupoArticuloNombre: resultadoAux['GrupoArticuloNombre'],
                                        articuloCodigo: resultadoAux['ArticuloCodigo'],
                                        articuloNombre: resultadoAux['ArticuloNombre'],
                                        articuloFrgnNombre: resultadoAux['ArticuloFrgnNombre'],
                                        articuloTipo: resultadoAux['ArticuloTipo'],
                                        entryPerfilMovil: art.entryPerfilWeb
                                    });
                                }
                                deferred.resolve(articulos);
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).entryFactMovil);
                            } catch (e) {
                                deferred.resolve(e);
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                        }
                    }, function (err) {
                        console.error(err);
                    });
                    return deferred.promise;
                }, getArticuloF: function (articulo) {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var query = "SELECT * FROM ok1_art WHERE articuloCodigo ='" + articulo + "'";
                    console.log(query);
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa if - get ' + res.rows.item(0).articuloCodigo);
                            } catch (e) {
                                defered.resolve('0');
                                console.log(' no es posible resolver la promesa if - get');
                            }
                        } else {
                            try {
                                defered.resolve(res.rows.item(0));
                                console.log('resolvió la promesa else - get' + res.rows.item(0));
                            } catch (e) {
                                defered.resolve(e);
                                console.log(' no es posible resolver la promesa else - get');
                            }
                        }

                    }, function (err) {
                        console.error(err);
                    });
                    return promise;
                }
            };
        })

        .factory('BlankFactory', [function () {

            }])

        .service('BlankService', [function () {

            }]);



