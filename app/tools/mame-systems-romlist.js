var request = require('request');
var fs = require('fs');

var mame_systems_ok = [
    { 
        name: 'adk', file: 'ADK Classics.txt', query: {manufacturer_desc: 'adk', pagination_off: true , emulation: 'good', append_data: 'adk'}    
    },
    {
       name: 'allumer', file: 'Allumer Classics.txt',query: { manufacturer_desc: 'allumer' , pagination_off: true, emulation: 'good', append_data: 'allumer'}
    },
    {
       name: 'amenip', file: 'Amenip Classics.txt', query: { manufacturer_desc: 'amenip', pagination_off: true , emulation: 'good', append_data: 'amenip'}
    },
    {
        name: 'alpha denshi', file: 'Alpha Denshi Co.txt', query: {manufacturer_desc: 'alpha denshi', pagination_off: true, emulation: 'good', append_data: 'alpha denshi'}
    },
    {  
        name: 'atari', file: 'Atari Classics.txt', query: {manufacturer_desc: 'atari', pagination_off: true, emulation: 'good', append_data: 'atari'}
    },
    { 
        name: 'atari cojag', file: 'Atari Cojag', query: {source_file: 'jaguar.cpp', pagination_off: true , emulation: 'good', append_data: 'atari cojag'}    
    },
    { 
        name: 'atarig1', file: 'Atari G1', query: {source_file: 'atarig1.cpp', pagination_off: true , emulation: 'good', append_data: 'atarig1'}    
    },
    { 
        name: 'atarig42', file: 'Atari G42', query: {source_file: 'atarig42.cpp', pagination_off: true , emulation: 'good', append_data: 'atarig42'}    
    },
    { 
        name: 'atarigx2', file: 'Atari GX2', query: {source_file: 'atarigx2.cpp', pagination_off: true , emulation: 'good', append_data: 'atarigx2'}    
    },
    { 
        name: 'atarisy1', file: 'Atari System 1.txt', query: {source_file: 'atarisy1.cpp', pagination_off: true , emulation: 'good', append_data: 'atarisy1'}    
    },
    { 
        name: 'atarisy2', file: 'Atari System 2.txt', query: {source_file: 'atarisy2.cpp', pagination_off: true , emulation: 'good', append_data: 'atarisy2'}    
    },
    {  
        name: 'atlus', file: 'Atlus Classics.txt', query: {manufacturer_desc: 'atlus', pagination_off: true, emulation: 'good', append_data: 'atlus'}
    },
    {
        name: 'bally', file: 'Bally Classics.txt', query: {manufacturer_desc: 'bally', pagination_off: true, emulation: 'good', append_data: 'bally'}
    },
    { 
        name: 'ballyastro', file: 'Bally Midway Astrocade.txt', query: {source_file: 'astrocde.cpp', pagination_off: true , emulation: 'good', append_data: 'ballyastro'}    
    },
    {
        name: 'bally sente', file: 'Bally Sente Classics.txt', query: {manufacturer_desc: 'bally/sente', pagination_off: true, emulation: 'good', append_data: 'bally sente'}
    },
    {
        name: 'banpresto', file: 'Banpresto Classics.txt', query: {manufacturer_desc: 'banpresto', pagination_off: true, emulation: 'good', append_data: 'banpresto'}
    },
    {
        name: 'capcom', file: 'Capcom Classics.txt', query: {manufacturer_desc: 'capcom', pagination_off: true, emulation: 'good', append_data: 'capcom'}
    },
    {
        name: 'cave', file: 'Cave Classics.txt', query: {manufacturer_desc: 'cave', pagination_off: true, emulation: 'good', append_data: 'cave'}
    },
    {
        name: 'cave 68000', file: 'Cave 68000.txt', query: {source_file:'cave.cpp', pagination_off: true, emulation: 'good', append_data: 'cave 68000'}
    },
    {
        name: 'cave cv-1000', file: 'Cave CV-1000.txt', query: {source_file:'cv1k.cpp', pagination_off: true, emulation: 'good', append_data: 'cave cv-1000'}
    },
    { 
        name: 'centuri', file: 'Centuri Classics.txt', query: {manufacturer_desc: 'centuri', pagination_off: true , emulation: 'good', append_data: 'centuri'}    
    },
    { 
        name: 'century', file: 'Century Electronics Classics.txt', query: {manufacturer_desc: 'century electronics', pagination_off: true , emulation: 'good', append_data: 'century'}    
    },
    { 
        name: 'cinematronics', file: 'Cinematronics Classics.txt', query: {manufacturer_desc: 'cinematronics', pagination_off: true , emulation: 'good', append_data: 'cinematronics'}    
    },
    { 
        name: 'comad', file: 'Comad Co Classics.txt', query: {manufacturer_desc: 'comad', pagination_off: true , emulation: 'good', append_data: 'comad'}    
    },
    { 
        name: 'coreland', file: 'Coreland Classics.txt', query: {manufacturer_desc: 'coreland', pagination_off: true , emulation: 'good', append_data: 'coreland'}    
    },
    { 
        name: 'dataeast', file: 'Data East Classics.txt', query: {manufacturer_desc: 'data east', pagination_off: true , emulation: 'good', append_data: 'dataeast'}    
    },
    { 
        name: 'dooyong', file: 'Dooyong Classics.txt', query: {manufacturer_desc: 'dooyong', pagination_off: true , emulation: 'good', append_data: 'dooyong'}    
    },
    { 
        name: 'esd', file: 'ESD Classics.txt', query: {manufacturer_desc: 'esd', pagination_off: true , emulation: 'good', append_data: 'esd'}    
    },
    { 
        name: 'exidy', file: 'Exidy Classics.txt', query: {manufacturer_desc: 'exidy', pagination_off: true , emulation: 'good', append_data: 'exidy'}    
    },
    { 
        name: 'fuuki', file: 'Fuuki Classics.txt', query: {manufacturer_desc: 'fuuki', pagination_off: true , emulation: 'good', append_data: 'fuuki'}    
    },
    { 
        name: 'gaelco', file: 'Gaelco Classics.txt', query: {manufacturer_desc: 'gaelco', pagination_off: true , emulation: 'good', append_data: 'gaelco'}    
    },
    { 
        name: 'gottlieb', file: 'Gottlieb Classics.txt', query: {manufacturer_desc: 'gottlieb', pagination_off: true , emulation: 'good', append_data: 'gottlieb'}    
    },
    { 
        name: 'gremlin', file: 'Gremlin Classics.txt', query: {manufacturer_desc: 'gremlin', pagination_off: true , emulation: 'good', append_data: 'gremlin'}    
    },
    { 
        name: 'hudson', file: 'Hudson Classics.txt', query: {manufacturer_desc: 'hudson', pagination_off: true , emulation: 'good', append_data: 'hudson'}    
    },
    { 
        name: 'igs', file: 'IGS Classics.txt', query: {manufacturer_desc: 'igs', pagination_off: true , emulation: 'good', append_data: 'igs'}    
    },
    { 
        name: 'irem', file: 'Irem Classics.txt', query: {manufacturer_desc: 'irem', pagination_off: true , emulation: 'good', append_data: 'irem'}    
    },
    { 
        name: 'jaleco', file: 'Jaleco Classics.txt', query: {manufacturer_desc: 'jaleco', pagination_off: true , emulation: 'good', append_data: 'jaleco'}    
    },
    { 
        name: 'kaneko', file: 'Kaneco Classics.txt', query: {manufacturer_desc: 'kaneko', pagination_off: true , emulation: 'good', append_data: 'kaneko'}    
    },
    { 
        name: 'konami', file: 'Konami Classics.txt', query: {manufacturer_desc: 'konami', pagination_off: true , emulation: 'good', append_data: 'konami'}    
    },
    { 
        name: 'metro', file: 'Metro Classics.txt', query: {manufacturer_desc: 'metro', pagination_off: true , emulation: 'good', append_data: 'metro'}    
    },
    { 
        name: 'midas', file: 'Midas Classics.txt', query: {manufacturer_desc: 'midas', pagination_off: true , emulation: 'good', append_data: 'midas'}    
    },
    { 
        name: 'midway', file: 'Midway Classics.txt', query: {manufacturer_desc: 'midway', pagination_off: true , emulation: 'good', append_data: 'midway'}    
    },
    { 
        name: 'mitchell', file: 'Mitchell Classics.txt', query: {manufacturer_desc: 'mitchell', pagination_off: true , emulation: 'good', append_data: 'mitchell'}    
    },
    { 
        name: 'namco', file: 'Namco Classics.txt', query: {manufacturer_desc: 'namco', pagination_off: true , emulation: 'good', append_data: 'namco'}    
    },
    { 
        name: 'nichibutsu', file: 'Nichibutsu Classics.txt', query: {manufacturer_desc: 'nichibutsu', pagination_off: true , emulation: 'good', append_data: 'nichibutsu'}    
    },
    { 
        name: 'nintendo', file: 'Nintendo Classics.txt', query: {manufacturer_desc: 'nintendo', pagination_off: true , emulation: 'good', append_data: 'nintendo'}    
    },
    { 
        name: 'nmk', file: 'NMK Classics.txt', query: {manufacturer_desc: 'nmk', pagination_off: true , emulation: 'good', append_data: 'nmk'}    
    },
    { 
        name: 'orca', file: 'Orca Classics.txt', query: {manufacturer_desc: 'orca', pagination_off: true , emulation: 'good', append_data: 'orca'}    
    },
    { 
        name: 'playmark', file: 'Playmark Classics.txt', query: {manufacturer_desc: 'playmark', pagination_off: true , emulation: 'good', append_data: 'playmark'}    
    },
    { 
        name: 'psikyo', file: 'Psikyo Classics.txt', query: {manufacturer_desc: 'psikyo', pagination_off: true , emulation: 'good', append_data: 'psikyo'}    
    },
    { 
        name: 'raizing', file: 'Raizing Classics.txt', query: {manufacturer_desc: 'raizing', pagination_off: true , emulation: 'good', append_data: 'raizing'}    
    },
    { 
        name: 'saurus', file: 'Saurus Classics.txt', query: {manufacturer_desc: 'saurus', pagination_off: true , emulation: 'good', append_data: 'saurus'}    
    },
    { 
        name: 'sega', file: 'Sega Classics.txt', query: {manufacturer_desc: 'sega', pagination_off: true , emulation: 'good', append_data: 'sega'}    
    },
    { 
        name: 'seibu kaihatsu', file: 'Seibu Kaihatsu Classics.txt', query: {manufacturer_desc: 'seibu kaihatsu', pagination_off: true , emulation: 'good', append_data: 'seibu kaihatsu'}    
    },
    { 
        name: 'semicom', file: 'Semicom Classics.txt', query: {manufacturer_desc: 'semicom', pagination_off: true , emulation: 'good', append_data: 'semicom'}    
    },
    { 
        name: 'sigma', file: 'Sigma Enterprises Classics.txt', query: {manufacturer_desc: 'sigma', pagination_off: true , emulation: 'good', append_data: 'sigma'}    
    },
    { 
        name: 'snk', file: 'SNK Classics.txt', query: {manufacturer_desc: 'snk', pagination_off: true , emulation: 'good', append_data: 'snk'}    
    },
    { 
        name: 'stern', file: 'Stern Electronics Classics.txt', query: {manufacturer_desc: 'stern', pagination_off: true , emulation: 'good', append_data: 'stern'}    
    },
    { 
        name: 'suna', file: 'Suna Classics.txt', query: {manufacturer_desc: 'suna', pagination_off: true , emulation: 'good', append_data: 'suna'}    
    },
    { 
        name: 'sunsoft', file: 'Sunsoft Classics.txt', query: {manufacturer_desc: 'sunsoft', pagination_off: true , emulation: 'good', append_data: 'sunsoft'}    
    },
    { 
        name: 'sunelect', file: 'Sun Electronics Classics.txt', query: {manufacturer_desc: 'sun electronics', pagination_off: true , emulation: 'good', append_data: 'sunelect'}    
    },
    { 
        name: 'tad', file: 'TAD Classics.txt', query: {manufacturer_desc: 'tad', pagination_off: true , emulation: 'good', append_data: 'tad'}    
    },
    { 
        name: 'taito', file: 'Taito Classics.txt', query: {manufacturer_desc: 'taito', pagination_off: true , emulation: 'good', append_data: 'taito'}    
    },
    { 
        name: 'tatsumi', file: 'Tatsumi Classics.txt', query: {manufacturer_desc: 'tatsumi', pagination_off: true , emulation: 'good', append_data: 'tatsumi'}    
    },
    { 
        name: 'tecfri', file: 'Tecfri Classics.txt', query: {manufacturer_desc: 'tecfri', pagination_off: true , emulation: 'good', append_data: 'tecfri'}    
    },
    { 
        name: 'technos', file: 'Technos Classics.txt', query: {manufacturer_desc: 'technos', pagination_off: true , emulation: 'good', append_data: 'technos'}    
    },
    { 
        name: 'tecmo', file: 'Tecmo Classics.txt', query: {manufacturer_desc: 'tecmo', pagination_off: true , emulation: 'good', append_data: 'tecmo'}    
    },
    { 
        name: 'tehkan', file: 'Tehkan Classics.txt', query: {manufacturer_desc: 'tehkan', pagination_off: true , emulation: 'good', append_data: 'tehkan'}    
    },
    { 
        name: 'toaplan', file: 'Toaplan Classics.txt', query: {manufacturer_desc: 'toaplan', pagination_off: true , emulation: 'good', append_data: 'toaplan'}    
    },
    { 
        name: 'unico', file: 'Unico Electronics Classics.txt', query: {manufacturer_desc: 'unico', pagination_off: true , emulation: 'good', append_data: 'unico'}    
    },
    { 
        name: 'universal', file: 'Universal Classics.txt', query: {manufacturer_desc: 'universal', pagination_off: true , emulation: 'good', append_data: 'universal'}    
    },
    { 
        name: 'upl', file: 'UPL Classics.txt', query: {manufacturer_desc: 'upl', pagination_off: true , emulation: 'good', append_data: 'upl'}    
    },
    { 
        name: 'videos', file: 'Video System Co Classics.txt', query: {manufacturer_desc: 'video system', pagination_off: true , emulation: 'good', append_data: 'videos'}    
    },
    { 
        name: 'visco', file: 'Visco Classics.txt', query: {manufacturer_desc: 'visco', pagination_off: true , emulation: 'good', append_data: 'visco'}    
    },
    { 
        name: 'williams', file: 'Williams Classics.txt', query: {manufacturer_desc: 'williams', pagination_off: true , emulation: 'good', append_data: 'williams'}    
    },
    { 
        name: 'yunsung', file: 'Yun Sung Classics.txt', query: {manufacturer_desc: 'yun sung', pagination_off: true , emulation: 'good', append_data: 'yunsung'}    
    },
    { 
        name: 'zilec', file: 'Zilec Electronics Classics.txt', query: {manufacturer_desc: 'zilec', pagination_off: true , emulation: 'good', append_data: 'zilec'}    
    },


    { 
        name: 'ballymcr', file: 'Bally Midway MCR.txt', query: {source_file: 'mcr.cpp', pagination_off: true , emulation: 'good', append_data: 'ballymcr'}    
    },
    { 
        name: 'ballymcr68', file: 'Bally Midway MCR-68K.txt', query: {source_file: 'mcr68.cpp', pagination_off: true , emulation: 'good', append_data: 'ballymcr68'}    
    },
    { 
        name: 'ballymcrscroll', file: 'Bally Midway MCR-Scroll.txt', query: {source_file: 'mcr3.cpp', pagination_off: true , emulation: 'good', append_data: 'ballymcrscroll'}    
    },
    { 
        name: 'ballypinball', file: 'Bally Midway Pinball Video Hybrid.txt', query: {mechanical: 'on', source_file: 'byvid.cpp', pagination_off: true , emulation: 'good', append_data: 'ballypinball'}    
    },
    { 
        name: 'ballysente', file: 'Bally Sente.txt', query: {source_file: 'balsente.cpp', pagination_off: true , emulation: 'good', append_data: 'ballysente'}    
    },
    { 
        name: 'brezza', file: 'BrezzaSoft Crystal System.txt', query: {source_file: 'crystal.cpp', pagination_off: true , emulation: 'good', append_data: 'brezza'}    
    },
    { 
        name: 'cps1', file: 'Capcom Play System I.txt', query: {source_file: 'cps1.cpp', pagination_off: true , emulation: 'good', append_data: 'cps1'}    
    },
    { 
        name: 'cps2', file: 'Capcom Play System II.txt', query: {source_file: 'cps2.cpp', pagination_off: true , emulation: 'good', append_data: 'cps2'}    
    },
    { 
        name: 'cps3', file: 'Capcom Play System III.txt', query: {source_file: 'cps3.cpp', pagination_off: true , emulation: 'good', append_data: 'cps3'}    
    },
    { 
        name: 'capcomzn', file: 'Capcom ZN.txt', query: {source_file: 'zn.cpp', pagination_off: true , emulation: 'good', append_data: 'capcomzn'}    
    },
    { 
        name: 'dataeastdeco', file: 'Data East DECO Cassette.txt', query: {source_file: 'decocass.cpp', pagination_off: true , emulation: 'good', append_data: 'dataeastdeco'}    
    },
    { 
        name: 'dataeastghost', file: 'Data East Ghostbusters.txt', query: {source_file: 'dec8.cpp', pagination_off: true , emulation: 'good', append_data: 'dataeastghost'}    
    },
    { 
        name: 'dataeastmecm1', file: 'Data East MEC-M1.txt', query: {source_file: 'dec0.cpp', pagination_off: true , emulation: 'good', append_data: 'dataeastmecm1'}    
    },
    { 
        name: 'dataeastmlc', file: 'Data East mlc System.txt', query: {source_file: 'deco_mlc.cpp', pagination_off: true , emulation: 'good', append_data: 'dataeastmlc'}    
    },
    { 
        name: 'dataeastsimple', file: 'Data East Simple 156.txt', query: {source_file: 'simpl156.cpp', pagination_off: true , emulation: 'good', append_data: 'dataeastsimple'}    
    },
    { 
        name: 'eolith', file: 'Eolith Gradation 2D System.txt', query: {source_file: 'eolith.cpp', pagination_off: true , emulation: 'good', append_data: 'eolith'}    
    },
    { 
        name: 'exidy440', file: 'Exidy 440 System.txt', query: {source_file: 'exidy440.cpp', pagination_off: true , emulation: 'good', append_data: 'exidy440'}    
    },
    { 
        name: 'maxaflex', file: 'Exidy Max-A-Flex.txt', query: {source_file: 'maxaflex.cpp', pagination_off: true , emulation: 'good', append_data: 'maxaflex'}    
    },
    { 
        name: 'itech8', file: 'Incredible Technologies 8 BIT.txt', query: {source_file: 'itech8.cpp', pagination_off: true , emulation: 'good', append_data: 'itech8'}    
    },
    { 
        name: 'itech32', file: 'Incredible Technologies 32 BIT.txt', query: {source_file: 'itech32.cpp', pagination_off: true , emulation: 'good', append_data: 'itech32'}    
    },
    { 
        name: 'm10', file: 'Irem M10.txt', query: {source_file: 'm10.cpp', pagination_off: true , emulation: 'good', append_data: 'm10'}    
    },
    { 
        name: 'm27', file: 'Irem M27.txt', query: {source_file: 'redalert.cpp', pagination_off: true , emulation: 'good', append_data: 'm27'}    
    },
    { 
        name: 'konamigx', file: 'Konami GX2.txt', query: {source_file: 'konamigx.cpp', pagination_off: true , emulation: 'good', append_data: 'konamigx'}    
    },
    { 
        name: 'nemesis', file: 'Konami Nemesis.txt', query: {source_file: 'nemesis.cpp', pagination_off: true , emulation: 'good', append_data: 'nemesis'}    
    },
    { 
        name: 'scramble', file: 'Konami Scramble.txt', query: {source_file: 'scramble.cpp', pagination_off: true , emulation: 'good', append_data: 'scramble'}    
    },
    { 
        name: 'limenko', file: 'Limenko Power System 2.txt', query: {source_file: 'limenko.cpp', pagination_off: true , emulation: 'good', append_data: 'limenko'}    
    },
    { 
        name: 'micro3d', file: 'Microprose 3D.txt', query: {source_file: 'micro3d.cpp', pagination_off: true , emulation: 'good', append_data: 'micro3d'}    
    },
    { 
        name: 'mw8080bw', file: 'Midway 8080.txt', query: {source_file: 'mw8080bw.cpp', pagination_off: true , emulation: 'good', append_data: 'mw8080bw'}    
    },
    { 
        name: 'midtunit', file: 'Midway T Unit.txt', query: {source_file: 'midtunit.cpp', pagination_off: true , emulation: 'good', append_data: 'midtunit'}    
    },
    { 
        name: 'midyunit', file: 'Midway Y Unit.txt', query: {source_file: 'midyunit.cpp', pagination_off: true , emulation: 'good', append_data: 'midyunit'}    
    },
    { 
        name: 'midwunit', file: 'Midway Wolf Unit.txt', query: {source_file: 'midwunit.cpp', pagination_off: true , emulation: 'good', append_data: 'midwunit'}    
    },
    { 
        name: 'midvunit', file: 'Midway V Unit.txt', query: {source_file: 'midvunit.cpp', pagination_off: true , emulation: 'good', append_data: 'midvunit'}    
    },
    { 
        name: 'midzeus', file: 'Midway Zeus.txt', query: {source_file: 'midzeus.cpp', pagination_off: true , emulation: 'good', append_data: 'midzeus'}    
    },
    { 
        name: 'warpwarp', file: 'Namco 8080.txt', query: {source_file: 'warpwarp.cpp', pagination_off: true , emulation: 'good', append_data: 'warpwarp'}    
    },
    { 
        name: 'namcofl', file: 'Namco System FL.txt', query: {source_file: 'namcofl.cpp', pagination_off: true , emulation: 'good', append_data: 'namcofl'}    
    },
    { 
        name: 'namcond1', file: 'Namco ND-1.txt', query: {source_file: 'namcond1.cpp', pagination_off: true , emulation: 'good', append_data: 'namcond1'}    
    },
    { 
        name: 'namcona1', file: 'Namco NA-1.txt', query: {source_file: 'namcona1.cpp', pagination_off: true , emulation: 'good', append_data: 'namcona1'}    
    },
    { 
        name: 'namconb1', file: 'Namco NB-1.txt', query: {source_file: 'namconb1.cpp', pagination_off: true , emulation: 'good', append_data: 'namconb1'}    
    },
    { 
        name: 'galaga', file: 'Namco Galaga.txt', query: {source_file: 'galaga.cpp', pagination_off: true , emulation: 'good', append_data: 'galaga'}    
    },
    { 
        name: 'namcos1', file: 'Namco System 1.txt', query: {source_file: 'namcos1.cpp', pagination_off: true , emulation: 'good', append_data: 'namcos1'}    
    },
    { 
        name: 'namcos2', file: 'Namco System 2.txt', query: {source_file: 'namcos2.cpp', pagination_off: true , emulation: 'good', append_data: 'namcos2'}    
    },
    { 
        name: 'namcos11', file: 'Namco System 11.txt', query: {source_file: 'namcos11.cpp', pagination_off: true , emulation: 'good', append_data: 'namcos11'}    
    },
    { 
        name: 'namcos12', file: 'Namco System 12.txt', query: {source_file: 'namcos12.cpp', pagination_off: true , emulation: 'good', append_data: 'namcos12'}    
    },
    { 
        name: 'namcos21', file: 'Namco System 21.txt', query: {source_file: 'namcos21.cpp', pagination_off: true , emulation: 'good', append_data: 'namcos21'}    
    },
    { 
        name: 'namcos22', file: 'Namco System 22.txt', query: {source_file: 'namcos22.cpp', pagination_off: true , emulation: 'good', append_data: 'namcos22'}    
    },
    { 
        name: 'namcos86', file: 'Namco System 86.txt', query: {source_file: 'namcos86.cpp', pagination_off: true , emulation: 'good', append_data: 'namcos86'}    
    },
    { 
        name: 'playch10', file: 'Nintendo Playchoice 10.txt', query: {source_file: 'playch10.cpp', pagination_off: true , emulation: 'good', append_data: 'playch10'}    
    },
    { 
        name: 'pgm', file: 'Polygame Master.txt', query: {source_file: 'pgm.cpp', pagination_off: true , emulation: 'good', append_data: 'pgm'}    
    },
    { 
        name: 'pgm2', file: 'Polygame Master 2.txt', query: {source_file: 'pgm2.cpp', pagination_off: true , emulation: 'good', append_data: 'pgm2'}    
    },
    { 
        name: 'blockade', file: 'Sega Blockade.txt', query: {source_file: 'blockade.cpp', pagination_off: true , emulation: 'good', append_data: 'blockade'}    
    },
    { 
        name: 'segag80r', file: 'Sega G80 Raster.txt', query: {source_file: 'segag80r.cpp', pagination_off: true , emulation: 'good', append_data: 'segag80r'}    
    },
    { 
        name: 'segag80v', file: 'Sega G80 Vector.txt', query: {source_file: 'segag80v.cpp', pagination_off: true , emulation: 'good', append_data: 'segag80v'}    
    },
    
    { 
        name: 'system1', file: 'Sega System 1.txt', query: {source_file: 'system1.cpp', pagination_off: true , emulation: 'good', append_data: 'system1'}    
    },
    { 
        name: 'segas16a', file: 'Sega System 16A.txt', query: {source_file: 'segas16a.cpp', pagination_off: true , emulation: 'good', append_data: 'segas16a'}    
    },
    { 
        name: 'segas16b', file: 'Sega System 16B.txt', query: {source_file: 'segas16b.cpp', pagination_off: true , emulation: 'good', append_data: 'segas16b'}    
    },
    { 
        name: 'segas18', file: 'Sega System 18.txt', query: {source_file: 'segas18.cpp', pagination_off: true , emulation: 'good', append_data: 'segas18'}    
    },
    { 
        name: 'segas24', file: 'Sega System 24.txt', query: {source_file: 'segas24.cpp', pagination_off: true , emulation: 'good', append_data: 'segas24'}    
    },
    { 
        name: 'segas32', file: 'Sega System 32.txt', query: {source_file: 'segas32.cpp', pagination_off: true , emulation: 'good', append_data: 'segas32'}    
    },
    { 
        name: 'segac2', file: 'Sega System C-2.txt', query: {source_file: 'segac2.cpp', pagination_off: true , emulation: 'good', append_data: 'segac2'}    
    },
    { 
        name: 'segae', file: 'Sega System E.txt', query: {source_file: 'segae.cpp', pagination_off: true , emulation: 'good', append_data: 'segae'}    
    },
    { 
        name: 'segaxbd', file: 'Sega X Board.txt', query: {source_file: 'segaxbd.cpp', pagination_off: true , emulation: 'good', append_data: 'segaxbd'}    
    },
    { 
        name: 'segaybd', file: 'Sega Y Board.txt', query: {source_file: 'segaybd.cpp', pagination_off: true , emulation: 'good', append_data: 'segaybd'}    
    },
    { 
        name: 'hng64', file: 'SNK Hyper NeoGeo 64.txt', query: {source_file: 'hng64.cpp', pagination_off: true , emulation: 'good', append_data: 'hng64'}    
    },
    
    { 
        name: 'taito_f2', file: 'Taito F2.txt', query: {source_file: 'taito_f2.cpp', pagination_off: true , emulation: 'good', append_data: 'taito_f2'}    
    },
    { 
        name: 'taito_f3', file: 'Taito F3.txt', query: {source_file: 'taito_f3.cpp', pagination_off: true , emulation: 'good', append_data: 'taito_f3'}    
    },
    { 
        name: 'taitogn', file: 'Taito G-Net.txt', query: {source_file: 'taitogn.cpp', pagination_off: true , emulation: 'good', append_data: 'taitogn'}    
    },
    { 
        name: 'taito_h', file: 'Taito H System.txt', query: {source_file: 'taito_h.cpp', pagination_off: true , emulation: 'good', append_data: 'taito_h'}    
    },
    { 
        name: 'taito_l', file: 'Taito L System.txt', query: {source_file: 'taito_l.cpp', pagination_off: true , emulation: 'good', append_data: 'taito_l'}    
    },
    { 
        name: 'taitosj', file: 'Taito System SJ.txt', query: {source_file: 'taitosj.cpp', pagination_off: true , emulation: 'good', append_data: 'taitosj'}    
    },
    { 
        name: 'thepit', file: 'Taito The Pit.txt', query: {source_file: 'thepit.cpp', pagination_off: true , emulation: 'good', append_data: 'thepit'}    
    },
    { 
        name: 'taito_x', file: 'Taito X System.txt', query: {source_file: 'taito_x.cpp', pagination_off: true , emulation: 'good', append_data: 'taito_x'}    
    },
    { 
        name: 'taito_z', file: 'Taito Z System.txt', query: {source_file: 'taito_z.cpp', pagination_off: true , emulation: 'good', append_data: 'taito_z'}    
    },
    { 
        name: 'slapfght', file: 'Toaplan Slapfight.txt', query: {source_file: 'slapfght.cpp', pagination_off: true , emulation: 'good', append_data: 'slapfght'}    
    },
];

