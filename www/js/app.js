// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db;

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova', 'pdf'])

        .run(function ($ionicPlatform, $cordovaSQLite, $rootScope) {
            $ionicPlatform.ready(function () {

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                if (window.cordova && window.SQLitePlugin) {
//                    window.plugins.sqlDB.copy("legalisapp.db", function () {
//                        console.log("Realizo la copia");
//                        db = $cordovaSQLite.openDB({name: 'legalisapp.db'});
//                    }, function (error) {
//                        console.log("Ocurrio un error: " + error);
//                        db = $cordovaSQLite.openDB({name: 'legalisapp.db', location: 'default'});
//                    });

                    db = $cordovaSQLite.openDB({name: 'legalisapp.db', location: 'default'});

                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_comp (Sincronizado INTEGER, Company TEXT PRIMARY KEY, CodigoVerificacion TEXT, Nombre TEXT,Usuario TEXT, Nit TEXT)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_grupo_gto (Sincronizado INTEGER, IdGrupo INTEGER PRIMARY KEY, NombreGrupo TEXT, Company TEXT,IdGrupoWeb TEXT,IdGrupoSAP TEXT)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_tipo_gto (Sincronizado INTEGER,TipoGasto INTEGER,Descripcion TEXT,Cuenta TEXT,Company TEXT,ExigeCampo1 TEXT,ExigeCampo2 TEXT,ExigeCampo3 TEXT,NombreCampo1 TEXT,NombreCampo2 TEXT,NombreCampo3 TEXT,TipoCampo1 TEXT,TipoCampo2 TEXT,TipoCampo3 TEXT,PRIMARY KEY(TipoGasto), CONSTRAINT fk_tipo_gto_comp FOREIGN KEY(Company) REFERENCES ok1_comp (Company) ON DELETE RESTRICT ON UPDATE CASCADE)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_perf (Sincronizado INTEGER, EntryPerfilMovil INTEGER PRIMARY KEY AUTOINCREMENT, EntryPerfilWeb INTEGER, DocPerfil TEXT, Perfil TEXT, EmailPerfil TEXT, Proyecto TEXT, SN TEXT, Company TEXT, Aprobador TEXT, Dimension1 TEXT, Dimension2 TEXT, Dimension3 TEXT, Dimension4 TEXT, Dimension5 TEXT, Habilitado INTEGER, FechaSincronizacion TEXT, CONSTRAINT fk_perf_comp FOREIGN KEY(Company) REFERENCES ok1_comp(Company) ON DELETE RESTRICT ON UPDATE CASCADE)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_leg (Sincronizado INTEGER, EntryLegMovil INTEGER PRIMARY KEY AUTOINCREMENT, Cargado INTEGER, Descripcion TEXT, EntryPerfilMovil INTEGER, Estado INTEGER, FechaAutorizacion TEXT, FechaSincronizacion TEXT, IDLeg INTEGER, NoAprobacion INTEGER, Valor NUMERIC, EntryLegWeb INTEGER,  CONSTRAINT fk_leg_perf FOREIGN KEY(EntryPerfilMovil) REFERENCES ok1_perf(EntryPerfilMovil) ON DELETE RESTRICT ON UPDATE CASCADE)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_fact (Sincronizado INTEGER, EntryFactMovil INTEGER PRIMARY KEY AUTOINCREMENT, EntryPerfilMovil INTEGER, EntryLegMovil INTEGER, Fecha TEXT, IDLeg INTEGER, Valor NUMERIC, Moneda TEXT, Referencia TEXT, Documento TEXT, TipoDoc TEXT, Adjunto BLOB, LineLegSAP INTEGER, ComentarioLine TEXT, SubTotalSinImpuesto NUMERIC, SubTotalImpuesto NUMERIC, NombreSN TEXT, EntryFactWeb INTEGER,  CONSTRAINT fk_fact_perf FOREIGN KEY(EntryPerfilMovil) REFERENCES ok1_perf(EntryPerfilMovil) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_fact_leg FOREIGN KEY(EntryLegMovil) REFERENCES ok1_leg(EntryLegMovil) ON DELETE RESTRICT ON UPDATE CASCADE)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_gto (Sincronizado INTEGER, EntryGastoMovil INTEGER PRIMARY KEY AUTOINCREMENT, EntryFactMovil INTEGER, EntryLegMovil INTEGER, EntryPerfilMovil INTEGER, IdGasto INTEGER, Impuesto NUMERIC, Info1 TEXT, Info2 TEXT, Info3 TEXT, TipoGasto INTEGER, Valor NUMERIC, EntryGastoWeb INTEGER, Notas TEXT, CONSTRAINT fk_fact_tipgasto FOREIGN KEY(TipoGasto) REFERENCES ok1_tipo_gto(TipoGasto) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_fact_perf FOREIGN KEY(EntryPerfilMovil) REFERENCES ok1_perf(EntryPerfilMovil) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_fact_leg FOREIGN KEY(EntryLegMovil) REFERENCES ok1_leg(EntryLegMovil) ON DELETE RESTRICT ON UPDATE CASCADE)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_req (Sincronizado INTEGER, EntryReqMovil INTEGER PRIMARY KEY AUTOINCREMENT, Descripcion TEXT, EntryPerfilMovil INTEGER, Estado TEXT, FechaAutorizacion TEXT, FechaSincronizacion TEXT, IDReq INTEGER, NoAprobacion INTEGER,  EntryReqWeb INTEGER,  CONSTRAINT fk_leg_perf FOREIGN KEY(EntryPerfilMovil) REFERENCES ok1_perf(EntryPerfilMovil) ON DELETE RESTRICT ON UPDATE CASCADE)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_ite (Sincronizado INTEGER,EntryItemMovil INTEGER PRIMARY KEY AUTOINCREMENT,Descripcion TEXT,Tipo TEXT,ReqTipo TEXT,Fecha TEXT,CantidadSolicitada TEXT,CantidadAprobada TEXT,Proveedor TEXT, Almacen TEXT,CentroCosto TEXT,Proyecto TEXT, EntryReqMovil INTEGER, CONSTRAINT fk_ite_req FOREIGN KEY(EntryReqMovil) REFERENCES ok1_req(EntryReqMovil) ON DELETE RESTRICT ON UPDATE CASCADE)");
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_art (DocEntryArt INTEGER PRIMARY KEY AUTOINCREMENT,EntryPerfilWeb TEXT,EntryArticuloCosto TEXT,GrupoArticuloCodigo TEXT,GrupoArticuloNombre TEXT,ArticuloCodigo TEXT,ArticuloNombre TEXT,ArticuloFrgnNombre TEXT,ArticuloTipo TEXT,EntryPerfilMovil TEXT)");
                     

                    /*db.executeSql("SELECT CASE WHEN t1.sql like '%Grupo01%' THEN 1 ELSE 0 END AS columna FROM (SELECT sql FROM sqlite_master WHERE tbl_name = 'ok1_tipo_gto' AND type = 'table') t1", [], function (res) {
                        if (res.rows.length > 0) {
                            console.log('datos');
                            var columna = res.rows.item(0).columna;
                            console.log(columna);
                            if (Number(columna) === 0) {
                             */   
                              try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo01 INTEGER;");}catch (exp00) {console.log(exp00.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo02 INTEGER;");}catch (exp01) {console.log(exp01.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo03 INTEGER;");}catch (exp02) {console.log(exp02.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo04 INTEGER;");}catch (exp03) {console.log(exp03.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo05 INTEGER;");}catch (exp04) {console.log(exp04.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo06 INTEGER;");}catch (exp05) {console.log(exp05.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo07 INTEGER;");}catch (exp06) {console.log(exp06.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN Grupo08 INTEGER;");}catch (exp07) {console.log(exp07.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_tipo_gto ADD COLUMN ImpuestoSugerido INTEGER;");}catch (exp08) {console.log(exp08.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN EnviaRequisicion TEXT;");}catch (exp09) {console.log(exp09.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN AprobadorRequisicion TEXT;");}catch (exp10) {console.log(exp10.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN EntryPerfilWebAprobador INTEGER;");}catch (exp17) {console.log(exp17.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN EntryPerfilMovilAprobador INTEGER;");}catch (exp18) {console.log(exp18.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN DimensionSap TEXT;");}catch (exp11) {console.log(exp11.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN AlmacenSap TEXT;");}catch (exp12) {console.log(exp12.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN ProyectoSap TEXT;");}catch (exp13) {console.log(exp13.message);}
                                try{ $cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD COLUMN IdGrupo INTEGER;");}catch (exp14) {console.log(exp14.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_perf ADD CONSTRAINT fk_perf_grupo FOREIGN KEY (IdGrupo) REFERENCES ok1_grupo_gto(IdGrupo)");}catch (exp15) {console.log(exp15.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_ite ADD COLUMN Articulo TEXT;");}catch (exp16) {console.log(exp16.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_ite ADD COLUMN ArticuloCodigo TEXT;");}catch (exp19) {console.log(exp19.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_ite ADD COLUMN ArticuloNombre TEXT;");}catch (exp20) {console.log(exp20.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_ite ADD COLUMN EntryItemMovilCreador TEXT;");}catch (exp23) {console.log(exp23.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_req ADD COLUMN EntryPerfilWebCreador TEXT;");}catch (exp21) {console.log(exp21.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_req ADD COLUMN PerfilCreadorReq TEXT;");}catch (exp22) {console.log(exp22.message);}
                                 try{$cordovaSQLite.execute(db, "ALTER TABLE ok1_comp ADD COLUMN NombreCompany TEXT;");}catch (exp24) {console.log(exp24.message);}
                                 console.log('agrego columnas');
                          /*  } else {
                                console.log('columnas existentes');
                            }
                        }
                    });*/

                    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_comp");
                    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_tipo_gto");
                    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS  ok1_leg_confmovil");
//                    $cordovaSQLite.execute(db, "DROP TABLE ok1_gto");
//                    $cordovaSQLite.execute(db, "DROP TABLE ok1_fact");
//                    $cordovaSQLite.execute(db, "DROP TABLE ok1_leg ");
//                    $cordovaSQLite.execute(db, "DROP TABLE ok1_perf ");

//db.executeSql("update  ok1_tipo_gto set ExigeCampo1= '1',  ExigeCampo2= '0',  ExigeCampo3= '0' where TipoGasto= 50");
//db.executeSql("update  ok1_leg set Estado= 'aprobado'  where EntryLegMovil= 1");
//db.executeSql("delete from ok1_perf where DocPerfil = '12389' or DocPerfil = '75107935'");
//db.executeSql("delete from ok1_gto");
//db.executeSql("delete from ok1_fact");
//db.executeSql("delete from ok1_leg");
//db.executeSql("delete from ok1_comp");
//db.executeSql("update ok1_perf set EntryPerfilWeb = 4 where Sincronizado=0");
                    db.executeSql("select * from ok1_tipo_gto", [], function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {
                                console.log(res.rows.item(i));
                            }
                        }
                    });


                    var query = "SELECT Company FROM ok1_comp WHERE Company='1'";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro comp if");
                        } else {
                            db.executeSql("INSERT INTO ok1_comp (`Sincronizado`, `Company`,`CodigoVerificacion`, `Nombre`, `Nit`)  VALUES ('1','1','000000','Demo', '1');");
                            console.log("entro comp else");
                        }
                    });

                    var query = "SELECT TipoGasto FROM ok1_tipo_gto WHERE TipoGasto=1";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro tipoGto 1 if");
                        } else {
                            db.executeSql("INSERT INTO ok1_tipo_gto (`Sincronizado`, `TipoGasto`,`Descripcion`, `NombreCampo1`, `TipoCampo1`, `ExigeCampo1`, `NombreCampo2`, `TipoCampo2`,`ExigeCampo2`, `NombreCampo3`, `TipoCampo3`, `ExigeCampo3`, `Company`) VALUES ('1','1','Transporte','informacion 01', '1','0','informacion 02', '1','0','informacion 03','1','0','1');");
                            console.log("entro tipoGto 1 else");
                        }
                    });
                    var query = "SELECT TipoGasto FROM ok1_tipo_gto WHERE TipoGasto=2";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro tipoGto 2 if");
                        } else {
                            db.executeSql("INSERT INTO ok1_tipo_gto (`Sincronizado`, `TipoGasto`,`Descripcion`, `NombreCampo1`, `TipoCampo1`, `ExigeCampo1`, `NombreCampo2`, `TipoCampo2`,`ExigeCampo2`, `NombreCampo3`, `TipoCampo3`, `ExigeCampo3`, `Company`) VALUES ('1','2','Alimentación','informacion 01', '1','0','informacion 02', '1','0','informacion 03', '1','0','1');");
                            console.log("entro tipoGto 2 else");
                        }
                    });
                    var query = "SELECT TipoGasto FROM ok1_tipo_gto WHERE TipoGasto=3";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro tipoGto 3 if");
                        } else {
                            db.executeSql("INSERT INTO ok1_tipo_gto (`Sincronizado`, `TipoGasto`,`Descripcion`, `NombreCampo1`, `TipoCampo1`, `ExigeCampo1`, `NombreCampo2`, `TipoCampo2`,`ExigeCampo2`, `NombreCampo3`, `TipoCampo3`, `ExigeCampo3`, `Company`) VALUES ('1','3','Hospedaje','informacion 01', '1','0','informacion 02', '1','0','informacion 03', '1','0','1');");
                            console.log("entro tipoGto 3 else");
                        }
                    });
                    var query = "SELECT EntryPerfilWeb FROM ok1_perf WHERE EntryPerfilWeb=1";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro perfil if");
                        } else {
                            db.executeSql("INSERT INTO ok1_perf (`Sincronizado`, `DocPerfil`,`Perfil`,`EntryPerfilWeb`,`EmailPerfil`,`Proyecto`,`Company`,`Aprobador`,`Dimension1`,`Dimension2`,`Dimension3`,`Dimension4`,`Dimension5`, `Habilitado`) VALUES ('1','1','Demo','1','crojas@consensussa.com', '1','1','crojas@consensussa.com', '000000','1','0', '0','0', '1');");
                            console.log("entro perfil if");
                        }
                    });
                    var query = "SELECT FechaSincronizacion FROM ok1_perf  ORDER BY 1 DESC LIMIT 1";
                    db.executeSql(query, [], function (res) {
                        console.log(res.rows.item(0));
                        if (res.rows.length > 0) {
                            $rootScope.datos = {
                                fecha: res.rows.item(0).FechaSincronizacion};
                        }
                    });


                    var queryw = "SELECT * FROM ok1_grupo_gto";
                    db.executeSql(queryw, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro grupoGto  if");
                            for (var i = 0; i < res.rows.length; i++) {
                                console.log(res.rows.item(i));
                            }
                        } else {
                            console.log("entro grupoGto  else");
                        }
                    });

                    var queryy = "SELECT * FROM ok1_tipo_gto";
                    db.executeSql(queryy, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro grupoGto  if");
                            for (var i = 0; i < res.rows.length; i++) {
                                console.log(res.rows.item(i));
                            }
                        } else {
                            console.log("entro grupoGto  else");
                        }
                    });


     var query = "SELECT * FROM ok1_perf";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro prueba if");
                            for(var i=0;i<res.rows.length;i++){
                            console.log(res.rows.item(i));
                            }
                        } else {
                             console.log("entro prueba else");
                        }
                    });
                    
                     var query = "SELECT * FROM ok1_req";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro prueba if");
                            for(var i=0;i<res.rows.length;i++){
                            console.log(res.rows.item(i));
                            }
                        } else {
                             console.log("entro prueba else");
                        }
                    });
                    
                            var query = "SELECT * FROM ok1_leg";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro prueba leg if");
                            for(var i=0;i<res.rows.length;i++){
                            console.log(res.rows.item(i));
                            }
                        } else {
                             console.log("entro prueba leg else");
                        }
                    });
                    
                        var query = "SELECT * FROM ok1_art";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro prueba art if");
                            for(var i=0;i<res.rows.length;i++){
                            console.log(res.rows.item(i));
                            }
                        } else {
                             console.log("entro prueba art else");
                        }
                    });
                    
                     var query = "SELECT EntryArticuloCosto FROM ok1_art WHERE EntryArticuloCosto='0'";
                    db.executeSql(query, [], function (res) {
                        if (res.rows.length > 0) {
                            console.log("entro tipoGto 1 if");
                        } else {
                            db.executeSql("INSERT INTO ok1_art (EntryPerfilWeb,EntryArticuloCosto,GrupoArticuloCodigo,GrupoArticuloNombre,ArticuloCodigo,ArticuloNombre,ArticuloFrgnNombre,ArticuloTipo,EntryPerfilMovil) VALUES ('0','0','0','N-A','0','N-A','N-A','Y','0');");
                            db.executeSql("INSERT INTO ok1_art (EntryPerfilWeb,EntryArticuloCosto,GrupoArticuloCodigo,GrupoArticuloNombre,ArticuloCodigo,ArticuloNombre,ArticuloFrgnNombre,ArticuloTipo,EntryPerfilMovil) VALUES ('0','0','0','N-A','0','N-A','N-A','N','0');");
                            console.log("entro art N-A else");
                        }
                    });
