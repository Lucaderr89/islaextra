/* ==========================================================================
   Isla Extra - Demo dataset
   Datos de demostracion. Nombres de personas y de negocios inventados.
   Las zonas son reales (Eivissa / Formentera).
   ========================================================================== */

const IE_DATA = (function () {

  /* --- Zonas reales + adyacencia -----------------------------------------
     'near' = zonas a distancia razonable de desplazamiento en la isla.
     Formentera y Eivissa nunca son adyacentes entre si.                     */
  const ZONES = [
    { id:'eivissa',      name:'Eivissa / Marina',        island:'ibiza',
      near:['figueretes','talamanca','bossa','santjordi','santrafel'] },
    { id:'figueretes',   name:'Figueretes',              island:'ibiza',
      near:['eivissa','bossa','talamanca'] },
    { id:'bossa',        name:"Platja d'en Bossa",       island:'ibiza',
      near:['eivissa','figueretes','santjordi'] },
    { id:'talamanca',    name:'Talamanca',               island:'ibiza',
      near:['eivissa','figueretes'] },
    { id:'santantoni',   name:'Sant Antoni de Portmany', island:'ibiza',
      near:['caladebou','santrafel','santjosep'] },
    { id:'caladebou',    name:'Cala de Bou',             island:'ibiza',
      near:['santantoni','santjosep'] },
    { id:'santaeularia', name:'Santa Eulària des Riu',   island:'ibiza',
      near:['escanar','santjoan','santrafel'] },
    { id:'escanar',      name:'Es Canar',                island:'ibiza',
      near:['santaeularia','santjoan'] },
    { id:'santjosep',    name:'Sant Josep de sa Talaia', island:'ibiza',
      near:['santjordi','caladebou','santantoni','bossa'] },
    { id:'santjordi',    name:'Sant Jordi',              island:'ibiza',
      near:['eivissa','bossa','santjosep'] },
    { id:'santrafel',    name:'Sant Rafel',              island:'ibiza',
      near:['eivissa','santantoni','santaeularia','santjoan'] },
    { id:'santjoan',     name:'Sant Joan de Labritja',   island:'ibiza',
      near:['santaeularia','escanar','santrafel'] },
    { id:'santfrancesc', name:'Sant Francesc Xavier',    island:'formentera',
      near:['espujols','lasavina','santferran'] },
    { id:'espujols',     name:'Es Pujols',               island:'formentera',
      near:['santfrancesc','santferran','lasavina'] },
    { id:'lasavina',     name:'La Savina',               island:'formentera',
      near:['santfrancesc','espujols'] },
    { id:'santferran',   name:'Sant Ferran',             island:'formentera',
      near:['espujols','santfrancesc'] }
  ];

  /* --- Sectores y puestos ------------------------------------------------ */
  const SECTORS = [
    { id:'hosteleria', key:'sector_hosteleria' },
    { id:'alojamiento',key:'sector_alojamiento'},
    { id:'mantenimiento',key:'sector_mantenimiento'},
    { id:'nautica',    key:'sector_nautica'   },
    { id:'eventos',    key:'sector_eventos'   },
    { id:'logistica',  key:'sector_logistica' }
  ];

  const ROLES = [
    /* hosteleria */
    { id:'camarero',     sector:'hosteleria', key:'role_camarero',     icon:'tray'  },
    { id:'barman',       sector:'hosteleria', key:'role_barman',       icon:'glass' },
    { id:'cocinero',     sector:'hosteleria', key:'role_cocinero',     icon:'pan'   },
    { id:'ayudante',     sector:'hosteleria', key:'role_ayudante',     icon:'knife' },
    { id:'friegaplatos', sector:'hosteleria', key:'role_friegaplatos', icon:'plate' },
    /* hoteles y villas */
    { id:'recepcion',    sector:'alojamiento',key:'role_recepcion',    icon:'bell'  },
    { id:'limpieza',     sector:'alojamiento',key:'role_limpieza',     icon:'spray' },
    { id:'housekeeping', sector:'alojamiento',key:'role_housekeeping', icon:'bed'   },
    { id:'conserje',     sector:'alojamiento',key:'role_conserje',     icon:'key'   },
    /* mantenimiento */
    { id:'electricista', sector:'mantenimiento',key:'role_electricista',icon:'bolt' },
    { id:'fontanero',    sector:'mantenimiento',key:'role_fontanero',  icon:'drop'  },
    { id:'jardinero',    sector:'mantenimiento',key:'role_jardinero',  icon:'leaf'  },
    { id:'mantenimiento',sector:'mantenimiento',key:'role_mantenimiento',icon:'wrench'},
    { id:'piscinero',    sector:'mantenimiento',key:'role_piscinero',  icon:'wave'  },
    /* nautica */
    { id:'patron',       sector:'nautica',    key:'role_patron',       icon:'anchor'},
    { id:'marinero',     sector:'nautica',    key:'role_marinero',     icon:'rope'  },
    { id:'azafata_barco',sector:'nautica',    key:'role_azafata_barco',icon:'tray'  },
    { id:'limpieza_barco',sector:'nautica',   key:'role_limpieza_barco',icon:'spray'},
    /* eventos y noche */
    { id:'pr',           sector:'eventos',    key:'role_pr',           icon:'mic'   },
    { id:'azafata',      sector:'eventos',    key:'role_azafata',      icon:'star'  },
    { id:'seguridad',    sector:'eventos',    key:'role_seguridad',    icon:'shieldline'},
    { id:'tecnico',      sector:'eventos',    key:'role_tecnico',      icon:'sound' },
    { id:'runner',       sector:'eventos',    key:'role_runner',       icon:'run'   },
    { id:'montaje',      sector:'eventos',    key:'role_montaje',      icon:'box'   },
    /* logistica */
    { id:'chofer',       sector:'logistica',  key:'role_chofer',       icon:'van'   },
    { id:'rider',        sector:'logistica',  key:'role_rider',        icon:'bike'  },
    { id:'mozo',         sector:'logistica',  key:'role_mozo',         icon:'box'   },
    { id:'almacen',      sector:'logistica',  key:'role_almacen',      icon:'shelf' }
  ];

  /* --- Negocios (nombres de fantasia, zonas reales) ---------------------- */
  const COMPANIES = [
    { id:'c1',  name:'Restaurant Can Marí',     zone:'santaeularia', type:'restaurant', rating:4.8, hires:34 },
    { id:'c2',  name:'Chiringuito Sa Platgeta', zone:'bossa',        type:'beach',      rating:4.6, hires:51 },
    { id:'c3',  name:'Hotel Cala Roja',         zone:'santantoni',   type:'hotel',      rating:4.7, hires:88 },
    { id:'c4',  name:'Bar Ses Roques',          zone:'eivissa',      type:'bar',        rating:4.4, hires:27 },
    { id:'c5',  name:'Sa Figuera Blanca',       zone:'santjosep',    type:'restaurant', rating:4.9, hires:19 },
    { id:'c6',  name:'Beach Club Marés',        zone:'talamanca',    type:'beach',      rating:4.5, hires:63 },
    { id:'c7',  name:'Ca na Pepa',              zone:'santfrancesc', type:'restaurant', rating:4.8, hires:22 },
    { id:'c8',  name:"Es Racó d'en Pep",        zone:'espujols',     type:'restaurant', rating:4.6, hires:30 },
    { id:'c9',  name:'Villa Es Vedranell',      zone:'santjosep',    type:'villa',      rating:4.7, hires:12 },
    { id:'c10', name:"Bodega Ca n'Aleix",       zone:'santrafel',    type:'bar',        rating:4.3, hires:15 },
    { id:'c11', name:'Jardins de Portmany',     zone:'caladebou',    type:'servicios',  rating:4.5, hires:9  },
    { id:'c12', name:'Serveis Tècnics Eivissa', zone:'eivissa',      type:'servicios',  rating:4.6, hires:17 },
    { id:'c13', name:'Forn de Sant Rafel',      zone:'santrafel',    type:'restaurant', rating:4.4, hires:11 },
    { id:'c14', name:'Hostal Sa Barqueta',      zone:'lasavina',     type:'hotel',      rating:4.5, hires:25 },
    { id:'c15', name:'Terrassa Es Molinar',     zone:'figueretes',   type:'restaurant', rating:4.5, hires:20 },
    { id:'c16', name:'Apartaments Cala Nova',   zone:'escanar',      type:'hotel',      rating:4.3, hires:41 },
    { id:'c17', name:'Celler Sant Jordi',       zone:'santjordi',    type:'bar',        rating:4.6, hires:16 },
    { id:'c18', name:'Finca Ca na Xica',        zone:'santjoan',     type:'villa',      rating:4.8, hires:8  }
  ];

  /* --- Trabajadores ------------------------------------------------------
     avail: 'dow:HHMM-HHMM' separados por coma. dow 0=domingo ... 6=sabado
     Horario real de disponibilidad; si la hora final es menor que la
     inicial, el turno cruza la medianoche.
     skills: 'id' | 'id!' confirmada en el trabajo | 'id?' en revision       */

  const RAW = [
    ['w1','Marco C.',      ['camarero','barman'],        ['santaeularia','escanar','eivissa','santjoan'],       'certified',96,48,100,{es:'C1',en:'B2',it:'C2'},['coctel!','bandeja!','tpv'],        '0:1900-0100,2:1900-0100,3:1900-0100,4:1900-0100,5:1900-0100,6:1900-0100','c1'],
    ['w2','Ana R.',        ['camarero','recepcion'],     ['santantoni','caladebou','santjosep'],                'certified',94,61, 98,{es:'C2',en:'C1',it:'A2'},['sala!','tpv!'],                    '1:2000-0200,3:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c3'],
    ['w3','Luis F.',       ['ayudante','friegaplatos'],  ['bossa','figueretes','eivissa','santjordi'],          'verified', 71, 6, 83,{es:'C2',en:'A2'},        ['cocinafria'],                      '1:1730-2330,3:1730-2330,4:1730-2330,5:1730-2330,6:1730-2330','c2'],
    ['w4','Sofia B.',      ['cocinero'],                 ['santjosep','santjordi','bossa'],                     'certified',92,37,100,{es:'B2',en:'B1',it:'C2'},['partida!','alergenos!'],           '0:2000-0200,2:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c5'],
    ['w5','Diego M.',      ['camarero'],                 ['espujols','santfrancesc','lasavina','santferran'],   'proven',   85,14, 93,{es:'C2',en:'B1'},        ['bandeja!','ingles_sala?'],         '0:2100-0300,3:2100-0300,4:2100-0300,5:2100-0300,6:2100-0300','c8'],
    ['w6','Elena V.',      ['limpieza'],                 ['santjosep','caladebou','santantoni'],                'certified',90,52, 99,{es:'C2',en:'A1'},        ['pisos!','lavanderia!'],            '1:0800-1500,2:0800-1500,3:0800-1500,4:0800-1500,5:0800-1500','c3'],
    ['w7','Tomás H.',      ['electricista','mantenimiento'],['eivissa','santrafel','santjordi','bossa'],        'certified',95,29,100,{es:'C2',en:'B1'},        ['baja_tension!','climatizacion!'],  '1:0900-1600,2:0900-1600,3:0900-1600,4:0900-1600,6:0900-1600','c12'],
    ['w8','Nadia K.',      ['barman','camarero'],        ['bossa','figueretes','eivissa'],                      'proven',   88,19, 95,{es:'B2',en:'C1',it:'B1'},['coctel!','tpv'],                   '0:2030-0230,2:2030-0230,4:2030-0230,5:2030-0230,6:2030-0230','c2'],
    ['w9','Pau S.',        ['jardinero','mantenimiento'],['santjosep','santjoan','santaeularia','santrafel'],   'proven',   82,11, 91,{es:'C2',en:'A2'},        ['poda!','riego'],                   '2:0800-1400,3:0800-1400,4:0800-1400,5:0800-1400,6:0800-1400','c11'],
    ['w10','Giulia T.',    ['camarero'],                 ['eivissa','talamanca','figueretes'],                  'verified', 74, 4,100,{es:'B1',en:'B2',it:'C2'},['sala'],                            '0:2100-0300,3:2100-0300,4:2100-0300,5:2100-0300,6:2100-0300','c4'],
    ['w11','Rachid A.',    ['friegaplatos','ayudante'],  ['santantoni','caladebou','santjosep'],                'proven',   86,23,100,{es:'B2',en:'A2'},        ['cocinafria!'],                     '1:1800-0000,2:1800-0000,3:1800-0000,4:1800-0000,6:1800-0000','c3'],
    ['w12','Carla P.',     ['recepcion','camarero'],     ['santaeularia','escanar','santjoan'],                 'certified',93,41, 98,{es:'C2',en:'C1',it:'B2'},['pms!','sala!'],                    '1:1500-2300,2:1500-2300,4:1500-2300,5:1500-2300,6:1500-2300','c1'],
    ['w13','Iván L.',      ['cocinero','ayudante'],      ['espujols','santferran','santfrancesc'],              'proven',   84,17, 94,{es:'C2',en:'B1',it:'A2'},['partida!','alergenos'],            '1:1730-2330,3:1730-2330,4:1730-2330,5:1730-2330,6:1730-2330','c8'],
    ['w14','Marta O.',     ['limpieza'],                 ['espujols','lasavina','santfrancesc','santferran'],   'proven',   87,26, 97,{es:'C2'},                ['pisos!'],                          '2:0800-1400,3:0800-1400,4:0800-1400,5:0800-1400,6:0800-1400','c14'],
    ['w15','Kevin D.',     ['camarero','friegaplatos'],  ['bossa','santjordi','figueretes'],                    'verified', 68, 3, 67,{es:'B1',en:'B2'},        ['bandeja'],                         '0:2100-0300,3:2100-0300,4:2100-0300,5:2100-0300,6:2100-0300','c2'],
    ['w16','Lucía G.',     ['barman'],                   ['santantoni','caladebou','santjosep'],                'certified',91,44, 99,{es:'C2',en:'B2'},        ['coctel!','barra_volumen!'],        '0:1900-0100,2:1900-0100,3:1900-0100,4:1900-0100,5:1900-0100,6:1900-0100','c3'],
    ['w17','Andrés N.',    ['mantenimiento','electricista'],['santaeularia','santjoan','escanar','santrafel'],  'proven',   83,13, 92,{es:'C2'},                ['fontaneria!','baja_tension?'],     '1:0900-1600,2:0900-1600,3:0900-1600,4:0900-1600,6:0900-1600','c12'],
    ['w18','Chiara F.',    ['camarero','recepcion'],     ['talamanca','eivissa','figueretes','bossa'],          'proven',   89,21,100,{es:'B2',en:'C1',it:'C2'},['sala!','tpv!'],                    '0:2030-0230,2:2030-0230,4:2030-0230,5:2030-0230,6:2030-0230','c6'],
    ['w19','Óscar B.',     ['cocinero'],                 ['eivissa','santjordi','bossa','figueretes'],          'certified',97,73,100,{es:'C2',en:'B1'},        ['partida!','jefe_partida!','alergenos!'],'0:2000-0200,2:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c4'],
    ['w20','Yasmin E.',    ['limpieza','ayudante'],      ['bossa','figueretes','santjordi','eivissa'],          'verified', 76, 7, 86,{es:'B2',en:'A2'},        ['pisos'],                           '1:1000-1700,3:1000-1700,4:1000-1700,5:1000-1700,6:1000-1700','c6'],
    ['w21','Bruno R.',     ['barman','camarero'],        ['santaeularia','escanar','santjoan','santrafel'],     'proven',   85,16, 94,{es:'C1',en:'B2',it:'C2'},['coctel','bandeja!'],               '0:1900-0100,2:1900-0100,3:1900-0100,4:1900-0100,5:1900-0100,6:1900-0100','c1'],
    ['w22','Aitana M.',    ['camarero'],                 ['santjosep','caladebou','santantoni','santjordi'],    'proven',   88,24, 96,{es:'C2',en:'B2'},        ['sala!','vinos'],                   '1:2000-0200,3:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c5'],
    ['w23','Jordi V.',     ['jardinero'],                ['santjoan','santaeularia','santrafel','escanar'],     'certified',90,31,100,{es:'C2',en:'A2'},        ['poda!','riego!'],                  '1:0730-1430,2:0730-1430,4:0730-1430,5:0730-1430,6:0730-1430','c11'],
    ['w24','Noa S.',       ['ayudante','camarero'],      ['espujols','santferran','santfrancesc','lasavina'],   'verified', 72, 5, 80,{es:'C2',en:'B1',it:'B1'},['cocinafria'],                      '0:2000-0200,2:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c8'],
    ['w25','Hugo T.',      ['recepcion'],                ['santantoni','caladebou','bossa','santjosep'],        'proven',   86,18, 97,{es:'C2',en:'C1',it:'A2'},['pms!'],                            '1:0700-1500,2:0700-1500,3:0700-1500,5:0700-1500,6:0700-1500','c3'],
    ['w26','Valeria I.',   ['cocinero','ayudante'],      ['santaeularia','escanar','santjoan'],                 'proven',   87,20, 95,{es:'B2',en:'A2',it:'C2'},['partida!','alergenos!'],           '1:1800-0000,2:1800-0000,3:1800-0000,4:1800-0000,6:1800-0000','c1'],
    ['w27','Said B.',      ['friegaplatos','ayudante'],  ['eivissa','figueretes','bossa','talamanca'],          'proven',   84,22, 98,{es:'B2',en:'A2'},        ['cocinafria!'],                     '2:1900-0100,3:1900-0100,4:1900-0100,5:1900-0100,6:1900-0100','c15'],
    ['w28','Paula N.',     ['camarero','barman'],        ['santjordi','bossa','santjosep','eivissa'],           'certified',92,39, 99,{es:'C2',en:'B2',it:'B1'},['bandeja!','coctel!','tpv!'],       '0:2030-0230,2:2030-0230,4:2030-0230,5:2030-0230,6:2030-0230','c17'],
    ['w29','Mihai P.',     ['mantenimiento'],            ['santantoni','caladebou','santjosep','santrafel'],    'proven',   85,19, 96,{es:'B2',en:'A2'},        ['fontaneria!','climatizacion'],     '2:0800-1400,3:0800-1400,4:0800-1400,5:0800-1400,6:0800-1400','c11'],
    ['w30','Irene S.',     ['limpieza'],                 ['eivissa','talamanca','figueretes','bossa'],          'proven',   88,28, 98,{es:'C2',en:'A2'},        ['pisos!','lavanderia'],             '1:1000-1700,3:1000-1700,4:1000-1700,5:1000-1700,6:1000-1700','c6'],
    ['w31','Toni R.',      ['electricista'],             ['santaeularia','santjoan','escanar','santrafel'],     'certified',94,26,100,{es:'C2',en:'B1'},        ['baja_tension!','climatizacion!'],  '1:0800-1500,2:0800-1500,3:0800-1500,4:0800-1500,5:0800-1500','c1'],
    ['w32','Fatou D.',     ['camarero','friegaplatos'],  ['santantoni','caladebou'],                            'verified', 75, 8, 88,{es:'B1',en:'B2',it:'A2'},['bandeja'],                         '1:2000-0200,3:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c3'],
    ['w33','Alberto Q.',   ['cocinero'],['santantoni','caladebou','santjosep'],               'certified',93,55,100,{es:'C2',en:'B2'},        ['partida!','jefe_partida!'],        '1:1730-2330,3:1730-2330,4:1730-2330,5:1730-2330,6:1730-2330','c3'],
    ['w34','Rita M.',      ['recepcion','camarero'],     ['espujols','santfrancesc','lasavina'],                'proven',   86,17, 96,{es:'C2',en:'C1',it:'C2'},['pms!','sala'],                     '1:1400-2200,3:1400-2200,4:1400-2200,5:1400-2200,6:1400-2200','c14'],
    ['w35','Nico F.',      ['barman'],                   ['eivissa','figueretes','talamanca','bossa'],          'proven',   87,25, 97,{es:'C1',en:'B2',it:'C2'},['coctel!','barra_volumen!'],        '0:2100-0300,3:2100-0300,4:2100-0300,5:2100-0300,6:2100-0300','c4'],
    ['w36','Gemma T.',     ['jardinero','mantenimiento'],['eivissa','santjordi','santjosep','bossa'],           'proven',   84,14, 93,{es:'C2',en:'A2'},        ['poda!','riego!'],                  '1:0800-1500,2:0800-1500,3:0800-1500,4:0800-1500,5:0800-1500','c12'],
    ['w37','Omar L.',      ['ayudante','friegaplatos'],  ['santaeularia','escanar','santjoan'],                 'verified', 73, 6, 85,{es:'B2'},                ['cocinafria'],                      '2:1900-0100,3:1900-0100,4:1900-0100,5:1900-0100,6:1900-0100','c1'],
    ['w38','Silvia C.',    ['limpieza','recepcion'],     ['santaeularia','escanar','santjoan','santrafel'],     'certified',91,47, 99,{es:'C2',en:'B1',it:'B2'},['pisos!','lavanderia!','pms'],      '1:0730-1430,2:0730-1430,4:0730-1430,5:0730-1430,6:0730-1430','c16'],
    ['w39','Jonas W.',     ['camarero'],                 ['santfrancesc','espujols','santferran'],              'proven',   85,15, 95,{es:'B1',en:'C2',it:'B1'},['sala!','vinos'],                   '1:1930-0130,2:1930-0130,3:1930-0130,5:1930-0130,6:1930-0130','c7'],
    ['w40','Cristina A.',  ['cocinero','ayudante'],      ['santantoni','caladebou','santjosep','santrafel'],    'proven',   86,21, 96,{es:'C2',en:'A2'},        ['partida!','alergenos!'],           '1:1830-0030,2:1830-0030,4:1830-0030,5:1830-0030,6:1830-0030','c3'],
    ['w41','Éric B.',      ['mantenimiento','electricista'],['espujols','santfrancesc','lasavina','santferran'],'proven',   83,12, 92,{es:'B2',en:'B1'},        ['fontaneria!','baja_tension'],      '1:0800-1500,2:0800-1500,3:0800-1500,4:0800-1500,5:0800-1500','c14'],
    ['w42','Laia F.',      ['camarero','recepcion'],     ['santjosep','santjordi','caladebou','bossa'],         'proven',   87,23, 97,{es:'C2',en:'B2',it:'A2'},['sala!','tpv!'],                    '1:2000-0200,3:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c5'],
    ['w43','Pere J.',      ['jardinero'],                ['santfrancesc','espujols','lasavina','santferran'],   'proven',   82,10, 90,{es:'C2'},                ['poda!','riego'],                   '1:0730-1430,2:0730-1430,4:0730-1430,5:0730-1430,6:0730-1430','c7'],
    ['w44','Alina V.',     ['limpieza'],                 ['santantoni','caladebou','santjosep','santrafel'],    'proven',   85,20, 96,{es:'B2',en:'A2'},        ['pisos!'],                          '2:0800-1400,3:0800-1400,4:0800-1400,5:0800-1400,6:0800-1400','c3'],
    ['w45','Dani S.',      ['barman','camarero'],        ['santjosep','santjordi','bossa','caladebou'],         'verified', 77, 9, 89,{es:'C2',en:'B1'},        ['coctel','bandeja'],                '0:2100-0300,3:2100-0300,4:2100-0300,5:2100-0300,6:2100-0300','c17'],
    ['w46','Nuria E.',     ['friegaplatos'],             ['santaeularia','escanar','santjoan','santrafel'],     'proven',   84,18, 97,{es:'C2'},                ['cocinafria!'],                     '1:1800-0000,2:1800-0000,3:1800-0000,4:1800-0000,6:1800-0000','c1'],
    ['w47','Leo M.',       ['electricista','mantenimiento'],['santfrancesc','espujols','lasavina','santferran'],'certified',92,24,100,{es:'C2',en:'B2',it:'B1'},['baja_tension!','climatizacion!'],  '1:0900-1600,2:0900-1600,3:0900-1600,4:0900-1600,6:0900-1600','c8'],
    ['w48','Marina P.',    ['recepcion'],                ['eivissa','talamanca','figueretes','bossa'],          'certified',90,33, 99,{es:'C2',en:'C1',it:'B2'},['pms!'],                            '2:0900-1700,3:0900-1700,4:0900-1700,5:0900-1700,6:0900-1700','c6'],
    ['w49','Adrián C.',    ['ayudante','cocinero'],      ['eivissa','bossa','figueretes','santjordi'],          'verified', 74, 5, 84,{es:'C2',en:'A2'},        ['cocinafria'],                      '0:2000-0200,2:2000-0200,4:2000-0200,5:2000-0200,6:2000-0200','c15'],
    ['w51','Xavi B.',      ['patron','marinero'],          ['lasavina','santfrancesc','espujols'],               'certified',94,38,100,{es:'C2',en:'B2',it:'A2'},['nautica!','motor!'],               '1:0800-1800,2:0800-1800,3:0800-1800,4:0800-1800,5:0800-1800,6:0800-1800','c14'],
    ['w52','Nerea C.',     ['azafata_barco','camarero'],   ['lasavina','espujols','santfrancesc'],               'proven',   87,21, 97,{es:'C2',en:'C1',it:'B1'},['sala!','nautica'],                 '1:0900-1900,3:0900-1900,4:0900-1900,5:0900-1900,6:0900-1900','c14'],
    ['w53','Kiko M.',      ['marinero','limpieza_barco'],  ['eivissa','talamanca','figueretes'],                 'proven',   84,17, 95,{es:'C2',en:'A2'},        ['nautica!'],                        '1:0700-1500,2:0700-1500,3:0700-1500,4:0700-1500,5:0700-1500','c12'],
    ['w54','Alba R.',      ['limpieza_barco','limpieza'],  ['lasavina','santfrancesc'],                          'verified', 76, 8, 90,{es:'C2'},                ['pisos'],                           '1:0800-1400,2:0800-1400,4:0800-1400,5:0800-1400','c14'],
    ['w55','Dario P.',     ['patron'],                     ['eivissa','talamanca','bossa'],                      'certified',95,44,100,{es:'C1',en:'C1',it:'C2'},['nautica!','motor!'],               '2:0800-1800,3:0800-1800,4:0800-1800,5:0800-1800,6:0800-1800','c6'],
    ['w56','Ivan T.',      ['seguridad'],                  ['bossa','eivissa','figueretes'],                     'certified',92,51,100,{es:'C2',en:'B1'},        ['control_accesos!','primeros_aux!'], '4:2200-0600,5:2200-0600,6:2200-0600,0:2200-0600','c2'],
    ['w57','Marta S.',     ['azafata','pr'],               ['bossa','eivissa','santjordi'],                      'proven',   86,23, 96,{es:'C2',en:'C1',it:'B2'},['acogida!','idiomas!'],             '4:2000-0400,5:2000-0400,6:2000-0400,0:2000-0400','c2'],
    ['w58','Leo G.',       ['tecnico'],                    ['bossa','santjordi','eivissa'],                      'certified',93,29,100,{es:'C1',en:'B2'},        ['audio!','luces!'],                 '3:1600-0200,4:1600-0200,5:1600-0200,6:1600-0200','c17'],
    ['w59','Sonia V.',     ['runner','camarero'],          ['talamanca','eivissa','figueretes'],                 'proven',   83,15, 94,{es:'C2',en:'B1'},        ['bandeja!','ritmo!'],               '4:1900-0300,5:1900-0300,6:1900-0300,0:1900-0300','c6'],
    ['w60','Hakim B.',     ['montaje','mozo'],             ['santjordi','bossa','eivissa'],                      'proven',   85,26, 98,{es:'B2',en:'A2'},        ['carga!','montaje!'],               '1:0700-1600,2:0700-1600,3:0700-1600,4:0700-1600,5:0700-1600','c17'],
    ['w61','Rubén A.',     ['pr'],                         ['santantoni','caladebou','bossa'],                   'proven',   82,14, 92,{es:'C2',en:'B2',it:'B1'},['ventas!'],                         '4:2100-0500,5:2100-0500,6:2100-0500','c3'],
    ['w62','Cristina B.',  ['housekeeping','limpieza'],    ['santantoni','caladebou','santjosep'],               'certified',91,47, 99,{es:'C2',en:'A2'},        ['pisos!','lavanderia!','control!'],  '1:0800-1600,2:0800-1600,3:0800-1600,4:0800-1600,5:0800-1600','c3'],
    ['w63','Marco V.',     ['conserje','recepcion'],       ['eivissa','talamanca','santaeularia'],               'certified',90,35, 98,{es:'C2',en:'C1',it:'C2'},['pms!','concierge!'],               '1:1500-2300,2:1500-2300,3:1500-2300,5:1500-2300,6:1500-2300','c6'],
    ['w64','Toni F.',      ['fontanero','mantenimiento'],  ['santaeularia','escanar','santjoan'],                'certified',93,31,100,{es:'C2'},                ['fontaneria!','urgencias!'],        '1:0800-1700,2:0800-1700,3:0800-1700,4:0800-1700,5:0800-1700','c12'],
    ['w65','Jose L.',      ['piscinero','mantenimiento'],  ['santjosep','santjordi','caladebou'],                'proven',   86,22, 97,{es:'C2',en:'A2'},        ['piscinas!','quimica!'],            '1:0800-1500,2:0800-1500,3:0800-1500,4:0800-1500,5:0800-1500','c9'],
    ['w66','Andrea M.',    ['chofer'],                     ['eivissa','bossa','santjordi','talamanca'],          'certified',92,40,100,{es:'C2',en:'B2',it:'C2'},['btp!','vip!'],                     '1:0900-2100,2:0900-2100,4:0900-2100,5:0900-2100,6:0900-2100','c6'],
    ['w67','Samir K.',     ['rider','mozo'],               ['eivissa','figueretes','bossa'],                     'proven',   81,19, 93,{es:'B2',en:'A2'},        ['moto!'],                           '2:1800-0000,3:1800-0000,4:1800-0000,5:1800-0000,6:1800-0000','c15'],
    ['w68','Elena P.',     ['almacen','mozo'],             ['santjordi','eivissa','santjosep'],                  'proven',   84,24, 96,{es:'C2'},                ['inventario!','carretilla!'],       '1:0700-1500,2:0700-1500,3:0700-1500,4:0700-1500,5:0700-1500','c17'],
    ['w50','Berta L.',     ['camarero','barman'],        ['santjoan','santaeularia','escanar','santrafel'],     'certified',91,36, 98,{es:'C2',en:'B2',it:'C1'},['sala!','coctel!','vinos!'],        '0:2100-0300,3:2100-0300,4:2100-0300,5:2100-0300,6:2100-0300','c18']
  ];

  /* 'dow:HHMM-HHMM' -> { dow: [inizioMin, fineMin] }.
     Se la fine e' minore dell'inizio il turno scavalla la mezzanotte
     e la fine viene espressa oltre i 1440 minuti.                        */
  function hhmm(v){ return parseInt(v.slice(0,2),10)*60 + parseInt(v.slice(2),10); }
  function parseAvail(str){
    const out = {};
    str.split(',').forEach(function (chunk) {
      const i = chunk.indexOf(':');
      const dow = +chunk.slice(0,i);
      const parts = chunk.slice(i+1).split('-');
      let a = hhmm(parts[0]), b = hhmm(parts[1]);
      if (b <= a) b += 1440;
      out[dow] = [a,b];
    });
    return out;
  }

  function parseSkills(list){
    return list.map(function (s) {
      if (s.slice(-1) === '!') return { id:s.slice(0,-1), status:'confirmed' };
      if (s.slice(-1) === '?') return { id:s.slice(0,-1), status:'doubt' };
      return { id:s, status:'declared' };
    });
  }

  const WORKERS = RAW.map(function (r) {
    return {
      id:r[0], name:r[1], roles:r[2], zones:r[3], trust:r[4],
      score:r[5], jobs:r[6], attendance:r[7], langs:r[8],
      skills:parseSkills(r[9]), avail:parseAvail(r[10]), lastJob:r[11]
    };
  });

  /* --- Plantillas del feed de actividad ---------------------------------- */
  const FEED_TEMPLATES = [
    { type:'checkin', key:'feed_checkin' },
    { type:'match',   key:'feed_match'   },
    { type:'post',    key:'feed_post'    },
    { type:'join',    key:'feed_join'    },
    { type:'certify', key:'feed_certify' },
    { type:'rating',  key:'feed_rating'  },
    { type:'avail',   key:'feed_avail'   }
  ];

  /* zonas cercanas, para el ensanchado automatico de la busqueda */
  const NEAR = {};
  ZONES.forEach(function (z) { NEAR[z.id] = z.near || []; });

  return { ZONES, SECTORS, ROLES, COMPANIES, WORKERS, FEED_TEMPLATES, NEAR };
})();