var mame_systems = [
    { 
        name: 'megaplay', file: 'Sega Mega Play.txt', query: {source_file: 'megaplay.cpp', pagination_off: true,emulation: 'good', append_data: 'megaplay'}    
    },
    
];

for(var i=0; i<mame_systems.length; i++) {
    request({
        url: "http://localhost:3001/mame/api/search/1",
        method: "POST",
        json: true,  
        body: mame_systems[i].query
    }, function (error, response, body){
        console.log('----------');
        console.log("total=" + response.body.machines.length + " " + response.body.append_data);
        console.log('----------');
        var data="";
        for(var i=0; i < response.body.machines.length; i++) {
            var emulator = "MAME";
            if (fs.existsSync("F:/EmuDreams/platforms/arcade/fbalpha/" + response.body.machines[i].name + ".zip")) {
                emulator = "fb-alpha";
            } else if (fs.existsSync("F:/EmuDreams/platforms/arcade/mame2003/" + response.body.machines[i].name + ".zip")) {
                emulator = "lr-mame2003";
            } else if (fs.existsSync("F:/EmuDreams/platforms/arcade/mame2010/" + response.body.machines[i].name + ".zip")) {
                emulator = "lr-mame2010";
            }
            console.log(response.body.machines[i].name + "=" + emulator);
            data += response.body.machines[i].name + ";" + emulator+"\n";
            //fs.writeFileSync('c:/temp/romlists/' + response.body.append_data + ".txt", data);
        }
    });
}