//db.executeSql("update ok1_leg set Valor = 0");
//db.executeSql("UPDATE ok1_ite SET Sincronizado = 0");
//db.executeSql("UPDATE ok1_ite SET Sincronizado = '0'");

//db.executeSql("delete from ok1_gto;");
//db.executeSql("delete from ok1_fact;");
//db.executeSql("delete from ok1_leg;");

//db.executeSql("delete from ok1_ite where entryReqMovil IN (SELECT entryReqMovil from ok1_req where lower(estado)='aprobacion')");
//db.executeSql("delete from ok1_req where lower(estado)='aprobacion'");

//db.executeSql("INSERT INTO ok1_tipo_gto (`Sincronizado`, `TipoGasto`,`Descripcion`) VALUES ('1','1','Transporte');");
//db.executeSql("INSERT INTO ok1_tipo_gto (`Sincronizado`, `TipoGasto`,`Descripcion`) VALUES ('2','2','Comida');");
//db.executeSql("INSERT INTO ok1_tipo_gto (`Sincronizado`, `TipoGasto`,`Descripcion`) VALUES ('3','3','Hospedaje');");
//db.executeSql("INSERT INTO ok1_comp  VALUES ('1','1','1','Consensus', 'UserConsensus');");



                } else {
                    db = window.openDatabase('legalisapp', '1.0', 'legalisapp.db', 100 * 1024 * 1024);
                }


            });
        });