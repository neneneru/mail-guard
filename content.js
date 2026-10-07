/* Mail Guard 1.1.2 — bundled locally; no remote dependencies. */
/* Mail Guard. Pure, bounded local analysis; no network or persistent state. */
(() => {
  'use strict';
  const M = globalThis.MCG = globalThis.MCG || Object.create(null);
  M.VERSION = '1.1.2';
  M.LIMIT = Object.freeze({url:16384, links:500, context:1000, text:262144, nodes:20000, header:262144, fields:2048, field:32768, raw:5000000, mimeParts:128, depth:10});
  M.LEVELS = ['NO_FINDINGS','INFO','CAUTION','WARNING','HIGH_RISK'];
  M.maxLevel = (...x) => M.LEVELS[Math.max(0,...x.map(v=>M.LEVELS.indexOf(v)))];
  M.clip = (s,n=1000) => typeof s === 'string' ? s.slice(0,n) : '';
  M.clean = s => M.clip(s,65536).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g, c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'));
  M.normalize = s => M.clip(s,4000).normalize('NFKC').toLowerCase().replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g,'').replace(/\s+/g,' ').trim();
  M.boundary = (host,base) => host===base || host.endsWith('.'+base);
  M.validHttp = s => {try {if(typeof s!=='string'||s.length>M.LIMIT.url)return null;const u=new URL(s);return /^https?:$/.test(u.protocol)?u:null;}catch{return null;}};
  M.defaults = Object.freeze({enabled:true,language:'auto',showInfo:true});
  M.validateSettings = v => {
    if(!v||typeof v!=='object'||Array.isArray(v))throw new Error('Invalid settings');
    if(Object.keys(v).some(k=>k!=='consent'&&!Object.hasOwn(M.defaults,k)))throw new Error('Unknown setting');
    const out={...M.defaults};
    for(const k of ['enabled','showInfo'])if(Object.hasOwn(v,k)){if(typeof v[k]!=='boolean')throw new Error('Invalid setting');out[k]=v[k];}
    // Versions through 1.0.2 used two gates for the same automatic check.
    // Preserve an explicit old OFF without keeping a second activation control.
    // Return only canonical preferences, so a later user toggle can enable checks.
    if(Object.hasOwn(v,'consent')){if(typeof v.consent!=='boolean')throw new Error('Invalid setting');if(!v.consent)out.enabled=false;}
    if('language' in v){if(typeof v.language!=='string'||!['auto',...Object.keys(M.LOCALES||{})].includes(v.language))throw new Error('Invalid language');out.language=v.language;}
    return out;
  };
})();

globalThis.MCG.PSL = {"meta": {"source": "Mozilla Public Suffix List, bundled with OpenJDK", "upstreamCommit": "1cbd6e71a9b83620b1d0b11e49d3d9ff48c27e22", "license": "MPL-2.0", "note": "Pinned snapshot; not a live reputation or ownership database."}, "icann": ["aaa", "aarp", "abb", "abbott", "abbvie", "abc", "able", "abogado", "abudhabi", "ac", "com.ac", "edu.ac", "gov.ac", "net.ac", "mil.ac", "org.ac", "academy", "accenture", "accountant", "accountants", "aco", "actor", "ad", "nom.ad", "ads", "adult", "ae", "co.ae", "net.ae", "org.ae", "sch.ae", "ac.ae", "gov.ae", "mil.ae", "aeg", "aero", "accident-investigation.aero", "accident-prevention.aero", "aerobatic.aero", "aeroclub.aero", "aerodrome.aero", "agents.aero", "aircraft.aero", "airline.aero", "airport.aero", "air-surveillance.aero", "airtraffic.aero", "air-traffic-control.aero", "ambulance.aero", "amusement.aero", "association.aero", "author.aero", "ballooning.aero", "broker.aero", "caa.aero", "cargo.aero", "catering.aero", "certification.aero", "championship.aero", "charter.aero", "civilaviation.aero", "club.aero", "conference.aero", "consultant.aero", "consulting.aero", "control.aero", "council.aero", "crew.aero", "design.aero", "dgca.aero", "educator.aero", "emergency.aero", "engine.aero", "engineer.aero", "entertainment.aero", "equipment.aero", "exchange.aero", "express.aero", "federation.aero", "flight.aero", "fuel.aero", "gliding.aero", "government.aero", "groundhandling.aero", "group.aero", "hanggliding.aero", "homebuilt.aero", "insurance.aero", "journal.aero", "journalist.aero", "leasing.aero", "logistics.aero", "magazine.aero", "maintenance.aero", "media.aero", "microlight.aero", "modelling.aero", "navigation.aero", "parachuting.aero", "paragliding.aero", "passenger-association.aero", "pilot.aero", "press.aero", "production.aero", "recreation.aero", "repbody.aero", "res.aero", "research.aero", "rotorcraft.aero", "safety.aero", "scientist.aero", "services.aero", "show.aero", "skydiving.aero", "software.aero", "student.aero", "trader.aero", "trading.aero", "trainer.aero", "union.aero", "workinggroup.aero", "works.aero", "aetna", "af", "gov.af", "com.af", "org.af", "net.af", "edu.af", "afl", "africa", "ag", "com.ag", "org.ag", "net.ag", "co.ag", "nom.ag", "agakhan", "agency", "ai", "off.ai", "com.ai", "net.ai", "org.ai", "aig", "airbus", "airforce", "airtel", "akdn", "al", "com.al", "edu.al", "gov.al", "mil.al", "net.al", "org.al", "alibaba", "alipay", "allfinanz", "allstate", "ally", "alsace", "alstom", "am", "co.am", "com.am", "commune.am", "net.am", "org.am", "amazon", "americanexpress", "americanfamily", "amex", "amfam", "amica", "amsterdam", "analytics", "android", "anquan", "anz", "ao", "ed.ao", "gv.ao", "og.ao", "co.ao", "pb.ao", "it.ao", "aol", "apartments", "app", "apple", "aq", "aquarelle", "ar", "bet.ar", "com.ar", "coop.ar", "edu.ar", "gob.ar", "gov.ar", "int.ar", "mil.ar", "musica.ar", "mutual.ar", "net.ar", "org.ar", "senasa.ar", "tur.ar", "arab", "aramco", "archi", "army", "arpa", "e164.arpa", "in-addr.arpa", "ip6.arpa", "iris.arpa", "uri.arpa", "urn.arpa", "art", "arte", "as", "gov.as", "asda", "asia", "associates", "at", "ac.at", "co.at", "gv.at", "or.at", "sth.ac.at", "athleta", "attorney", "au", "com.au", "net.au", "org.au", "edu.au", "gov.au", "asn.au", "id.au", "info.au", "conf.au", "oz.au", "act.au", "nsw.au", "nt.au", "qld.au", "sa.au", "tas.au", "vic.au", "wa.au", "act.edu.au", "catholic.edu.au", "nsw.edu.au", "nt.edu.au", "qld.edu.au", "sa.edu.au", "tas.edu.au", "vic.edu.au", "wa.edu.au", "qld.gov.au", "sa.gov.au", "tas.gov.au", "vic.gov.au", "wa.gov.au", "schools.nsw.edu.au", "auction", "audi", "audible", "audio", "auspost", "author", "auto", "autos", "aw", "com.aw", "aws", "ax", "axa", "az", "com.az", "net.az", "int.az", "gov.az", "org.az", "edu.az", "info.az", "pp.az", "mil.az", "name.az", "pro.az", "biz.az", "azure", "ba", "com.ba", "edu.ba", "gov.ba", "mil.ba", "net.ba", "org.ba", "baby", "baidu", "banamex", "band", "bank", "bar", "barcelona", "barclaycard", "barclays", "barefoot", "bargains", "baseball", "basketball", "bauhaus", "bayern", "bb", "biz.bb", "co.bb", "com.bb", "edu.bb", "gov.bb", "info.bb", "net.bb", "org.bb", "store.bb", "tv.bb", "bbc", "bbt", "bbva", "bcg", "bcn", "*.bd", "be", "ac.be", "beats", "beauty", "beer", "bentley", "berlin", "best", "bestbuy", "bet", "bf", "gov.bf", "bg", "a.bg", "b.bg", "c.bg", "d.bg", "e.bg", "f.bg", "g.bg", "h.bg", "i.bg", "j.bg", "k.bg", "l.bg", "m.bg", "n.bg", "o.bg", "p.bg", "q.bg", "r.bg", "s.bg", "t.bg", "u.bg", "v.bg", "w.bg", "x.bg", "y.bg", "z.bg", "0.bg", "1.bg", "2.bg", "3.bg", "4.bg", "5.bg", "6.bg", "7.bg", "8.bg", "9.bg", "bh", "com.bh", "edu.bh", "net.bh", "org.bh", "gov.bh", "bharti", "bi", "co.bi", "com.bi", "edu.bi", "or.bi", "org.bi", "bible", "bid", "bike", "bing", "bingo", "bio", "biz", "bj", "africa.bj", "agro.bj", "architectes.bj", "assur.bj", "avocats.bj", "co.bj", "com.bj", "eco.bj", "econo.bj", "edu.bj", "info.bj", "loisirs.bj", "money.bj", "net.bj", "org.bj", "ote.bj", "resto.bj", "restaurant.bj", "tourism.bj", "univ.bj", "black", "blackfriday", "blockbuster", "blog", "bloomberg", "blue", "bm", "com.bm", "edu.bm", "gov.bm", "net.bm", "org.bm", "bms", "bmw", "bn", "com.bn", "edu.bn", "gov.bn", "net.bn", "org.bn", "bnpparibas", "bo", "com.bo", "edu.bo", "gob.bo", "int.bo", "org.bo", "net.bo", "mil.bo", "tv.bo", "web.bo", "academia.bo", "agro.bo", "arte.bo", "blog.bo", "bolivia.bo", "ciencia.bo", "cooperativa.bo", "democracia.bo", "deporte.bo", "ecologia.bo", "economia.bo", "empresa.bo", "indigena.bo", "industria.bo", "info.bo", "medicina.bo", "movimiento.bo", "musica.bo", "natural.bo", "nombre.bo", "noticias.bo", "patria.bo", "politica.bo", "profesional.bo", "plurinacional.bo", "pueblo.bo", "revista.bo", "salud.bo", "tecnologia.bo", "tksat.bo", "transporte.bo", "wiki.bo", "boats", "boehringer", "bofa", "bom", "bond", "boo", "book", "booking", "bosch", "bostik", "boston", "bot", "boutique", "box", "br", "9guacu.br", "abc.br", "adm.br", "adv.br", "agr.br", "aju.br", "am.br", "anani.br", "aparecida.br", "app.br", "arq.br", "art.br", "ato.br", "b.br", "barueri.br", "belem.br", "bhz.br", "bib.br", "bio.br", "blog.br", "bmd.br", "boavista.br", "bsb.br", "campinagrande.br", "campinas.br", "caxias.br", "cim.br", "cng.br", "cnt.br", "com.br", "contagem.br", "coop.br", "coz.br", "cri.br", "cuiaba.br", "curitiba.br", "def.br", "des.br", "det.br", "dev.br", "ecn.br", "eco.br", "edu.br", "emp.br", "enf.br", "eng.br", "esp.br", "etc.br", "eti.br", "far.br", "feira.br", "flog.br", "floripa.br", "fm.br", "fnd.br", "fortal.br", "fot.br", "foz.br", "fst.br", "g12.br", "geo.br", "ggf.br", "goiania.br", "gov.br", "ac.gov.br", "al.gov.br", "am.gov.br", "ap.gov.br", "ba.gov.br", "ce.gov.br", "df.gov.br", "es.gov.br", "go.gov.br", "ma.gov.br", "mg.gov.br", "ms.gov.br", "mt.gov.br", "pa.gov.br", "pb.gov.br", "pe.gov.br", "pi.gov.br", "pr.gov.br", "rj.gov.br", "rn.gov.br", "ro.gov.br", "rr.gov.br", "rs.gov.br", "sc.gov.br", "se.gov.br", "sp.gov.br", "to.gov.br", "gru.br", "imb.br", "ind.br", "inf.br", "jab.br", "jampa.br", "jdf.br", "joinville.br", "jor.br", "jus.br", "leg.br", "lel.br", "log.br", "londrina.br", "macapa.br", "maceio.br", "manaus.br", "maringa.br", "mat.br", "med.br", "mil.br", "morena.br", "mp.br", "mus.br", "natal.br", "net.br", "niteroi.br", "*.nom.br", "not.br", "ntr.br", "odo.br", "ong.br", "org.br", "osasco.br", "palmas.br", "poa.br", "ppg.br", "pro.br", "psc.br", "psi.br", "pvh.br", "qsl.br", "radio.br", "rec.br", "recife.br", "rep.br", "ribeirao.br", "rio.br", "riobranco.br", "riopreto.br", "salvador.br", "sampa.br", "santamaria.br", "santoandre.br", "saobernardo.br", "saogonca.br", "seg.br", "sjc.br", "slg.br", "slz.br", "sorocaba.br", "srv.br", "taxi.br", "tc.br", "tec.br", "teo.br", "the.br", "tmp.br", "trd.br", "tur.br", "tv.br", "udi.br", "vet.br", "vix.br", "vlog.br", "wiki.br", "zlg.br", "bradesco", "bridgestone", "broadway", "broker", "brother", "brussels", "bs", "com.bs", "net.bs", "org.bs", "edu.bs", "gov.bs", "bt", "com.bt", "edu.bt", "gov.bt", "net.bt", "org.bt", "build", "builders", "business", "buy", "buzz", "bv", "bw", "co.bw", "org.bw", "by", "gov.by", "mil.by", "com.by", "of.by", "bz", "com.bz", "net.bz", "org.bz", "edu.bz", "gov.bz", "bzh", "ca", "ab.ca", "bc.ca", "mb.ca", "nb.ca", "nf.ca", "nl.ca", "ns.ca", "nt.ca", "nu.ca", "on.ca", "pe.ca", "qc.ca", "sk.ca", "yk.ca", "gc.ca", "cab", "cafe", "cal", "call", "calvinklein", "cam", "camera", "camp", "canon", "capetown", "capital", "capitalone", "car", "caravan", "cards", "care", "career", "careers", "cars", "casa", "case", "cash", "casino", "cat", "catering", "catholic", "cba", "cbn", "cbre", "cc", "cd", "gov.cd", "center", "ceo", "cern", "cf", "cfa", "cfd", "cg", "ch", "chanel", "channel", "charity", "chase", "chat", "cheap", "chintai", "christmas", "chrome", "church", "ci", "org.ci", "or.ci", "com.ci", "co.ci", "edu.ci", "ed.ci", "ac.ci", "net.ci", "go.ci", "asso.ci", "aéroport.ci", "int.ci", "presse.ci", "md.ci", "gouv.ci", "cipriani", "circle", "cisco", "citadel", "citi", "citic", "city", "*.ck", "!www.ck", "cl", "co.cl", "gob.cl", "gov.cl", "mil.cl", "claims", "cleaning", "click", "clinic", "clinique", "clothing", "cloud", "club", "clubmed", "cm", "co.cm", "com.cm", "gov.cm", "net.cm", "cn", "ac.cn", "com.cn", "edu.cn", "gov.cn", "net.cn", "org.cn", "mil.cn", "公司.cn", "网络.cn", "網絡.cn", "ah.cn", "bj.cn", "cq.cn", "fj.cn", "gd.cn", "gs.cn", "gz.cn", "gx.cn", "ha.cn", "hb.cn", "he.cn", "hi.cn", "hl.cn", "hn.cn", "jl.cn", "js.cn", "jx.cn", "ln.cn", "nm.cn", "nx.cn", "qh.cn", "sc.cn", "sd.cn", "sh.cn", "sn.cn", "sx.cn", "tj.cn", "xj.cn", "xz.cn", "yn.cn", "zj.cn", "hk.cn", "mo.cn", "tw.cn", "co", "arts.co", "com.co", "edu.co", "firm.co", "gov.co", "info.co", "int.co", "mil.co", "net.co", "nom.co", "org.co", "rec.co", "web.co", "coach", "codes", "coffee", "college", "cologne", "com", "commbank", "community", "company", "compare", "computer", "comsec", "condos", "construction", "consulting", "contact", "contractors", "cooking", "cool", "coop", "corsica", "country", "coupon", "coupons", "courses", "cpa", "cr", "ac.cr", "co.cr", "ed.cr", "fi.cr", "go.cr", "or.cr", "sa.cr", "credit", "creditcard", "creditunion", "cricket", "crown", "crs", "cruise", "cruises", "cu", "com.cu", "edu.cu", "org.cu", "net.cu", "gov.cu", "inf.cu", "cuisinella", "cv", "com.cv", "edu.cv", "int.cv", "nome.cv", "org.cv", "cw", "com.cw", "edu.cw", "net.cw", "org.cw", "cx", "gov.cx", "cy", "ac.cy", "biz.cy", "com.cy", "ekloges.cy", "gov.cy", "ltd.cy", "mil.cy", "net.cy", "org.cy", "press.cy", "pro.cy", "tm.cy", "cymru", "cyou", "cz", "dabur", "dad", "dance", "data", "date", "dating", "datsun", "day", "dclk", "dds", "de", "deal", "dealer", "deals", "degree", "delivery", "dell", "deloitte", "delta", "democrat", "dental", "dentist", "desi", "design", "dev", "dhl", "diamonds", "diet", "digital", "direct", "directory", "discount", "discover", "dish", "diy", "dj", "dk", "dm", "com.dm", "net.dm", "org.dm", "edu.dm", "gov.dm", "dnp", "do", "art.do", "com.do", "edu.do", "gob.do", "gov.do", "mil.do", "net.do", "org.do", "sld.do", "web.do", "docs", "doctor", "dog", "domains", "dot", "download", "drive", "dtv", "dubai", "dunlop", "dupont", "durban", "dvag", "dvr", "dz", "art.dz", "asso.dz", "com.dz", "edu.dz", "gov.dz", "org.dz", "net.dz", "pol.dz", "soc.dz", "tm.dz", "earth", "eat", "ec", "com.ec", "info.ec", "net.ec", "fin.ec", "k12.ec", "med.ec", "pro.ec", "org.ec", "edu.ec", "gov.ec", "gob.ec", "mil.ec", "eco", "edeka", "edu", "education", "ee", "edu.ee", "gov.ee", "riik.ee", "lib.ee", "med.ee", "com.ee", "pri.ee", "aip.ee", "org.ee", "fie.ee", "eg", "com.eg", "edu.eg", "eun.eg", "gov.eg", "mil.eg", "name.eg", "net.eg", "org.eg", "sci.eg", "email", "emerck", "energy", "engineer", "engineering", "enterprises", "epson", "equipment", "*.er", "ericsson", "erni", "es", "com.es", "nom.es", "org.es", "gob.es", "edu.es", "esq", "estate", "et", "com.et", "gov.et", "org.et", "edu.et", "biz.et", "name.et", "info.et", "net.et", "eu", "eurovision", "eus", "events", "exchange", "expert", "exposed", "express", "extraspace", "fage", "fail", "fairwinds", "faith", "family", "fan", "fans", "farm", "farmers", "fashion", "fast", "fedex", "feedback", "ferrari", "ferrero", "fi", "aland.fi", "fidelity", "fido", "film", "final", "finance", "financial", "fire", "firestone", "firmdale", "fish", "fishing", "fit", "fitness", "fj", "ac.fj", "biz.fj", "com.fj", "gov.fj", "info.fj", "mil.fj", "name.fj", "net.fj", "org.fj", "pro.fj", "*.fk", "flickr", "flights", "flir", "florist", "flowers", "fly", "com.fm", "edu.fm", "net.fm", "org.fm", "fm", "fo", "foo", "food", "football", "ford", "forex", "forsale", "forum", "foundation", "fox", "fr", "asso.fr", "com.fr", "gouv.fr", "nom.fr", "prd.fr", "tm.fr", "avoues.fr", "cci.fr", "greta.fr", "huissier-justice.fr", "free", "fresenius", "frl", "frogans", "frontier", "ftr", "fujitsu", "fun", "fund", "furniture", "futbol", "fyi", "ga", "gal", "gallery", "gallo", "gallup", "game", "games", "gap", "garden", "gay", "gb", "gbiz", "edu.gd", "gov.gd", "gd", "gdn", "ge", "com.ge", "edu.ge", "gov.ge", "org.ge", "mil.ge", "net.ge", "pvt.ge", "gea", "gent", "genting", "george", "gf", "gg", "co.gg", "net.gg", "org.gg", "ggee", "gh", "com.gh", "edu.gh", "gov.gh", "org.gh", "mil.gh", "gi", "com.gi", "ltd.gi", "gov.gi", "mod.gi", "edu.gi", "org.gi", "gift", "gifts", "gives", "giving", "gl", "co.gl", "com.gl", "edu.gl", "net.gl", "org.gl", "glass", "gle", "global", "globo", "gm", "gmail", "gmbh", "gmo", "gmx", "gn", "ac.gn", "com.gn", "edu.gn", "gov.gn", "org.gn", "net.gn", "godaddy", "gold", "goldpoint", "golf", "goo", "goodyear", "goog", "google", "gop", "got", "gov", "gp", "com.gp", "net.gp", "mobi.gp", "edu.gp", "org.gp", "asso.gp", "gq", "gr", "com.gr", "edu.gr", "net.gr", "org.gr", "gov.gr", "grainger", "graphics", "gratis", "green", "gripe", "grocery", "group", "gs", "gt", "com.gt", "edu.gt", "gob.gt", "ind.gt", "mil.gt", "net.gt", "org.gt", "gu", "com.gu", "edu.gu", "gov.gu", "guam.gu", "info.gu", "net.gu", "org.gu", "web.gu", "gucci", "guge", "guide", "guitars", "guru", "gw", "gy", "co.gy", "com.gy", "edu.gy", "gov.gy", "net.gy", "org.gy", "hair", "hamburg", "hangout", "haus", "hbo", "hdfc", "hdfcbank", "health", "healthcare", "help", "helsinki", "here", "hermes", "hiphop", "hisamitsu", "hitachi", "hiv", "hk", "com.hk", "edu.hk", "gov.hk", "idv.hk", "net.hk", "org.hk", "公司.hk", "教育.hk", "敎育.hk", "政府.hk", "個人.hk", "个人.hk", "箇人.hk", "網络.hk", "网络.hk", "组織.hk", "網絡.hk", "网絡.hk", "组织.hk", "組織.hk", "組织.hk", "hkt", "hm", "hn", "com.hn", "edu.hn", "org.hn", "net.hn", "mil.hn", "gob.hn", "hockey", "holdings", "holiday", "homedepot", "homegoods", "homes", "homesense", "honda", "horse", "hospital", "host", "hosting", "hot", "hotels", "hotmail", "house", "how", "hr", "iz.hr", "from.hr", "name.hr", "com.hr", "hsbc", "ht", "com.ht", "shop.ht", "firm.ht", "info.ht", "adult.ht", "net.ht", "pro.ht", "org.ht", "med.ht", "art.ht", "coop.ht", "pol.ht", "asso.ht", "edu.ht", "rel.ht", "gouv.ht", "perso.ht", "hu", "co.hu", "info.hu", "org.hu", "priv.hu", "sport.hu", "tm.hu", "2000.hu", "agrar.hu", "bolt.hu", "casino.hu", "city.hu", "erotica.hu", "erotika.hu", "film.hu", "forum.hu", "games.hu", "hotel.hu", "ingatlan.hu", "jogasz.hu", "konyvelo.hu", "lakas.hu", "media.hu", "news.hu", "reklam.hu", "sex.hu", "shop.hu", "suli.hu", "szex.hu", "tozsde.hu", "utazas.hu", "video.hu", "hughes", "hyatt", "hyundai", "ibm", "icbc", "ice", "icu", "id", "ac.id", "biz.id", "co.id", "desa.id", "go.id", "mil.id", "my.id", "net.id", "or.id", "ponpes.id", "sch.id", "web.id", "ie", "gov.ie", "ieee", "ifm", "ikano", "il", "ac.il", "co.il", "gov.il", "idf.il", "k12.il", "muni.il", "net.il", "org.il", "im", "ac.im", "co.im", "com.im", "ltd.co.im", "net.im", "org.im", "plc.co.im", "tt.im", "tv.im", "imamat", "imdb", "immo", "immobilien", "in", "5g.in", "6g.in", "ac.in", "ai.in", "am.in", "bihar.in", "biz.in", "business.in", "ca.in", "cn.in", "co.in", "com.in", "coop.in", "cs.in", "delhi.in", "dr.in", "edu.in", "er.in", "firm.in", "gen.in", "gov.in", "gujarat.in", "ind.in", "info.in", "int.in", "internet.in", "io.in", "me.in", "mil.in", "net.in", "nic.in", "org.in", "pg.in", "post.in", "pro.in", "res.in", "travel.in", "tv.in", "uk.in", "up.in", "us.in", "inc", "industries", "infiniti", "info", "ing", "ink", "institute", "insurance", "insure", "int", "eu.int", "international", "intuit", "investments", "io", "com.io", "ipiranga", "iq", "gov.iq", "edu.iq", "mil.iq", "com.iq", "org.iq", "net.iq", "ir", "ac.ir", "co.ir", "gov.ir", "id.ir", "net.ir", "org.ir", "sch.ir", "ایران.ir", "ايران.ir", "irish", "is", "net.is", "com.is", "edu.is", "gov.is", "org.is", "int.is", "ismaili", "ist", "istanbul", "it", "gov.it", "edu.it", "abr.it", "abruzzo.it", "aosta-valley.it", "aostavalley.it", "bas.it", "basilicata.it", "cal.it", "calabria.it", "cam.it", "campania.it", "emilia-romagna.it", "emiliaromagna.it", "emr.it", "friuli-v-giulia.it", "friuli-ve-giulia.it", "friuli-vegiulia.it", "friuli-venezia-giulia.it", "friuli-veneziagiulia.it", "friuli-vgiulia.it", "friuliv-giulia.it", "friulive-giulia.it", "friulivegiulia.it", "friulivenezia-giulia.it", "friuliveneziagiulia.it", "friulivgiulia.it", "fvg.it", "laz.it", "lazio.it", "lig.it", "liguria.it", "lom.it", "lombardia.it", "lombardy.it", "lucania.it", "mar.it", "marche.it", "mol.it", "molise.it", "piedmont.it", "piemonte.it", "pmn.it", "pug.it", "puglia.it", "sar.it", "sardegna.it", "sardinia.it", "sic.it", "sicilia.it", "sicily.it", "taa.it", "tos.it", "toscana.it", "trentin-sud-tirol.it", "trentin-süd-tirol.it", "trentin-sudtirol.it", "trentin-südtirol.it", "trentin-sued-tirol.it", "trentin-suedtirol.it", "trentino-a-adige.it", "trentino-aadige.it", "trentino-alto-adige.it", "trentino-altoadige.it", "trentino-s-tirol.it", "trentino-stirol.it", "trentino-sud-tirol.it", "trentino-süd-tirol.it", "trentino-sudtirol.it", "trentino-südtirol.it", "trentino-sued-tirol.it", "trentino-suedtirol.it", "trentino.it", "trentinoa-adige.it", "trentinoaadige.it", "trentinoalto-adige.it", "trentinoaltoadige.it", "trentinos-tirol.it", "trentinostirol.it", "trentinosud-tirol.it", "trentinosüd-tirol.it", "trentinosudtirol.it", "trentinosüdtirol.it", "trentinosued-tirol.it", "trentinosuedtirol.it", "trentinsud-tirol.it", "trentinsüd-tirol.it", "trentinsudtirol.it", "trentinsüdtirol.it", "trentinsued-tirol.it", "trentinsuedtirol.it", "tuscany.it", "umb.it", "umbria.it", "val-d-aosta.it", "val-daosta.it", "vald-aosta.it", "valdaosta.it", "valle-aosta.it", "valle-d-aosta.it", "valle-daosta.it", "valleaosta.it", "valled-aosta.it", "valledaosta.it", "vallee-aoste.it", "vallée-aoste.it", "vallee-d-aoste.it", "vallée-d-aoste.it", "valleeaoste.it", "valléeaoste.it", "valleedaoste.it", "valléedaoste.it", "vao.it", "vda.it", "ven.it", "veneto.it", "ag.it", "agrigento.it", "al.it", "alessandria.it", "alto-adige.it", "altoadige.it", "an.it", "ancona.it", "andria-barletta-trani.it", "andria-trani-barletta.it", "andriabarlettatrani.it", "andriatranibarletta.it", "ao.it", "aosta.it", "aoste.it", "ap.it", "aq.it", "aquila.it", "ar.it", "arezzo.it", "ascoli-piceno.it", "ascolipiceno.it", "asti.it", "at.it", "av.it", "avellino.it", "ba.it", "balsan-sudtirol.it", "balsan-südtirol.it", "balsan-suedtirol.it", "balsan.it", "bari.it", "barletta-trani-andria.it", "barlettatraniandria.it", "belluno.it", "benevento.it", "bergamo.it", "bg.it", "bi.it", "biella.it", "bl.it", "bn.it", "bo.it", "bologna.it", "bolzano-altoadige.it", "bolzano.it", "bozen-sudtirol.it", "bozen-südtirol.it", "bozen-suedtirol.it", "bozen.it", "br.it", "brescia.it", "brindisi.it", "bs.it", "bt.it", "bulsan-sudtirol.it", "bulsan-südtirol.it", "bulsan-suedtirol.it", "bulsan.it", "bz.it", "ca.it", "cagliari.it", "caltanissetta.it", "campidano-medio.it", "campidanomedio.it", "campobasso.it", "carbonia-iglesias.it", "carboniaiglesias.it", "carrara-massa.it", "carraramassa.it", "caserta.it", "catania.it", "catanzaro.it", "cb.it", "ce.it", "cesena-forli.it", "cesena-forlì.it", "cesenaforli.it", "cesenaforlì.it", "ch.it", "chieti.it", "ci.it", "cl.it", "cn.it", "co.it", "como.it", "cosenza.it", "cr.it", "cremona.it", "crotone.it", "cs.it", "ct.it", "cuneo.it", "cz.it", "dell-ogliastra.it", "dellogliastra.it", "en.it", "enna.it", "fc.it", "fe.it", "fermo.it", "ferrara.it", "fg.it", "fi.it", "firenze.it", "florence.it", "fm.it", "foggia.it", "forli-cesena.it", "forlì-cesena.it", "forlicesena.it", "forlìcesena.it", "fr.it", "frosinone.it", "ge.it", "genoa.it", "genova.it", "go.it", "gorizia.it", "gr.it", "grosseto.it", "iglesias-carbonia.it", "iglesiascarbonia.it", "im.it", "imperia.it", "is.it", "isernia.it", "kr.it", "la-spezia.it", "laquila.it", "laspezia.it", "latina.it", "lc.it", "le.it", "lecce.it", "lecco.it", "li.it", "livorno.it", "lo.it", "lodi.it", "lt.it", "lu.it", "lucca.it", "macerata.it", "mantova.it", "massa-carrara.it", "massacarrara.it", "matera.it", "mb.it", "mc.it", "me.it", "medio-campidano.it", "mediocampidano.it", "messina.it", "mi.it", "milan.it", "milano.it", "mn.it", "mo.it", "modena.it", "monza-brianza.it", "monza-e-della-brianza.it", "monza.it", "monzabrianza.it", "monzaebrianza.it", "monzaedellabrianza.it", "ms.it", "mt.it", "na.it", "naples.it", "napoli.it", "no.it", "novara.it", "nu.it", "nuoro.it", "og.it", "ogliastra.it", "olbia-tempio.it", "olbiatempio.it", "or.it", "oristano.it", "ot.it", "pa.it", "padova.it", "padua.it", "palermo.it", "parma.it", "pavia.it", "pc.it", "pd.it", "pe.it", "perugia.it", "pesaro-urbino.it", "pesarourbino.it", "pescara.it", "pg.it", "pi.it", "piacenza.it", "pisa.it", "pistoia.it", "pn.it", "po.it", "pordenone.it", "potenza.it", "pr.it", "prato.it", "pt.it", "pu.it", "pv.it", "pz.it", "ra.it", "ragusa.it", "ravenna.it", "rc.it", "re.it", "reggio-calabria.it", "reggio-emilia.it", "reggiocalabria.it", "reggioemilia.it", "rg.it", "ri.it", "rieti.it", "rimini.it", "rm.it", "rn.it", "ro.it", "roma.it", "rome.it", "rovigo.it", "sa.it", "salerno.it", "sassari.it", "savona.it", "si.it", "siena.it", "siracusa.it", "so.it", "sondrio.it", "sp.it", "sr.it", "ss.it", "suedtirol.it", "südtirol.it", "sv.it", "ta.it", "taranto.it", "te.it", "tempio-olbia.it", "tempioolbia.it", "teramo.it", "terni.it", "tn.it", "to.it", "torino.it", "tp.it", "tr.it", "trani-andria-barletta.it", "trani-barletta-andria.it", "traniandriabarletta.it", "tranibarlettaandria.it", "trapani.it", "trento.it", "treviso.it", "trieste.it", "ts.it", "turin.it", "tv.it", "ud.it", "udine.it", "urbino-pesaro.it", "urbinopesaro.it", "va.it", "varese.it", "vb.it", "vc.it", "ve.it", "venezia.it", "venice.it", "verbania.it", "vercelli.it", "verona.it", "vi.it", "vibo-valentia.it", "vibovalentia.it", "vicenza.it", "viterbo.it", "vr.it", "vs.it", "vt.it", "vv.it", "itau", "itv", "jaguar", "java", "jcb", "je", "co.je", "net.je", "org.je", "jeep", "jetzt", "jewelry", "jio", "jll", "*.jm", "jmp", "jnj", "jo", "com.jo", "org.jo", "net.jo", "edu.jo", "sch.jo", "gov.jo", "mil.jo", "name.jo", "jobs", "joburg", "jot", "joy", "jp", "ac.jp", "ad.jp", "co.jp", "ed.jp", "go.jp", "gr.jp", "lg.jp", "ne.jp", "or.jp", "aichi.jp", "akita.jp", "aomori.jp", "chiba.jp", "ehime.jp", "fukui.jp", "fukuoka.jp", "fukushima.jp", "gifu.jp", "gunma.jp", "hiroshima.jp", "hokkaido.jp", "hyogo.jp", "ibaraki.jp", "ishikawa.jp", "iwate.jp", "kagawa.jp", "kagoshima.jp", "kanagawa.jp", "kochi.jp", "kumamoto.jp", "kyoto.jp", "mie.jp", "miyagi.jp", "miyazaki.jp", "nagano.jp", "nagasaki.jp", "nara.jp", "niigata.jp", "oita.jp", "okayama.jp", "okinawa.jp", "osaka.jp", "saga.jp", "saitama.jp", "shiga.jp", "shimane.jp", "shizuoka.jp", "tochigi.jp", "tokushima.jp", "tokyo.jp", "tottori.jp", "toyama.jp", "wakayama.jp", "yamagata.jp", "yamaguchi.jp", "yamanashi.jp", "栃木.jp", "愛知.jp", "愛媛.jp", "兵庫.jp", "熊本.jp", "茨城.jp", "北海道.jp", "千葉.jp", "和歌山.jp", "長崎.jp", "長野.jp", "新潟.jp", "青森.jp", "静岡.jp", "東京.jp", "石川.jp", "埼玉.jp", "三重.jp", "京都.jp", "佐賀.jp", "大分.jp", "大阪.jp", "奈良.jp", "宮城.jp", "宮崎.jp", "富山.jp", "山口.jp", "山形.jp", "山梨.jp", "岩手.jp", "岐阜.jp", "岡山.jp", "島根.jp", "広島.jp", "徳島.jp", "沖縄.jp", "滋賀.jp", "神奈川.jp", "福井.jp", "福岡.jp", "福島.jp", "秋田.jp", "群馬.jp", "香川.jp", "高知.jp", "鳥取.jp", "鹿児島.jp", "*.kawasaki.jp", "*.kitakyushu.jp", "*.kobe.jp", "*.nagoya.jp", "*.sapporo.jp", "*.sendai.jp", "*.yokohama.jp", "!city.kawasaki.jp", "!city.kitakyushu.jp", "!city.kobe.jp", "!city.nagoya.jp", "!city.sapporo.jp", "!city.sendai.jp", "!city.yokohama.jp", "aisai.aichi.jp", "ama.aichi.jp", "anjo.aichi.jp", "asuke.aichi.jp", "chiryu.aichi.jp", "chita.aichi.jp", "fuso.aichi.jp", "gamagori.aichi.jp", "handa.aichi.jp", "hazu.aichi.jp", "hekinan.aichi.jp", "higashiura.aichi.jp", "ichinomiya.aichi.jp", "inazawa.aichi.jp", "inuyama.aichi.jp", "isshiki.aichi.jp", "iwakura.aichi.jp", "kanie.aichi.jp", "kariya.aichi.jp", "kasugai.aichi.jp", "kira.aichi.jp", "kiyosu.aichi.jp", "komaki.aichi.jp", "konan.aichi.jp", "kota.aichi.jp", "mihama.aichi.jp", "miyoshi.aichi.jp", "nishio.aichi.jp", "nisshin.aichi.jp", "obu.aichi.jp", "oguchi.aichi.jp", "oharu.aichi.jp", "okazaki.aichi.jp", "owariasahi.aichi.jp", "seto.aichi.jp", "shikatsu.aichi.jp", "shinshiro.aichi.jp", "shitara.aichi.jp", "tahara.aichi.jp", "takahama.aichi.jp", "tobishima.aichi.jp", "toei.aichi.jp", "togo.aichi.jp", "tokai.aichi.jp", "tokoname.aichi.jp", "toyoake.aichi.jp", "toyohashi.aichi.jp", "toyokawa.aichi.jp", "toyone.aichi.jp", "toyota.aichi.jp", "tsushima.aichi.jp", "yatomi.aichi.jp", "akita.akita.jp", "daisen.akita.jp", "fujisato.akita.jp", "gojome.akita.jp", "hachirogata.akita.jp", "happou.akita.jp", "higashinaruse.akita.jp", "honjo.akita.jp", "honjyo.akita.jp", "ikawa.akita.jp", "kamikoani.akita.jp", "kamioka.akita.jp", "katagami.akita.jp", "kazuno.akita.jp", "kitaakita.akita.jp", "kosaka.akita.jp", "kyowa.akita.jp", "misato.akita.jp", "mitane.akita.jp", "moriyoshi.akita.jp", "nikaho.akita.jp", "noshiro.akita.jp", "odate.akita.jp", "oga.akita.jp", "ogata.akita.jp", "semboku.akita.jp", "yokote.akita.jp", "yurihonjo.akita.jp", "aomori.aomori.jp", "gonohe.aomori.jp", "hachinohe.aomori.jp", "hashikami.aomori.jp", "hiranai.aomori.jp", "hirosaki.aomori.jp", "itayanagi.aomori.jp", "kuroishi.aomori.jp", "misawa.aomori.jp", "mutsu.aomori.jp", "nakadomari.aomori.jp", "noheji.aomori.jp", "oirase.aomori.jp", "owani.aomori.jp", "rokunohe.aomori.jp", "sannohe.aomori.jp", "shichinohe.aomori.jp", "shingo.aomori.jp", "takko.aomori.jp", "towada.aomori.jp", "tsugaru.aomori.jp", "tsuruta.aomori.jp", "abiko.chiba.jp", "asahi.chiba.jp", "chonan.chiba.jp", "chosei.chiba.jp", "choshi.chiba.jp", "chuo.chiba.jp", "funabashi.chiba.jp", "futtsu.chiba.jp", "hanamigawa.chiba.jp", "ichihara.chiba.jp", "ichikawa.chiba.jp", "ichinomiya.chiba.jp", "inzai.chiba.jp", "isumi.chiba.jp", "kamagaya.chiba.jp", "kamogawa.chiba.jp", "kashiwa.chiba.jp", "katori.chiba.jp", "katsuura.chiba.jp", "kimitsu.chiba.jp", "kisarazu.chiba.jp", "kozaki.chiba.jp", "kujukuri.chiba.jp", "kyonan.chiba.jp", "matsudo.chiba.jp", "midori.chiba.jp", "mihama.chiba.jp", "minamiboso.chiba.jp", "mobara.chiba.jp", "mutsuzawa.chiba.jp", "nagara.chiba.jp", "nagareyama.chiba.jp", "narashino.chiba.jp", "narita.chiba.jp", "noda.chiba.jp", "oamishirasato.chiba.jp", "omigawa.chiba.jp", "onjuku.chiba.jp", "otaki.chiba.jp", "sakae.chiba.jp", "sakura.chiba.jp", "shimofusa.chiba.jp", "shirako.chiba.jp", "shiroi.chiba.jp", "shisui.chiba.jp", "sodegaura.chiba.jp", "sosa.chiba.jp", "tako.chiba.jp", "tateyama.chiba.jp", "togane.chiba.jp", "tohnosho.chiba.jp", "tomisato.chiba.jp", "urayasu.chiba.jp", "yachimata.chiba.jp", "yachiyo.chiba.jp", "yokaichiba.chiba.jp", "yokoshibahikari.chiba.jp", "yotsukaido.chiba.jp", "ainan.ehime.jp", "honai.ehime.jp", "ikata.ehime.jp", "imabari.ehime.jp", "iyo.ehime.jp", "kamijima.ehime.jp", "kihoku.ehime.jp", "kumakogen.ehime.jp", "masaki.ehime.jp", "matsuno.ehime.jp", "matsuyama.ehime.jp", "namikata.ehime.jp", "niihama.ehime.jp", "ozu.ehime.jp", "saijo.ehime.jp", "seiyo.ehime.jp", "shikokuchuo.ehime.jp", "tobe.ehime.jp", "toon.ehime.jp", "uchiko.ehime.jp", "uwajima.ehime.jp", "yawatahama.ehime.jp", "echizen.fukui.jp", "eiheiji.fukui.jp", "fukui.fukui.jp", "ikeda.fukui.jp", "katsuyama.fukui.jp", "mihama.fukui.jp", "minamiechizen.fukui.jp", "obama.fukui.jp", "ohi.fukui.jp", "ono.fukui.jp", "sabae.fukui.jp", "sakai.fukui.jp", "takahama.fukui.jp", "tsuruga.fukui.jp", "wakasa.fukui.jp", "ashiya.fukuoka.jp", "buzen.fukuoka.jp", "chikugo.fukuoka.jp", "chikuho.fukuoka.jp", "chikujo.fukuoka.jp", "chikushino.fukuoka.jp", "chikuzen.fukuoka.jp", "chuo.fukuoka.jp", "dazaifu.fukuoka.jp", "fukuchi.fukuoka.jp", "hakata.fukuoka.jp", "higashi.fukuoka.jp", "hirokawa.fukuoka.jp", "hisayama.fukuoka.jp", "iizuka.fukuoka.jp", "inatsuki.fukuoka.jp", "kaho.fukuoka.jp", "kasuga.fukuoka.jp", "kasuya.fukuoka.jp", "kawara.fukuoka.jp", "keisen.fukuoka.jp", "koga.fukuoka.jp", "kurate.fukuoka.jp", "kurogi.fukuoka.jp", "kurume.fukuoka.jp", "minami.fukuoka.jp", "miyako.fukuoka.jp", "miyama.fukuoka.jp", "miyawaka.fukuoka.jp", "mizumaki.fukuoka.jp", "munakata.fukuoka.jp", "nakagawa.fukuoka.jp", "nakama.fukuoka.jp", "nishi.fukuoka.jp", "nogata.fukuoka.jp", "ogori.fukuoka.jp", "okagaki.fukuoka.jp", "okawa.fukuoka.jp", "oki.fukuoka.jp", "omuta.fukuoka.jp", "onga.fukuoka.jp", "onojo.fukuoka.jp", "oto.fukuoka.jp", "saigawa.fukuoka.jp", "sasaguri.fukuoka.jp", "shingu.fukuoka.jp", "shinyoshitomi.fukuoka.jp", "shonai.fukuoka.jp", "soeda.fukuoka.jp", "sue.fukuoka.jp", "tachiarai.fukuoka.jp", "tagawa.fukuoka.jp", "takata.fukuoka.jp", "toho.fukuoka.jp", "toyotsu.fukuoka.jp", "tsuiki.fukuoka.jp", "ukiha.fukuoka.jp", "umi.fukuoka.jp", "usui.fukuoka.jp", "yamada.fukuoka.jp", "yame.fukuoka.jp", "yanagawa.fukuoka.jp", "yukuhashi.fukuoka.jp", "aizubange.fukushima.jp", "aizumisato.fukushima.jp", "aizuwakamatsu.fukushima.jp", "asakawa.fukushima.jp", "bandai.fukushima.jp", "date.fukushima.jp", "fukushima.fukushima.jp", "furudono.fukushima.jp", "futaba.fukushima.jp", "hanawa.fukushima.jp", "higashi.fukushima.jp", "hirata.fukushima.jp", "hirono.fukushima.jp", "iitate.fukushima.jp", "inawashiro.fukushima.jp", "ishikawa.fukushima.jp", "iwaki.fukushima.jp", "izumizaki.fukushima.jp", "kagamiishi.fukushima.jp", "kaneyama.fukushima.jp", "kawamata.fukushima.jp", "kitakata.fukushima.jp", "kitashiobara.fukushima.jp", "koori.fukushima.jp", "koriyama.fukushima.jp", "kunimi.fukushima.jp", "miharu.fukushima.jp", "mishima.fukushima.jp", "namie.fukushima.jp", "nango.fukushima.jp", "nishiaizu.fukushima.jp", "nishigo.fukushima.jp", "okuma.fukushima.jp", "omotego.fukushima.jp", "ono.fukushima.jp", "otama.fukushima.jp", "samegawa.fukushima.jp", "shimogo.fukushima.jp", "shirakawa.fukushima.jp", "showa.fukushima.jp", "soma.fukushima.jp", "sukagawa.fukushima.jp", "taishin.fukushima.jp", "tamakawa.fukushima.jp", "tanagura.fukushima.jp", "tenei.fukushima.jp", "yabuki.fukushima.jp", "yamato.fukushima.jp", "yamatsuri.fukushima.jp", "yanaizu.fukushima.jp", "yugawa.fukushima.jp", "anpachi.gifu.jp", "ena.gifu.jp", "gifu.gifu.jp", "ginan.gifu.jp", "godo.gifu.jp", "gujo.gifu.jp", "hashima.gifu.jp", "hichiso.gifu.jp", "hida.gifu.jp", "higashishirakawa.gifu.jp", "ibigawa.gifu.jp", "ikeda.gifu.jp", "kakamigahara.gifu.jp", "kani.gifu.jp", "kasahara.gifu.jp", "kasamatsu.gifu.jp", "kawaue.gifu.jp", "kitagata.gifu.jp", "mino.gifu.jp", "minokamo.gifu.jp", "mitake.gifu.jp", "mizunami.gifu.jp", "motosu.gifu.jp", "nakatsugawa.gifu.jp", "ogaki.gifu.jp", "sakahogi.gifu.jp", "seki.gifu.jp", "sekigahara.gifu.jp", "shirakawa.gifu.jp", "tajimi.gifu.jp", "takayama.gifu.jp", "tarui.gifu.jp", "toki.gifu.jp", "tomika.gifu.jp", "wanouchi.gifu.jp", "yamagata.gifu.jp", "yaotsu.gifu.jp", "yoro.gifu.jp", "annaka.gunma.jp", "chiyoda.gunma.jp", "fujioka.gunma.jp", "higashiagatsuma.gunma.jp", "isesaki.gunma.jp", "itakura.gunma.jp", "kanna.gunma.jp", "kanra.gunma.jp", "katashina.gunma.jp", "kawaba.gunma.jp", "kiryu.gunma.jp", "kusatsu.gunma.jp", "maebashi.gunma.jp", "meiwa.gunma.jp", "midori.gunma.jp", "minakami.gunma.jp", "naganohara.gunma.jp", "nakanojo.gunma.jp", "nanmoku.gunma.jp", "numata.gunma.jp", "oizumi.gunma.jp", "ora.gunma.jp", "ota.gunma.jp", "shibukawa.gunma.jp", "shimonita.gunma.jp", "shinto.gunma.jp", "showa.gunma.jp", "takasaki.gunma.jp", "takayama.gunma.jp", "tamamura.gunma.jp", "tatebayashi.gunma.jp", "tomioka.gunma.jp", "tsukiyono.gunma.jp", "tsumagoi.gunma.jp", "ueno.gunma.jp", "yoshioka.gunma.jp", "asaminami.hiroshima.jp", "daiwa.hiroshima.jp", "etajima.hiroshima.jp", "fuchu.hiroshima.jp", "fukuyama.hiroshima.jp", "hatsukaichi.hiroshima.jp", "higashihiroshima.hiroshima.jp", "hongo.hiroshima.jp", "jinsekikogen.hiroshima.jp", "kaita.hiroshima.jp", "kui.hiroshima.jp", "kumano.hiroshima.jp", "kure.hiroshima.jp", "mihara.hiroshima.jp", "miyoshi.hiroshima.jp", "naka.hiroshima.jp", "onomichi.hiroshima.jp", "osakikamijima.hiroshima.jp", "otake.hiroshima.jp", "saka.hiroshima.jp", "sera.hiroshima.jp", "seranishi.hiroshima.jp", "shinichi.hiroshima.jp", "shobara.hiroshima.jp", "takehara.hiroshima.jp", "abashiri.hokkaido.jp", "abira.hokkaido.jp", "aibetsu.hokkaido.jp", "akabira.hokkaido.jp", "akkeshi.hokkaido.jp", "asahikawa.hokkaido.jp", "ashibetsu.hokkaido.jp", "ashoro.hokkaido.jp", "assabu.hokkaido.jp", "atsuma.hokkaido.jp", "bibai.hokkaido.jp", "biei.hokkaido.jp", "bifuka.hokkaido.jp", "bihoro.hokkaido.jp", "biratori.hokkaido.jp", "chippubetsu.hokkaido.jp", "chitose.hokkaido.jp", "date.hokkaido.jp", "ebetsu.hokkaido.jp", "embetsu.hokkaido.jp", "eniwa.hokkaido.jp", "erimo.hokkaido.jp", "esan.hokkaido.jp", "esashi.hokkaido.jp", "fukagawa.hokkaido.jp", "fukushima.hokkaido.jp", "furano.hokkaido.jp", "furubira.hokkaido.jp", "haboro.hokkaido.jp", "hakodate.hokkaido.jp", "hamatonbetsu.hokkaido.jp", "hidaka.hokkaido.jp", "higashikagura.hokkaido.jp", "higashikawa.hokkaido.jp", "hiroo.hokkaido.jp", "hokuryu.hokkaido.jp", "hokuto.hokkaido.jp", "honbetsu.hokkaido.jp", "horokanai.hokkaido.jp", "horonobe.hokkaido.jp", "ikeda.hokkaido.jp", "imakane.hokkaido.jp", "ishikari.hokkaido.jp", "iwamizawa.hokkaido.jp", "iwanai.hokkaido.jp", "kamifurano.hokkaido.jp", "kamikawa.hokkaido.jp", "kamishihoro.hokkaido.jp", "kamisunagawa.hokkaido.jp", "kamoenai.hokkaido.jp", "kayabe.hokkaido.jp", "kembuchi.hokkaido.jp", "kikonai.hokkaido.jp", "kimobetsu.hokkaido.jp", "kitahiroshima.hokkaido.jp", "kitami.hokkaido.jp", "kiyosato.hokkaido.jp", "koshimizu.hokkaido.jp", "kunneppu.hokkaido.jp", "kuriyama.hokkaido.jp", "kuromatsunai.hokkaido.jp", "kushiro.hokkaido.jp", "kutchan.hokkaido.jp", "kyowa.hokkaido.jp", "mashike.hokkaido.jp", "matsumae.hokkaido.jp", "mikasa.hokkaido.jp", "minamifurano.hokkaido.jp", "mombetsu.hokkaido.jp", "moseushi.hokkaido.jp", "mukawa.hokkaido.jp", "muroran.hokkaido.jp", "naie.hokkaido.jp", "nakagawa.hokkaido.jp", "nakasatsunai.hokkaido.jp", "nakatombetsu.hokkaido.jp", "nanae.hokkaido.jp", "nanporo.hokkaido.jp", "nayoro.hokkaido.jp", "nemuro.hokkaido.jp", "niikappu.hokkaido.jp", "niki.hokkaido.jp", "nishiokoppe.hokkaido.jp", "noboribetsu.hokkaido.jp", "numata.hokkaido.jp", "obihiro.hokkaido.jp", "obira.hokkaido.jp", "oketo.hokkaido.jp", "okoppe.hokkaido.jp", "otaru.hokkaido.jp", "otobe.hokkaido.jp", "otofuke.hokkaido.jp", "otoineppu.hokkaido.jp", "oumu.hokkaido.jp", "ozora.hokkaido.jp", "pippu.hokkaido.jp", "rankoshi.hokkaido.jp", "rebun.hokkaido.jp", "rikubetsu.hokkaido.jp", "rishiri.hokkaido.jp", "rishirifuji.hokkaido.jp", "saroma.hokkaido.jp", "sarufutsu.hokkaido.jp", "shakotan.hokkaido.jp", "shari.hokkaido.jp", "shibecha.hokkaido.jp", "shibetsu.hokkaido.jp", "shikabe.hokkaido.jp", "shikaoi.hokkaido.jp", "shimamaki.hokkaido.jp", "shimizu.hokkaido.jp", "shimokawa.hokkaido.jp", "shinshinotsu.hokkaido.jp", "shintoku.hokkaido.jp", "shiranuka.hokkaido.jp", "shiraoi.hokkaido.jp", "shiriuchi.hokkaido.jp", "sobetsu.hokkaido.jp", "sunagawa.hokkaido.jp", "taiki.hokkaido.jp", "takasu.hokkaido.jp", "takikawa.hokkaido.jp", "takinoue.hokkaido.jp", "teshikaga.hokkaido.jp", "tobetsu.hokkaido.jp", "tohma.hokkaido.jp", "tomakomai.hokkaido.jp", "tomari.hokkaido.jp", "toya.hokkaido.jp", "toyako.hokkaido.jp", "toyotomi.hokkaido.jp", "toyoura.hokkaido.jp", "tsubetsu.hokkaido.jp", "tsukigata.hokkaido.jp", "urakawa.hokkaido.jp", "urausu.hokkaido.jp", "uryu.hokkaido.jp", "utashinai.hokkaido.jp", "wakkanai.hokkaido.jp", "wassamu.hokkaido.jp", "yakumo.hokkaido.jp", "yoichi.hokkaido.jp", "aioi.hyogo.jp", "akashi.hyogo.jp", "ako.hyogo.jp", "amagasaki.hyogo.jp", "aogaki.hyogo.jp", "asago.hyogo.jp", "ashiya.hyogo.jp", "awaji.hyogo.jp", "fukusaki.hyogo.jp", "goshiki.hyogo.jp", "harima.hyogo.jp", "himeji.hyogo.jp", "ichikawa.hyogo.jp", "inagawa.hyogo.jp", "itami.hyogo.jp", "kakogawa.hyogo.jp", "kamigori.hyogo.jp", "kamikawa.hyogo.jp", "kasai.hyogo.jp", "kasuga.hyogo.jp", "kawanishi.hyogo.jp", "miki.hyogo.jp", "minamiawaji.hyogo.jp", "nishinomiya.hyogo.jp", "nishiwaki.hyogo.jp", "ono.hyogo.jp", "sanda.hyogo.jp", "sannan.hyogo.jp", "sasayama.hyogo.jp", "sayo.hyogo.jp", "shingu.hyogo.jp", "shinonsen.hyogo.jp", "shiso.hyogo.jp", "sumoto.hyogo.jp", "taishi.hyogo.jp", "taka.hyogo.jp", "takarazuka.hyogo.jp", "takasago.hyogo.jp", "takino.hyogo.jp", "tamba.hyogo.jp", "tatsuno.hyogo.jp", "toyooka.hyogo.jp", "yabu.hyogo.jp", "yashiro.hyogo.jp", "yoka.hyogo.jp", "yokawa.hyogo.jp", "ami.ibaraki.jp", "asahi.ibaraki.jp", "bando.ibaraki.jp", "chikusei.ibaraki.jp", "daigo.ibaraki.jp", "fujishiro.ibaraki.jp", "hitachi.ibaraki.jp", "hitachinaka.ibaraki.jp", "hitachiomiya.ibaraki.jp", "hitachiota.ibaraki.jp", "ibaraki.ibaraki.jp", "ina.ibaraki.jp", "inashiki.ibaraki.jp", "itako.ibaraki.jp", "iwama.ibaraki.jp", "joso.ibaraki.jp", "kamisu.ibaraki.jp", "kasama.ibaraki.jp", "kashima.ibaraki.jp", "kasumigaura.ibaraki.jp", "koga.ibaraki.jp", "miho.ibaraki.jp", "mito.ibaraki.jp", "moriya.ibaraki.jp", "naka.ibaraki.jp", "namegata.ibaraki.jp", "oarai.ibaraki.jp", "ogawa.ibaraki.jp", "omitama.ibaraki.jp", "ryugasaki.ibaraki.jp", "sakai.ibaraki.jp", "sakuragawa.ibaraki.jp", "shimodate.ibaraki.jp", "shimotsuma.ibaraki.jp", "shirosato.ibaraki.jp", "sowa.ibaraki.jp", "suifu.ibaraki.jp", "takahagi.ibaraki.jp", "tamatsukuri.ibaraki.jp", "tokai.ibaraki.jp", "tomobe.ibaraki.jp", "tone.ibaraki.jp", "toride.ibaraki.jp", "tsuchiura.ibaraki.jp", "tsukuba.ibaraki.jp", "uchihara.ibaraki.jp", "ushiku.ibaraki.jp", "yachiyo.ibaraki.jp", "yamagata.ibaraki.jp", "yawara.ibaraki.jp", "yuki.ibaraki.jp", "anamizu.ishikawa.jp", "hakui.ishikawa.jp", "hakusan.ishikawa.jp", "kaga.ishikawa.jp", "kahoku.ishikawa.jp", "kanazawa.ishikawa.jp", "kawakita.ishikawa.jp", "komatsu.ishikawa.jp", "nakanoto.ishikawa.jp", "nanao.ishikawa.jp", "nomi.ishikawa.jp", "nonoichi.ishikawa.jp", "noto.ishikawa.jp", "shika.ishikawa.jp", "suzu.ishikawa.jp", "tsubata.ishikawa.jp", "tsurugi.ishikawa.jp", "uchinada.ishikawa.jp", "wajima.ishikawa.jp", "fudai.iwate.jp", "fujisawa.iwate.jp", "hanamaki.iwate.jp", "hiraizumi.iwate.jp", "hirono.iwate.jp", "ichinohe.iwate.jp", "ichinoseki.iwate.jp", "iwaizumi.iwate.jp", "iwate.iwate.jp", "joboji.iwate.jp", "kamaishi.iwate.jp", "kanegasaki.iwate.jp", "karumai.iwate.jp", "kawai.iwate.jp", "kitakami.iwate.jp", "kuji.iwate.jp", "kunohe.iwate.jp", "kuzumaki.iwate.jp", "miyako.iwate.jp", "mizusawa.iwate.jp", "morioka.iwate.jp", "ninohe.iwate.jp", "noda.iwate.jp", "ofunato.iwate.jp", "oshu.iwate.jp", "otsuchi.iwate.jp", "rikuzentakata.iwate.jp", "shiwa.iwate.jp", "shizukuishi.iwate.jp", "sumita.iwate.jp", "tanohata.iwate.jp", "tono.iwate.jp", "yahaba.iwate.jp", "yamada.iwate.jp", "ayagawa.kagawa.jp", "higashikagawa.kagawa.jp", "kanonji.kagawa.jp", "kotohira.kagawa.jp", "manno.kagawa.jp", "marugame.kagawa.jp", "mitoyo.kagawa.jp", "naoshima.kagawa.jp", "sanuki.kagawa.jp", "tadotsu.kagawa.jp", "takamatsu.kagawa.jp", "tonosho.kagawa.jp", "uchinomi.kagawa.jp", "utazu.kagawa.jp", "zentsuji.kagawa.jp", "akune.kagoshima.jp", "amami.kagoshima.jp", "hioki.kagoshima.jp", "isa.kagoshima.jp", "isen.kagoshima.jp", "izumi.kagoshima.jp", "kagoshima.kagoshima.jp", "kanoya.kagoshima.jp", "kawanabe.kagoshima.jp", "kinko.kagoshima.jp", "kouyama.kagoshima.jp", "makurazaki.kagoshima.jp", "matsumoto.kagoshima.jp", "minamitane.kagoshima.jp", "nakatane.kagoshima.jp", "nishinoomote.kagoshima.jp", "satsumasendai.kagoshima.jp", "soo.kagoshima.jp", "tarumizu.kagoshima.jp", "yusui.kagoshima.jp", "aikawa.kanagawa.jp", "atsugi.kanagawa.jp", "ayase.kanagawa.jp", "chigasaki.kanagawa.jp", "ebina.kanagawa.jp", "fujisawa.kanagawa.jp", "hadano.kanagawa.jp", "hakone.kanagawa.jp", "hiratsuka.kanagawa.jp", "isehara.kanagawa.jp", "kaisei.kanagawa.jp", "kamakura.kanagawa.jp", "kiyokawa.kanagawa.jp", "matsuda.kanagawa.jp", "minamiashigara.kanagawa.jp", "miura.kanagawa.jp", "nakai.kanagawa.jp", "ninomiya.kanagawa.jp", "odawara.kanagawa.jp", "oi.kanagawa.jp", "oiso.kanagawa.jp", "sagamihara.kanagawa.jp", "samukawa.kanagawa.jp", "tsukui.kanagawa.jp", "yamakita.kanagawa.jp", "yamato.kanagawa.jp", "yokosuka.kanagawa.jp", "yugawara.kanagawa.jp", "zama.kanagawa.jp", "zushi.kanagawa.jp", "aki.kochi.jp", "geisei.kochi.jp", "hidaka.kochi.jp", "higashitsuno.kochi.jp", "ino.kochi.jp", "kagami.kochi.jp", "kami.kochi.jp", "kitagawa.kochi.jp", "kochi.kochi.jp", "mihara.kochi.jp", "motoyama.kochi.jp", "muroto.kochi.jp", "nahari.kochi.jp", "nakamura.kochi.jp", "nankoku.kochi.jp", "nishitosa.kochi.jp", "niyodogawa.kochi.jp", "ochi.kochi.jp", "okawa.kochi.jp", "otoyo.kochi.jp", "otsuki.kochi.jp", "sakawa.kochi.jp", "sukumo.kochi.jp", "susaki.kochi.jp", "tosa.kochi.jp", "tosashimizu.kochi.jp", "toyo.kochi.jp", "tsuno.kochi.jp", "umaji.kochi.jp", "yasuda.kochi.jp", "yusuhara.kochi.jp", "amakusa.kumamoto.jp", "arao.kumamoto.jp", "aso.kumamoto.jp", "choyo.kumamoto.jp", "gyokuto.kumamoto.jp", "kamiamakusa.kumamoto.jp", "kikuchi.kumamoto.jp", "kumamoto.kumamoto.jp", "mashiki.kumamoto.jp", "mifune.kumamoto.jp", "minamata.kumamoto.jp", "minamioguni.kumamoto.jp", "nagasu.kumamoto.jp", "nishihara.kumamoto.jp", "oguni.kumamoto.jp", "ozu.kumamoto.jp", "sumoto.kumamoto.jp", "takamori.kumamoto.jp", "uki.kumamoto.jp", "uto.kumamoto.jp", "yamaga.kumamoto.jp", "yamato.kumamoto.jp", "yatsushiro.kumamoto.jp", "ayabe.kyoto.jp", "fukuchiyama.kyoto.jp", "higashiyama.kyoto.jp", "ide.kyoto.jp", "ine.kyoto.jp", "joyo.kyoto.jp", "kameoka.kyoto.jp", "kamo.kyoto.jp", "kita.kyoto.jp", "kizu.kyoto.jp", "kumiyama.kyoto.jp", "kyotamba.kyoto.jp", "kyotanabe.kyoto.jp", "kyotango.kyoto.jp", "maizuru.kyoto.jp", "minami.kyoto.jp", "minamiyamashiro.kyoto.jp", "miyazu.kyoto.jp", "muko.kyoto.jp", "nagaokakyo.kyoto.jp", "nakagyo.kyoto.jp", "nantan.kyoto.jp", "oyamazaki.kyoto.jp", "sakyo.kyoto.jp", "seika.kyoto.jp", "tanabe.kyoto.jp", "uji.kyoto.jp", "ujitawara.kyoto.jp", "wazuka.kyoto.jp", "yamashina.kyoto.jp", "yawata.kyoto.jp", "asahi.mie.jp", "inabe.mie.jp", "ise.mie.jp", "kameyama.mie.jp", "kawagoe.mie.jp", "kiho.mie.jp", "kisosaki.mie.jp", "kiwa.mie.jp", "komono.mie.jp", "kumano.mie.jp", "kuwana.mie.jp", "matsusaka.mie.jp", "meiwa.mie.jp", "mihama.mie.jp", "minamiise.mie.jp", "misugi.mie.jp", "miyama.mie.jp", "nabari.mie.jp", "shima.mie.jp", "suzuka.mie.jp", "tado.mie.jp", "taiki.mie.jp", "taki.mie.jp", "tamaki.mie.jp", "toba.mie.jp", "tsu.mie.jp", "udono.mie.jp", "ureshino.mie.jp", "watarai.mie.jp", "yokkaichi.mie.jp", "furukawa.miyagi.jp", "higashimatsushima.miyagi.jp", "ishinomaki.miyagi.jp", "iwanuma.miyagi.jp", "kakuda.miyagi.jp", "kami.miyagi.jp", "kawasaki.miyagi.jp", "marumori.miyagi.jp", "matsushima.miyagi.jp", "minamisanriku.miyagi.jp", "misato.miyagi.jp", "murata.miyagi.jp", "natori.miyagi.jp", "ogawara.miyagi.jp", "ohira.miyagi.jp", "onagawa.miyagi.jp", "osaki.miyagi.jp", "rifu.miyagi.jp", "semine.miyagi.jp", "shibata.miyagi.jp", "shichikashuku.miyagi.jp", "shikama.miyagi.jp", "shiogama.miyagi.jp", "shiroishi.miyagi.jp", "tagajo.miyagi.jp", "taiwa.miyagi.jp", "tome.miyagi.jp", "tomiya.miyagi.jp", "wakuya.miyagi.jp", "watari.miyagi.jp", "yamamoto.miyagi.jp", "zao.miyagi.jp", "aya.miyazaki.jp", "ebino.miyazaki.jp", "gokase.miyazaki.jp", "hyuga.miyazaki.jp", "kadogawa.miyazaki.jp", "kawaminami.miyazaki.jp", "kijo.miyazaki.jp", "kitagawa.miyazaki.jp", "kitakata.miyazaki.jp", "kitaura.miyazaki.jp", "kobayashi.miyazaki.jp", "kunitomi.miyazaki.jp", "kushima.miyazaki.jp", "mimata.miyazaki.jp", "miyakonojo.miyazaki.jp", "miyazaki.miyazaki.jp", "morotsuka.miyazaki.jp", "nichinan.miyazaki.jp", "nishimera.miyazaki.jp", "nobeoka.miyazaki.jp", "saito.miyazaki.jp", "shiiba.miyazaki.jp", "shintomi.miyazaki.jp", "takaharu.miyazaki.jp", "takanabe.miyazaki.jp", "takazaki.miyazaki.jp", "tsuno.miyazaki.jp", "achi.nagano.jp", "agematsu.nagano.jp", "anan.nagano.jp", "aoki.nagano.jp", "asahi.nagano.jp", "azumino.nagano.jp", "chikuhoku.nagano.jp", "chikuma.nagano.jp", "chino.nagano.jp", "fujimi.nagano.jp", "hakuba.nagano.jp", "hara.nagano.jp", "hiraya.nagano.jp", "iida.nagano.jp", "iijima.nagano.jp", "iiyama.nagano.jp", "iizuna.nagano.jp", "ikeda.nagano.jp", "ikusaka.nagano.jp", "ina.nagano.jp", "karuizawa.nagano.jp", "kawakami.nagano.jp", "kiso.nagano.jp", "kisofukushima.nagano.jp", "kitaaiki.nagano.jp", "komagane.nagano.jp", "komoro.nagano.jp", "matsukawa.nagano.jp", "matsumoto.nagano.jp", "miasa.nagano.jp", "minamiaiki.nagano.jp", "minamimaki.nagano.jp", "minamiminowa.nagano.jp", "minowa.nagano.jp", "miyada.nagano.jp", "miyota.nagano.jp", "mochizuki.nagano.jp", "nagano.nagano.jp", "nagawa.nagano.jp", "nagiso.nagano.jp", "nakagawa.nagano.jp", "nakano.nagano.jp", "nozawaonsen.nagano.jp", "obuse.nagano.jp", "ogawa.nagano.jp", "okaya.nagano.jp", "omachi.nagano.jp", "omi.nagano.jp", "ookuwa.nagano.jp", "ooshika.nagano.jp", "otaki.nagano.jp", "otari.nagano.jp", "sakae.nagano.jp", "sakaki.nagano.jp", "saku.nagano.jp", "sakuho.nagano.jp", "shimosuwa.nagano.jp", "shinanomachi.nagano.jp", "shiojiri.nagano.jp", "suwa.nagano.jp", "suzaka.nagano.jp", "takagi.nagano.jp", "takamori.nagano.jp", "takayama.nagano.jp", "tateshina.nagano.jp", "tatsuno.nagano.jp", "togakushi.nagano.jp", "togura.nagano.jp", "tomi.nagano.jp", "ueda.nagano.jp", "wada.nagano.jp", "yamagata.nagano.jp", "yamanouchi.nagano.jp", "yasaka.nagano.jp", "yasuoka.nagano.jp", "chijiwa.nagasaki.jp", "futsu.nagasaki.jp", "goto.nagasaki.jp", "hasami.nagasaki.jp", "hirado.nagasaki.jp", "iki.nagasaki.jp", "isahaya.nagasaki.jp", "kawatana.nagasaki.jp", "kuchinotsu.nagasaki.jp", "matsuura.nagasaki.jp", "nagasaki.nagasaki.jp", "obama.nagasaki.jp", "omura.nagasaki.jp", "oseto.nagasaki.jp", "saikai.nagasaki.jp", "sasebo.nagasaki.jp", "seihi.nagasaki.jp", "shimabara.nagasaki.jp", "shinkamigoto.nagasaki.jp", "togitsu.nagasaki.jp", "tsushima.nagasaki.jp", "unzen.nagasaki.jp", "ando.nara.jp", "gose.nara.jp", "heguri.nara.jp", "higashiyoshino.nara.jp", "ikaruga.nara.jp", "ikoma.nara.jp", "kamikitayama.nara.jp", "kanmaki.nara.jp", "kashiba.nara.jp", "kashihara.nara.jp", "katsuragi.nara.jp", "kawai.nara.jp", "kawakami.nara.jp", "kawanishi.nara.jp", "koryo.nara.jp", "kurotaki.nara.jp", "mitsue.nara.jp", "miyake.nara.jp", "nara.nara.jp", "nosegawa.nara.jp", "oji.nara.jp", "ouda.nara.jp", "oyodo.nara.jp", "sakurai.nara.jp", "sango.nara.jp", "shimoichi.nara.jp", "shimokitayama.nara.jp", "shinjo.nara.jp", "soni.nara.jp", "takatori.nara.jp", "tawaramoto.nara.jp", "tenkawa.nara.jp", "tenri.nara.jp", "uda.nara.jp", "yamatokoriyama.nara.jp", "yamatotakada.nara.jp", "yamazoe.nara.jp", "yoshino.nara.jp", "aga.niigata.jp", "agano.niigata.jp", "gosen.niigata.jp", "itoigawa.niigata.jp", "izumozaki.niigata.jp", "joetsu.niigata.jp", "kamo.niigata.jp", "kariwa.niigata.jp", "kashiwazaki.niigata.jp", "minamiuonuma.niigata.jp", "mitsuke.niigata.jp", "muika.niigata.jp", "murakami.niigata.jp", "myoko.niigata.jp", "nagaoka.niigata.jp", "niigata.niigata.jp", "ojiya.niigata.jp", "omi.niigata.jp", "sado.niigata.jp", "sanjo.niigata.jp", "seiro.niigata.jp", "seirou.niigata.jp", "sekikawa.niigata.jp", "shibata.niigata.jp", "tagami.niigata.jp", "tainai.niigata.jp", "tochio.niigata.jp", "tokamachi.niigata.jp", "tsubame.niigata.jp", "tsunan.niigata.jp", "uonuma.niigata.jp", "yahiko.niigata.jp", "yoita.niigata.jp", "yuzawa.niigata.jp", "beppu.oita.jp", "bungoono.oita.jp", "bungotakada.oita.jp", "hasama.oita.jp", "hiji.oita.jp", "himeshima.oita.jp", "hita.oita.jp", "kamitsue.oita.jp", "kokonoe.oita.jp", "kuju.oita.jp", "kunisaki.oita.jp", "kusu.oita.jp", "oita.oita.jp", "saiki.oita.jp", "taketa.oita.jp", "tsukumi.oita.jp", "usa.oita.jp", "usuki.oita.jp", "yufu.oita.jp", "akaiwa.okayama.jp", "asakuchi.okayama.jp", "bizen.okayama.jp", "hayashima.okayama.jp", "ibara.okayama.jp", "kagamino.okayama.jp", "kasaoka.okayama.jp", "kibichuo.okayama.jp", "kumenan.okayama.jp", "kurashiki.okayama.jp", "maniwa.okayama.jp", "misaki.okayama.jp", "nagi.okayama.jp", "niimi.okayama.jp", "nishiawakura.okayama.jp", "okayama.okayama.jp", "satosho.okayama.jp", "setouchi.okayama.jp", "shinjo.okayama.jp", "shoo.okayama.jp", "soja.okayama.jp", "takahashi.okayama.jp", "tamano.okayama.jp", "tsuyama.okayama.jp", "wake.okayama.jp", "yakage.okayama.jp", "aguni.okinawa.jp", "ginowan.okinawa.jp", "ginoza.okinawa.jp", "gushikami.okinawa.jp", "haebaru.okinawa.jp", "higashi.okinawa.jp", "hirara.okinawa.jp", "iheya.okinawa.jp", "ishigaki.okinawa.jp", "ishikawa.okinawa.jp", "itoman.okinawa.jp", "izena.okinawa.jp", "kadena.okinawa.jp", "kin.okinawa.jp", "kitadaito.okinawa.jp", "kitanakagusuku.okinawa.jp", "kumejima.okinawa.jp", "kunigami.okinawa.jp", "minamidaito.okinawa.jp", "motobu.okinawa.jp", "nago.okinawa.jp", "naha.okinawa.jp", "nakagusuku.okinawa.jp", "nakijin.okinawa.jp", "nanjo.okinawa.jp", "nishihara.okinawa.jp", "ogimi.okinawa.jp", "okinawa.okinawa.jp", "onna.okinawa.jp", "shimoji.okinawa.jp", "taketomi.okinawa.jp", "tarama.okinawa.jp", "tokashiki.okinawa.jp", "tomigusuku.okinawa.jp", "tonaki.okinawa.jp", "urasoe.okinawa.jp", "uruma.okinawa.jp", "yaese.okinawa.jp", "yomitan.okinawa.jp", "yonabaru.okinawa.jp", "yonaguni.okinawa.jp", "zamami.okinawa.jp", "abeno.osaka.jp", "chihayaakasaka.osaka.jp", "chuo.osaka.jp", "daito.osaka.jp", "fujiidera.osaka.jp", "habikino.osaka.jp", "hannan.osaka.jp", "higashiosaka.osaka.jp", "higashisumiyoshi.osaka.jp", "higashiyodogawa.osaka.jp", "hirakata.osaka.jp", "ibaraki.osaka.jp", "ikeda.osaka.jp", "izumi.osaka.jp", "izumiotsu.osaka.jp", "izumisano.osaka.jp", "kadoma.osaka.jp", "kaizuka.osaka.jp", "kanan.osaka.jp", "kashiwara.osaka.jp", "katano.osaka.jp", "kawachinagano.osaka.jp", "kishiwada.osaka.jp", "kita.osaka.jp", "kumatori.osaka.jp", "matsubara.osaka.jp", "minato.osaka.jp", "minoh.osaka.jp", "misaki.osaka.jp", "moriguchi.osaka.jp", "neyagawa.osaka.jp", "nishi.osaka.jp", "nose.osaka.jp", "osakasayama.osaka.jp", "sakai.osaka.jp", "sayama.osaka.jp", "sennan.osaka.jp", "settsu.osaka.jp", "shijonawate.osaka.jp", "shimamoto.osaka.jp", "suita.osaka.jp", "tadaoka.osaka.jp", "taishi.osaka.jp", "tajiri.osaka.jp", "takaishi.osaka.jp", "takatsuki.osaka.jp", "tondabayashi.osaka.jp", "toyonaka.osaka.jp", "toyono.osaka.jp", "yao.osaka.jp", "ariake.saga.jp", "arita.saga.jp", "fukudomi.saga.jp", "genkai.saga.jp", "hamatama.saga.jp", "hizen.saga.jp", "imari.saga.jp", "kamimine.saga.jp", "kanzaki.saga.jp", "karatsu.saga.jp", "kashima.saga.jp", "kitagata.saga.jp", "kitahata.saga.jp", "kiyama.saga.jp", "kouhoku.saga.jp", "kyuragi.saga.jp", "nishiarita.saga.jp", "ogi.saga.jp", "omachi.saga.jp", "ouchi.saga.jp", "saga.saga.jp", "shiroishi.saga.jp", "taku.saga.jp", "tara.saga.jp", "tosu.saga.jp", "yoshinogari.saga.jp", "arakawa.saitama.jp", "asaka.saitama.jp", "chichibu.saitama.jp", "fujimi.saitama.jp", "fujimino.saitama.jp", "fukaya.saitama.jp", "hanno.saitama.jp", "hanyu.saitama.jp", "hasuda.saitama.jp", "hatogaya.saitama.jp", "hatoyama.saitama.jp", "hidaka.saitama.jp", "higashichichibu.saitama.jp", "higashimatsuyama.saitama.jp", "honjo.saitama.jp", "ina.saitama.jp", "iruma.saitama.jp", "iwatsuki.saitama.jp", "kamiizumi.saitama.jp", "kamikawa.saitama.jp", "kamisato.saitama.jp", "kasukabe.saitama.jp", "kawagoe.saitama.jp", "kawaguchi.saitama.jp", "kawajima.saitama.jp", "kazo.saitama.jp", "kitamoto.saitama.jp", "koshigaya.saitama.jp", "kounosu.saitama.jp", "kuki.saitama.jp", "kumagaya.saitama.jp", "matsubushi.saitama.jp", "minano.saitama.jp", "misato.saitama.jp", "miyashiro.saitama.jp", "miyoshi.saitama.jp", "moroyama.saitama.jp", "nagatoro.saitama.jp", "namegawa.saitama.jp", "niiza.saitama.jp", "ogano.saitama.jp", "ogawa.saitama.jp", "ogose.saitama.jp", "okegawa.saitama.jp", "omiya.saitama.jp", "otaki.saitama.jp", "ranzan.saitama.jp", "ryokami.saitama.jp", "saitama.saitama.jp", "sakado.saitama.jp", "satte.saitama.jp", "sayama.saitama.jp", "shiki.saitama.jp", "shiraoka.saitama.jp", "soka.saitama.jp", "sugito.saitama.jp", "toda.saitama.jp", "tokigawa.saitama.jp", "tokorozawa.saitama.jp", "tsurugashima.saitama.jp", "urawa.saitama.jp", "warabi.saitama.jp", "yashio.saitama.jp", "yokoze.saitama.jp", "yono.saitama.jp", "yorii.saitama.jp", "yoshida.saitama.jp", "yoshikawa.saitama.jp", "yoshimi.saitama.jp", "aisho.shiga.jp", "gamo.shiga.jp", "higashiomi.shiga.jp", "hikone.shiga.jp", "koka.shiga.jp", "konan.shiga.jp", "kosei.shiga.jp", "koto.shiga.jp", "kusatsu.shiga.jp", "maibara.shiga.jp", "moriyama.shiga.jp", "nagahama.shiga.jp", "nishiazai.shiga.jp", "notogawa.shiga.jp", "omihachiman.shiga.jp", "otsu.shiga.jp", "ritto.shiga.jp", "ryuoh.shiga.jp", "takashima.shiga.jp", "takatsuki.shiga.jp", "torahime.shiga.jp", "toyosato.shiga.jp", "yasu.shiga.jp", "akagi.shimane.jp", "ama.shimane.jp", "gotsu.shimane.jp", "hamada.shimane.jp", "higashiizumo.shimane.jp", "hikawa.shimane.jp", "hikimi.shimane.jp", "izumo.shimane.jp", "kakinoki.shimane.jp", "masuda.shimane.jp", "matsue.shimane.jp", "misato.shimane.jp", "nishinoshima.shimane.jp", "ohda.shimane.jp", "okinoshima.shimane.jp", "okuizumo.shimane.jp", "shimane.shimane.jp", "tamayu.shimane.jp", "tsuwano.shimane.jp", "unnan.shimane.jp", "yakumo.shimane.jp", "yasugi.shimane.jp", "yatsuka.shimane.jp", "arai.shizuoka.jp", "atami.shizuoka.jp", "fuji.shizuoka.jp", "fujieda.shizuoka.jp", "fujikawa.shizuoka.jp", "fujinomiya.shizuoka.jp", "fukuroi.shizuoka.jp", "gotemba.shizuoka.jp", "haibara.shizuoka.jp", "hamamatsu.shizuoka.jp", "higashiizu.shizuoka.jp", "ito.shizuoka.jp", "iwata.shizuoka.jp", "izu.shizuoka.jp", "izunokuni.shizuoka.jp", "kakegawa.shizuoka.jp", "kannami.shizuoka.jp", "kawanehon.shizuoka.jp", "kawazu.shizuoka.jp", "kikugawa.shizuoka.jp", "kosai.shizuoka.jp", "makinohara.shizuoka.jp", "matsuzaki.shizuoka.jp", "minamiizu.shizuoka.jp", "mishima.shizuoka.jp", "morimachi.shizuoka.jp", "nishiizu.shizuoka.jp", "numazu.shizuoka.jp", "omaezaki.shizuoka.jp", "shimada.shizuoka.jp", "shimizu.shizuoka.jp", "shimoda.shizuoka.jp", "shizuoka.shizuoka.jp", "susono.shizuoka.jp", "yaizu.shizuoka.jp", "yoshida.shizuoka.jp", "ashikaga.tochigi.jp", "bato.tochigi.jp", "haga.tochigi.jp", "ichikai.tochigi.jp", "iwafune.tochigi.jp", "kaminokawa.tochigi.jp", "kanuma.tochigi.jp", "karasuyama.tochigi.jp", "kuroiso.tochigi.jp", "mashiko.tochigi.jp", "mibu.tochigi.jp", "moka.tochigi.jp", "motegi.tochigi.jp", "nasu.tochigi.jp", "nasushiobara.tochigi.jp", "nikko.tochigi.jp", "nishikata.tochigi.jp", "nogi.tochigi.jp", "ohira.tochigi.jp", "ohtawara.tochigi.jp", "oyama.tochigi.jp", "sakura.tochigi.jp", "sano.tochigi.jp", "shimotsuke.tochigi.jp", "shioya.tochigi.jp", "takanezawa.tochigi.jp", "tochigi.tochigi.jp", "tsuga.tochigi.jp", "ujiie.tochigi.jp", "utsunomiya.tochigi.jp", "yaita.tochigi.jp", "aizumi.tokushima.jp", "anan.tokushima.jp", "ichiba.tokushima.jp", "itano.tokushima.jp", "kainan.tokushima.jp", "komatsushima.tokushima.jp", "matsushige.tokushima.jp", "mima.tokushima.jp", "minami.tokushima.jp", "miyoshi.tokushima.jp", "mugi.tokushima.jp", "nakagawa.tokushima.jp", "naruto.tokushima.jp", "sanagochi.tokushima.jp", "shishikui.tokushima.jp", "tokushima.tokushima.jp", "wajiki.tokushima.jp", "adachi.tokyo.jp", "akiruno.tokyo.jp", "akishima.tokyo.jp", "aogashima.tokyo.jp", "arakawa.tokyo.jp", "bunkyo.tokyo.jp", "chiyoda.tokyo.jp", "chofu.tokyo.jp", "chuo.tokyo.jp", "edogawa.tokyo.jp", "fuchu.tokyo.jp", "fussa.tokyo.jp", "hachijo.tokyo.jp", "hachioji.tokyo.jp", "hamura.tokyo.jp", "higashikurume.tokyo.jp", "higashimurayama.tokyo.jp", "higashiyamato.tokyo.jp", "hino.tokyo.jp", "hinode.tokyo.jp", "hinohara.tokyo.jp", "inagi.tokyo.jp", "itabashi.tokyo.jp", "katsushika.tokyo.jp", "kita.tokyo.jp", "kiyose.tokyo.jp", "kodaira.tokyo.jp", "koganei.tokyo.jp", "kokubunji.tokyo.jp", "komae.tokyo.jp", "koto.tokyo.jp", "kouzushima.tokyo.jp", "kunitachi.tokyo.jp", "machida.tokyo.jp", "meguro.tokyo.jp", "minato.tokyo.jp", "mitaka.tokyo.jp", "mizuho.tokyo.jp", "musashimurayama.tokyo.jp", "musashino.tokyo.jp", "nakano.tokyo.jp", "nerima.tokyo.jp", "ogasawara.tokyo.jp", "okutama.tokyo.jp", "ome.tokyo.jp", "oshima.tokyo.jp", "ota.tokyo.jp", "setagaya.tokyo.jp", "shibuya.tokyo.jp", "shinagawa.tokyo.jp", "shinjuku.tokyo.jp", "suginami.tokyo.jp", "sumida.tokyo.jp", "tachikawa.tokyo.jp", "taito.tokyo.jp", "tama.tokyo.jp", "toshima.tokyo.jp", "chizu.tottori.jp", "hino.tottori.jp", "kawahara.tottori.jp", "koge.tottori.jp", "kotoura.tottori.jp", "misasa.tottori.jp", "nanbu.tottori.jp", "nichinan.tottori.jp", "sakaiminato.tottori.jp", "tottori.tottori.jp", "wakasa.tottori.jp", "yazu.tottori.jp", "yonago.tottori.jp", "asahi.toyama.jp", "fuchu.toyama.jp", "fukumitsu.toyama.jp", "funahashi.toyama.jp", "himi.toyama.jp", "imizu.toyama.jp", "inami.toyama.jp", "johana.toyama.jp", "kamiichi.toyama.jp", "kurobe.toyama.jp", "nakaniikawa.toyama.jp", "namerikawa.toyama.jp", "nanto.toyama.jp", "nyuzen.toyama.jp", "oyabe.toyama.jp", "taira.toyama.jp", "takaoka.toyama.jp", "tateyama.toyama.jp", "toga.toyama.jp", "tonami.toyama.jp", "toyama.toyama.jp", "unazuki.toyama.jp", "uozu.toyama.jp", "yamada.toyama.jp", "arida.wakayama.jp", "aridagawa.wakayama.jp", "gobo.wakayama.jp", "hashimoto.wakayama.jp", "hidaka.wakayama.jp", "hirogawa.wakayama.jp", "inami.wakayama.jp", "iwade.wakayama.jp", "kainan.wakayama.jp", "kamitonda.wakayama.jp", "katsuragi.wakayama.jp", "kimino.wakayama.jp", "kinokawa.wakayama.jp", "kitayama.wakayama.jp", "koya.wakayama.jp", "koza.wakayama.jp", "kozagawa.wakayama.jp", "kudoyama.wakayama.jp", "kushimoto.wakayama.jp", "mihama.wakayama.jp", "misato.wakayama.jp", "nachikatsuura.wakayama.jp", "shingu.wakayama.jp", "shirahama.wakayama.jp", "taiji.wakayama.jp", "tanabe.wakayama.jp", "wakayama.wakayama.jp", "yuasa.wakayama.jp", "yura.wakayama.jp", "asahi.yamagata.jp", "funagata.yamagata.jp", "higashine.yamagata.jp", "iide.yamagata.jp", "kahoku.yamagata.jp", "kaminoyama.yamagata.jp", "kaneyama.yamagata.jp", "kawanishi.yamagata.jp", "mamurogawa.yamagata.jp", "mikawa.yamagata.jp", "murayama.yamagata.jp", "nagai.yamagata.jp", "nakayama.yamagata.jp", "nanyo.yamagata.jp", "nishikawa.yamagata.jp", "obanazawa.yamagata.jp", "oe.yamagata.jp", "oguni.yamagata.jp", "ohkura.yamagata.jp", "oishida.yamagata.jp", "sagae.yamagata.jp", "sakata.yamagata.jp", "sakegawa.yamagata.jp", "shinjo.yamagata.jp", "shirataka.yamagata.jp", "shonai.yamagata.jp", "takahata.yamagata.jp", "tendo.yamagata.jp", "tozawa.yamagata.jp", "tsuruoka.yamagata.jp", "yamagata.yamagata.jp", "yamanobe.yamagata.jp", "yonezawa.yamagata.jp", "yuza.yamagata.jp", "abu.yamaguchi.jp", "hagi.yamaguchi.jp", "hikari.yamaguchi.jp", "hofu.yamaguchi.jp", "iwakuni.yamaguchi.jp", "kudamatsu.yamaguchi.jp", "mitou.yamaguchi.jp", "nagato.yamaguchi.jp", "oshima.yamaguchi.jp", "shimonoseki.yamaguchi.jp", "shunan.yamaguchi.jp", "tabuse.yamaguchi.jp", "tokuyama.yamaguchi.jp", "toyota.yamaguchi.jp", "ube.yamaguchi.jp", "yuu.yamaguchi.jp", "chuo.yamanashi.jp", "doshi.yamanashi.jp", "fuefuki.yamanashi.jp", "fujikawa.yamanashi.jp", "fujikawaguchiko.yamanashi.jp", "fujiyoshida.yamanashi.jp", "hayakawa.yamanashi.jp", "hokuto.yamanashi.jp", "ichikawamisato.yamanashi.jp", "kai.yamanashi.jp", "kofu.yamanashi.jp", "koshu.yamanashi.jp", "kosuge.yamanashi.jp", "minami-alps.yamanashi.jp", "minobu.yamanashi.jp", "nakamichi.yamanashi.jp", "nanbu.yamanashi.jp", "narusawa.yamanashi.jp", "nirasaki.yamanashi.jp", "nishikatsura.yamanashi.jp", "oshino.yamanashi.jp", "otsuki.yamanashi.jp", "showa.yamanashi.jp", "tabayama.yamanashi.jp", "tsuru.yamanashi.jp", "uenohara.yamanashi.jp", "yamanakako.yamanashi.jp", "yamanashi.yamanashi.jp", "jpmorgan", "jprs", "juegos", "juniper", "kaufen", "kddi", "ke", "ac.ke", "co.ke", "go.ke", "info.ke", "me.ke", "mobi.ke", "ne.ke", "or.ke", "sc.ke", "kerryhotels", "kerrylogistics", "kerryproperties", "kfh", "kg", "org.kg", "net.kg", "com.kg", "edu.kg", "gov.kg", "mil.kg", "*.kh", "ki", "edu.ki", "biz.ki", "net.ki", "org.ki", "gov.ki", "info.ki", "com.ki", "kia", "kids", "kim", "kindle", "kitchen", "kiwi", "km", "org.km", "nom.km", "gov.km", "prd.km", "tm.km", "edu.km", "mil.km", "ass.km", "com.km", "coop.km", "asso.km", "presse.km", "medecin.km", "notaires.km", "pharmaciens.km", "veterinaire.km", "gouv.km", "kn", "net.kn", "org.kn", "edu.kn", "gov.kn", "koeln", "komatsu", "kosher", "kp", "com.kp", "edu.kp", "gov.kp", "org.kp", "rep.kp", "tra.kp", "kpmg", "kpn", "kr", "ac.kr", "co.kr", "es.kr", "go.kr", "hs.kr", "kg.kr", "mil.kr", "ms.kr", "ne.kr", "or.kr", "pe.kr", "re.kr", "sc.kr", "busan.kr", "chungbuk.kr", "chungnam.kr", "daegu.kr", "daejeon.kr", "gangwon.kr", "gwangju.kr", "gyeongbuk.kr", "gyeonggi.kr", "gyeongnam.kr", "incheon.kr", "jeju.kr", "jeonbuk.kr", "jeonnam.kr", "seoul.kr", "ulsan.kr", "krd", "kred", "kuokgroup", "kw", "com.kw", "edu.kw", "emb.kw", "gov.kw", "ind.kw", "net.kw", "org.kw", "ky", "com.ky", "edu.ky", "net.ky", "org.ky", "kyoto", "kz", "org.kz", "edu.kz", "net.kz", "gov.kz", "mil.kz", "com.kz", "la", "int.la", "net.la", "info.la", "edu.la", "gov.la", "per.la", "com.la", "org.la", "lacaixa", "lamborghini", "lamer", "lancaster", "land", "landrover", "lanxess", "lasalle", "lat", "latino", "latrobe", "law", "lawyer", "lb", "com.lb", "edu.lb", "gov.lb", "net.lb", "org.lb", "lc", "com.lc", "net.lc", "co.lc", "org.lc", "edu.lc", "gov.lc", "lds", "lease", "leclerc", "lefrak", "legal", "lego", "lexus", "lgbt", "li", "lidl", "life", "lifeinsurance", "lifestyle", "lighting", "like", "lilly", "limited", "limo", "lincoln", "link", "lipsy", "live", "living", "lk", "gov.lk", "sch.lk", "net.lk", "int.lk", "com.lk", "org.lk", "edu.lk", "ngo.lk", "soc.lk", "web.lk", "ltd.lk", "assn.lk", "grp.lk", "hotel.lk", "ac.lk", "llc", "llp", "loan", "loans", "locker", "locus", "lol", "london", "lotte", "lotto", "love", "lpl", "lplfinancial", "lr", "com.lr", "edu.lr", "gov.lr", "org.lr", "net.lr", "ls", "ac.ls", "biz.ls", "co.ls", "edu.ls", "gov.ls", "info.ls", "net.ls", "org.ls", "sc.ls", "lt", "gov.lt", "ltd", "ltda", "lu", "lundbeck", "luxe", "luxury", "lv", "com.lv", "edu.lv", "gov.lv", "org.lv", "mil.lv", "id.lv", "net.lv", "asn.lv", "conf.lv", "ly", "com.ly", "net.ly", "gov.ly", "plc.ly", "edu.ly", "sch.ly", "med.ly", "org.ly", "id.ly", "ma", "co.ma", "net.ma", "gov.ma", "org.ma", "ac.ma", "press.ma", "madrid", "maif", "maison", "makeup", "man", "management", "mango", "map", "market", "marketing", "markets", "marriott", "marshalls", "mattel", "mba", "mc", "tm.mc", "asso.mc", "mckinsey", "md", "me", "co.me", "net.me", "org.me", "edu.me", "ac.me", "gov.me", "its.me", "priv.me", "med", "media", "meet", "melbourne", "meme", "memorial", "men", "menu", "merckmsd", "mg", "org.mg", "nom.mg", "gov.mg", "prd.mg", "tm.mg", "edu.mg", "mil.mg", "com.mg", "co.mg", "mh", "miami", "microsoft", "mil", "mini", "mint", "mit", "mitsubishi", "mk", "com.mk", "org.mk", "net.mk", "edu.mk", "gov.mk", "inf.mk", "name.mk", "ml", "com.ml", "edu.ml", "gouv.ml", "gov.ml", "net.ml", "org.ml", "presse.ml", "mlb", "mls", "*.mm", "mma", "mn", "gov.mn", "edu.mn", "org.mn", "mo", "com.mo", "net.mo", "org.mo", "edu.mo", "gov.mo", "mobi", "mobile", "moda", "moe", "moi", "mom", "monash", "money", "monster", "mormon", "mortgage", "moscow", "moto", "motorcycles", "mov", "movie", "mp", "mq", "mr", "gov.mr", "ms", "com.ms", "edu.ms", "gov.ms", "net.ms", "org.ms", "msd", "mt", "com.mt", "edu.mt", "net.mt", "org.mt", "mtn", "mtr", "mu", "com.mu", "net.mu", "org.mu", "gov.mu", "ac.mu", "co.mu", "or.mu", "museum", "music", "mv", "aero.mv", "biz.mv", "com.mv", "coop.mv", "edu.mv", "gov.mv", "info.mv", "int.mv", "mil.mv", "museum.mv", "name.mv", "net.mv", "org.mv", "pro.mv", "mw", "ac.mw", "biz.mw", "co.mw", "com.mw", "coop.mw", "edu.mw", "gov.mw", "int.mw", "museum.mw", "net.mw", "org.mw", "mx", "com.mx", "org.mx", "gob.mx", "edu.mx", "net.mx", "my", "biz.my", "com.my", "edu.my", "gov.my", "mil.my", "name.my", "net.my", "org.my", "mz", "ac.mz", "adv.mz", "co.mz", "edu.mz", "gov.mz", "mil.mz", "net.mz", "org.mz", "na", "info.na", "pro.na", "name.na", "school.na", "or.na", "dr.na", "us.na", "mx.na", "ca.na", "in.na", "cc.na", "tv.na", "ws.na", "mobi.na", "co.na", "com.na", "org.na", "nab", "nagoya", "name", "natura", "navy", "nba", "nc", "asso.nc", "nom.nc", "ne", "nec", "net", "netbank", "netflix", "network", "neustar", "new", "news", "next", "nextdirect", "nexus", "nf", "com.nf", "net.nf", "per.nf", "rec.nf", "web.nf", "arts.nf", "firm.nf", "info.nf", "other.nf", "store.nf", "nfl", "ng", "com.ng", "edu.ng", "gov.ng", "i.ng", "mil.ng", "mobi.ng", "name.ng", "net.ng", "org.ng", "sch.ng", "ngo", "nhk", "ni", "ac.ni", "biz.ni", "co.ni", "com.ni", "edu.ni", "gob.ni", "in.ni", "info.ni", "int.ni", "mil.ni", "net.ni", "nom.ni", "org.ni", "web.ni", "nico", "nike", "nikon", "ninja", "nissan", "nissay", "nl", "no", "fhs.no", "vgs.no", "fylkesbibl.no", "folkebibl.no", "museum.no", "idrett.no", "priv.no", "mil.no", "stat.no", "dep.no", "kommune.no", "herad.no", "aa.no", "ah.no", "bu.no", "fm.no", "hl.no", "hm.no", "jan-mayen.no", "mr.no", "nl.no", "nt.no", "of.no", "ol.no", "oslo.no", "rl.no", "sf.no", "st.no", "svalbard.no", "tm.no", "tr.no", "va.no", "vf.no", "gs.aa.no", "gs.ah.no", "gs.bu.no", "gs.fm.no", "gs.hl.no", "gs.hm.no", "gs.jan-mayen.no", "gs.mr.no", "gs.nl.no", "gs.nt.no", "gs.of.no", "gs.ol.no", "gs.oslo.no", "gs.rl.no", "gs.sf.no", "gs.st.no", "gs.svalbard.no", "gs.tm.no", "gs.tr.no", "gs.va.no", "gs.vf.no", "akrehamn.no", "åkrehamn.no", "algard.no", "ålgård.no", "arna.no", "brumunddal.no", "bryne.no", "bronnoysund.no", "brønnøysund.no", "drobak.no", "drøbak.no", "egersund.no", "fetsund.no", "floro.no", "florø.no", "fredrikstad.no", "hokksund.no", "honefoss.no", "hønefoss.no", "jessheim.no", "jorpeland.no", "jørpeland.no", "kirkenes.no", "kopervik.no", "krokstadelva.no", "langevag.no", "langevåg.no", "leirvik.no", "mjondalen.no", "mjøndalen.no", "mo-i-rana.no", "mosjoen.no", "mosjøen.no", "nesoddtangen.no", "orkanger.no", "osoyro.no", "osøyro.no", "raholt.no", "råholt.no", "sandnessjoen.no", "sandnessjøen.no", "skedsmokorset.no", "slattum.no", "spjelkavik.no", "stathelle.no", "stavern.no", "stjordalshalsen.no", "stjørdalshalsen.no", "tananger.no", "tranby.no", "vossevangen.no", "afjord.no", "åfjord.no", "agdenes.no", "al.no", "ål.no", "alesund.no", "ålesund.no", "alstahaug.no", "alta.no", "áltá.no", "alaheadju.no", "álaheadju.no", "alvdal.no", "amli.no", "åmli.no", "amot.no", "åmot.no", "andebu.no", "andoy.no", "andøy.no", "andasuolo.no", "ardal.no", "årdal.no", "aremark.no", "arendal.no", "ås.no", "aseral.no", "åseral.no", "asker.no", "askim.no", "askvoll.no", "askoy.no", "askøy.no", "asnes.no", "åsnes.no", "audnedaln.no", "aukra.no", "aure.no", "aurland.no", "aurskog-holand.no", "aurskog-høland.no", "austevoll.no", "austrheim.no", "averoy.no", "averøy.no", "balestrand.no", "ballangen.no", "balat.no", "bálát.no", "balsfjord.no", "bahccavuotna.no", "báhccavuotna.no", "bamble.no", "bardu.no", "beardu.no", "beiarn.no", "bajddar.no", "bájddar.no", "baidar.no", "báidár.no", "berg.no", "bergen.no", "berlevag.no", "berlevåg.no", "bearalvahki.no", "bearalváhki.no", "bindal.no", "birkenes.no", "bjarkoy.no", "bjarkøy.no", "bjerkreim.no", "bjugn.no", "bodo.no", "bodø.no", "badaddja.no", "bådåddjå.no", "budejju.no", "bokn.no", "bremanger.no", "bronnoy.no", "brønnøy.no", "bygland.no", "bykle.no", "barum.no", "bærum.no", "bo.telemark.no", "bø.telemark.no", "bo.nordland.no", "bø.nordland.no", "bievat.no", "bievát.no", "bomlo.no", "bømlo.no", "batsfjord.no", "båtsfjord.no", "bahcavuotna.no", "báhcavuotna.no", "dovre.no", "drammen.no", "drangedal.no", "dyroy.no", "dyrøy.no", "donna.no", "dønna.no", "eid.no", "eidfjord.no", "eidsberg.no", "eidskog.no", "eidsvoll.no", "eigersund.no", "elverum.no", "enebakk.no", "engerdal.no", "etne.no", "etnedal.no", "evenes.no", "evenassi.no", "evenášši.no", "evje-og-hornnes.no", "farsund.no", "fauske.no", "fuossko.no", "fuoisku.no", "fedje.no", "fet.no", "finnoy.no", "finnøy.no", "fitjar.no", "fjaler.no", "fjell.no", "flakstad.no", "flatanger.no", "flekkefjord.no", "flesberg.no", "flora.no", "fla.no", "flå.no", "folldal.no", "forsand.no", "fosnes.no", "frei.no", "frogn.no", "froland.no", "frosta.no", "frana.no", "fræna.no", "froya.no", "frøya.no", "fusa.no", "fyresdal.no", "forde.no", "førde.no", "gamvik.no", "gangaviika.no", "gáŋgaviika.no", "gaular.no", "gausdal.no", "gildeskal.no", "gildeskål.no", "giske.no", "gjemnes.no", "gjerdrum.no", "gjerstad.no", "gjesdal.no", "gjovik.no", "gjøvik.no", "gloppen.no", "gol.no", "gran.no", "grane.no", "granvin.no", "gratangen.no", "grimstad.no", "grong.no", "kraanghke.no", "kråanghke.no", "grue.no", "gulen.no", "hadsel.no", "halden.no", "halsa.no", "hamar.no", "hamaroy.no", "habmer.no", "hábmer.no", "hapmir.no", "hápmir.no", "hammerfest.no", "hammarfeasta.no", "hámmárfeasta.no", "haram.no", "hareid.no", "harstad.no", "hasvik.no", "aknoluokta.no", "ákŋoluokta.no", "hattfjelldal.no", "aarborte.no", "haugesund.no", "hemne.no", "hemnes.no", "hemsedal.no", "heroy.more-og-romsdal.no", "herøy.møre-og-romsdal.no", "heroy.nordland.no", "herøy.nordland.no", "hitra.no", "hjartdal.no", "hjelmeland.no", "hobol.no", "hobøl.no", "hof.no", "hol.no", "hole.no", "holmestrand.no", "holtalen.no", "holtålen.no", "hornindal.no", "horten.no", "hurdal.no", "hurum.no", "hvaler.no", "hyllestad.no", "hagebostad.no", "hægebostad.no", "hoyanger.no", "høyanger.no", "hoylandet.no", "høylandet.no", "ha.no", "hå.no", "ibestad.no", "inderoy.no", "inderøy.no", "iveland.no", "jevnaker.no", "jondal.no", "jolster.no", "jølster.no", "karasjok.no", "karasjohka.no", "kárášjohka.no", "karlsoy.no", "galsa.no", "gálsá.no", "karmoy.no", "karmøy.no", "kautokeino.no", "guovdageaidnu.no", "klepp.no", "klabu.no", "klæbu.no", "kongsberg.no", "kongsvinger.no", "kragero.no", "kragerø.no", "kristiansand.no", "kristiansund.no", "krodsherad.no", "krødsherad.no", "kvalsund.no", "rahkkeravju.no", "ráhkkerávju.no", "kvam.no", "kvinesdal.no", "kvinnherad.no", "kviteseid.no", "kvitsoy.no", "kvitsøy.no", "kvafjord.no", "kvæfjord.no", "giehtavuoatna.no", "kvanangen.no", "kvænangen.no", "navuotna.no", "návuotna.no", "kafjord.no", "kåfjord.no", "gaivuotna.no", "gáivuotna.no", "larvik.no", "lavangen.no", "lavagis.no", "loabat.no", "loabát.no", "lebesby.no", "davvesiida.no", "leikanger.no", "leirfjord.no", "leka.no", "leksvik.no", "lenvik.no", "leangaviika.no", "leaŋgaviika.no", "lesja.no", "levanger.no", "lier.no", "lierne.no", "lillehammer.no", "lillesand.no", "lindesnes.no", "lindas.no", "lindås.no", "lom.no", "loppa.no", "lahppi.no", "láhppi.no", "lund.no", "lunner.no", "luroy.no", "lurøy.no", "luster.no", "lyngdal.no", "lyngen.no", "ivgu.no", "lardal.no", "lerdal.no", "lærdal.no", "lodingen.no", "lødingen.no", "lorenskog.no", "lørenskog.no", "loten.no", "løten.no", "malvik.no", "masoy.no", "måsøy.no", "muosat.no", "muosát.no", "mandal.no", "marker.no", "marnardal.no", "masfjorden.no", "meland.no", "meldal.no", "melhus.no", "meloy.no", "meløy.no", "meraker.no", "meråker.no", "moareke.no", "moåreke.no", "midsund.no", "midtre-gauldal.no", "modalen.no", "modum.no", "molde.no", "moskenes.no", "moss.no", "mosvik.no", "malselv.no", "målselv.no", "malatvuopmi.no", "málatvuopmi.no", "namdalseid.no", "aejrie.no", "namsos.no", "namsskogan.no", "naamesjevuemie.no", "nååmesjevuemie.no", "laakesvuemie.no", "nannestad.no", "narvik.no", "narviika.no", "naustdal.no", "nedre-eiker.no", "nes.akershus.no", "nes.buskerud.no", "nesna.no", "nesodden.no", "nesseby.no", "unjarga.no", "unjárga.no", "nesset.no", "nissedal.no", "nittedal.no", "nord-aurdal.no", "nord-fron.no", "nord-odal.no", "norddal.no", "nordkapp.no", "davvenjarga.no", "davvenjárga.no", "nordre-land.no", "nordreisa.no", "raisa.no", "ráisa.no", "nore-og-uvdal.no", "notodden.no", "naroy.no", "nærøy.no", "notteroy.no", "nøtterøy.no", "odda.no", "oksnes.no", "øksnes.no", "oppdal.no", "oppegard.no", "oppegård.no", "orkdal.no", "orland.no", "ørland.no", "orskog.no", "ørskog.no", "orsta.no", "ørsta.no", "os.hedmark.no", "os.hordaland.no", "osen.no", "osteroy.no", "osterøy.no", "ostre-toten.no", "østre-toten.no", "overhalla.no", "ovre-eiker.no", "øvre-eiker.no", "oyer.no", "øyer.no", "oygarden.no", "øygarden.no", "oystre-slidre.no", "øystre-slidre.no", "porsanger.no", "porsangu.no", "porsáŋgu.no", "porsgrunn.no", "radoy.no", "radøy.no", "rakkestad.no", "rana.no", "ruovat.no", "randaberg.no", "rauma.no", "rendalen.no", "rennebu.no", "rennesoy.no", "rennesøy.no", "rindal.no", "ringebu.no", "ringerike.no", "ringsaker.no", "rissa.no", "risor.no", "risør.no", "roan.no", "rollag.no", "rygge.no", "ralingen.no", "rælingen.no", "rodoy.no", "rødøy.no", "romskog.no", "rømskog.no", "roros.no", "røros.no", "rost.no", "røst.no", "royken.no", "røyken.no", "royrvik.no", "røyrvik.no", "rade.no", "råde.no", "salangen.no", "siellak.no", "saltdal.no", "salat.no", "sálát.no", "sálat.no", "samnanger.no", "sande.more-og-romsdal.no", "sande.møre-og-romsdal.no", "sande.vestfold.no", "sandefjord.no", "sandnes.no", "sandoy.no", "sandøy.no", "sarpsborg.no", "sauda.no", "sauherad.no", "sel.no", "selbu.no", "selje.no", "seljord.no", "sigdal.no", "siljan.no", "sirdal.no", "skaun.no", "skedsmo.no", "ski.no", "skien.no", "skiptvet.no", "skjervoy.no", "skjervøy.no", "skierva.no", "skiervá.no", "skjak.no", "skjåk.no", "skodje.no", "skanland.no", "skånland.no", "skanit.no", "skánit.no", "smola.no", "smøla.no", "snillfjord.no", "snasa.no", "snåsa.no", "snoasa.no", "snaase.no", "snåase.no", "sogndal.no", "sokndal.no", "sola.no", "solund.no", "songdalen.no", "sortland.no", "spydeberg.no", "stange.no", "stavanger.no", "steigen.no", "steinkjer.no", "stjordal.no", "stjørdal.no", "stokke.no", "stor-elvdal.no", "stord.no", "stordal.no", "storfjord.no", "omasvuotna.no", "strand.no", "stranda.no", "stryn.no", "sula.no", "suldal.no", "sund.no", "sunndal.no", "surnadal.no", "sveio.no", "svelvik.no", "sykkylven.no", "sogne.no", "søgne.no", "somna.no", "sømna.no", "sondre-land.no", "søndre-land.no", "sor-aurdal.no", "sør-aurdal.no", "sor-fron.no", "sør-fron.no", "sor-odal.no", "sør-odal.no", "sor-varanger.no", "sør-varanger.no", "matta-varjjat.no", "mátta-várjjat.no", "sorfold.no", "sørfold.no", "sorreisa.no", "sørreisa.no", "sorum.no", "sørum.no", "tana.no", "deatnu.no", "time.no", "tingvoll.no", "tinn.no", "tjeldsund.no", "dielddanuorri.no", "tjome.no", "tjøme.no", "tokke.no", "tolga.no", "torsken.no", "tranoy.no", "tranøy.no", "tromso.no", "tromsø.no", "tromsa.no", "romsa.no", "trondheim.no", "troandin.no", "trysil.no", "trana.no", "træna.no", "trogstad.no", "trøgstad.no", "tvedestrand.no", "tydal.no", "tynset.no", "tysfjord.no", "divtasvuodna.no", "divttasvuotna.no", "tysnes.no", "tysvar.no", "tysvær.no", "tonsberg.no", "tønsberg.no", "ullensaker.no", "ullensvang.no", "ulvik.no", "utsira.no", "vadso.no", "vadsø.no", "cahcesuolo.no", "čáhcesuolo.no", "vaksdal.no", "valle.no", "vang.no", "vanylven.no", "vardo.no", "vardø.no", "varggat.no", "várggát.no", "vefsn.no", "vaapste.no", "vega.no", "vegarshei.no", "vegårshei.no", "vennesla.no", "verdal.no", "verran.no", "vestby.no", "vestnes.no", "vestre-slidre.no", "vestre-toten.no", "vestvagoy.no", "vestvågøy.no", "vevelstad.no", "vik.no", "vikna.no", "vindafjord.no", "volda.no", "voss.no", "varoy.no", "værøy.no", "vagan.no", "vågan.no", "voagat.no", "vagsoy.no", "vågsøy.no", "vaga.no", "vågå.no", "valer.ostfold.no", "våler.østfold.no", "valer.hedmark.no", "våler.hedmark.no", "nokia", "norton", "now", "nowruz", "nowtv", "*.np", "nr", "biz.nr", "info.nr", "gov.nr", "edu.nr", "org.nr", "net.nr", "com.nr", "nra", "nrw", "ntt", "nu", "nyc", "nz", "ac.nz", "co.nz", "cri.nz", "geek.nz", "gen.nz", "govt.nz", "health.nz", "iwi.nz", "kiwi.nz", "maori.nz", "mil.nz", "māori.nz", "net.nz", "org.nz", "parliament.nz", "school.nz", "obi", "observer", "office", "okinawa", "olayan", "olayangroup", "ollo", "om", "co.om", "com.om", "edu.om", "gov.om", "med.om", "museum.om", "net.om", "org.om", "pro.om", "omega", "one", "ong", "onion", "onl", "online", "ooo", "open", "oracle", "orange", "org", "organic", "origins", "osaka", "otsuka", "ott", "ovh", "pa", "ac.pa", "gob.pa", "com.pa", "org.pa", "sld.pa", "edu.pa", "net.pa", "ing.pa", "abo.pa", "med.pa", "nom.pa", "page", "panasonic", "paris", "pars", "partners", "parts", "party", "pay", "pccw", "pe", "edu.pe", "gob.pe", "nom.pe", "mil.pe", "org.pe", "com.pe", "net.pe", "pet", "pf", "com.pf", "org.pf", "edu.pf", "pfizer", "*.pg", "ph", "com.ph", "net.ph", "org.ph", "gov.ph", "edu.ph", "ngo.ph", "mil.ph", "i.ph", "pharmacy", "phd", "philips", "phone", "photo", "photography", "photos", "physio", "pics", "pictet", "pictures", "pid", "pin", "ping", "pink", "pioneer", "pizza", "pk", "com.pk", "net.pk", "edu.pk", "org.pk", "fam.pk", "biz.pk", "web.pk", "gov.pk", "gob.pk", "gok.pk", "gon.pk", "gop.pk", "gos.pk", "info.pk", "pl", "com.pl", "net.pl", "org.pl", "aid.pl", "agro.pl", "atm.pl", "auto.pl", "biz.pl", "edu.pl", "gmina.pl", "gsm.pl", "info.pl", "mail.pl", "miasta.pl", "media.pl", "mil.pl", "nieruchomosci.pl", "nom.pl", "pc.pl", "powiat.pl", "priv.pl", "realestate.pl", "rel.pl", "sex.pl", "shop.pl", "sklep.pl", "sos.pl", "szkola.pl", "targi.pl", "tm.pl", "tourism.pl", "travel.pl", "turystyka.pl", "gov.pl", "ap.gov.pl", "griw.gov.pl", "ic.gov.pl", "is.gov.pl", "kmpsp.gov.pl", "konsulat.gov.pl", "kppsp.gov.pl", "kwp.gov.pl", "kwpsp.gov.pl", "mup.gov.pl", "mw.gov.pl", "oia.gov.pl", "oirm.gov.pl", "oke.gov.pl", "oow.gov.pl", "oschr.gov.pl", "oum.gov.pl", "pa.gov.pl", "pinb.gov.pl", "piw.gov.pl", "po.gov.pl", "pr.gov.pl", "psp.gov.pl", "psse.gov.pl", "pup.gov.pl", "rzgw.gov.pl", "sa.gov.pl", "sdn.gov.pl", "sko.gov.pl", "so.gov.pl", "sr.gov.pl", "starostwo.gov.pl", "ug.gov.pl", "ugim.gov.pl", "um.gov.pl", "umig.gov.pl", "upow.gov.pl", "uppo.gov.pl", "us.gov.pl", "uw.gov.pl", "uzs.gov.pl", "wif.gov.pl", "wiih.gov.pl", "winb.gov.pl", "wios.gov.pl", "witd.gov.pl", "wiw.gov.pl", "wkz.gov.pl", "wsa.gov.pl", "wskr.gov.pl", "wsse.gov.pl", "wuoz.gov.pl", "wzmiuw.gov.pl", "zp.gov.pl", "zpisdn.gov.pl", "augustow.pl", "babia-gora.pl", "bedzin.pl", "beskidy.pl", "bialowieza.pl", "bialystok.pl", "bielawa.pl", "bieszczady.pl", "boleslawiec.pl", "bydgoszcz.pl", "bytom.pl", "cieszyn.pl", "czeladz.pl", "czest.pl", "dlugoleka.pl", "elblag.pl", "elk.pl", "glogow.pl", "gniezno.pl", "gorlice.pl", "grajewo.pl", "ilawa.pl", "jaworzno.pl", "jelenia-gora.pl", "jgora.pl", "kalisz.pl", "kazimierz-dolny.pl", "karpacz.pl", "kartuzy.pl", "kaszuby.pl", "katowice.pl", "kepno.pl", "ketrzyn.pl", "klodzko.pl", "kobierzyce.pl", "kolobrzeg.pl", "konin.pl", "konskowola.pl", "kutno.pl", "lapy.pl", "lebork.pl", "legnica.pl", "lezajsk.pl", "limanowa.pl", "lomza.pl", "lowicz.pl", "lubin.pl", "lukow.pl", "malbork.pl", "malopolska.pl", "mazowsze.pl", "mazury.pl", "mielec.pl", "mielno.pl", "mragowo.pl", "naklo.pl", "nowaruda.pl", "nysa.pl", "olawa.pl", "olecko.pl", "olkusz.pl", "olsztyn.pl", "opoczno.pl", "opole.pl", "ostroda.pl", "ostroleka.pl", "ostrowiec.pl", "ostrowwlkp.pl", "pila.pl", "pisz.pl", "podhale.pl", "podlasie.pl", "polkowice.pl", "pomorze.pl", "pomorskie.pl", "prochowice.pl", "pruszkow.pl", "przeworsk.pl", "pulawy.pl", "radom.pl", "rawa-maz.pl", "rybnik.pl", "rzeszow.pl", "sanok.pl", "sejny.pl", "slask.pl", "slupsk.pl", "sosnowiec.pl", "stalowa-wola.pl", "skoczow.pl", "starachowice.pl", "stargard.pl", "suwalki.pl", "swidnica.pl", "swiebodzin.pl", "swinoujscie.pl", "szczecin.pl", "szczytno.pl", "tarnobrzeg.pl", "tgory.pl", "turek.pl", "tychy.pl", "ustka.pl", "walbrzych.pl", "warmia.pl", "warszawa.pl", "waw.pl", "wegrow.pl", "wielun.pl", "wlocl.pl", "wloclawek.pl", "wodzislaw.pl", "wolomin.pl", "wroclaw.pl", "zachpomor.pl", "zagan.pl", "zarow.pl", "zgora.pl", "zgorzelec.pl", "place", "play", "playstation", "plumbing", "plus", "pm", "pn", "gov.pn", "co.pn", "org.pn", "edu.pn", "net.pn", "pnc", "pohl", "poker", "politie", "porn", "post", "pr", "com.pr", "net.pr", "org.pr", "gov.pr", "edu.pr", "isla.pr", "pro.pr", "biz.pr", "info.pr", "name.pr", "est.pr", "prof.pr", "ac.pr", "pramerica", "praxi", "press", "prime", "pro", "aaa.pro", "aca.pro", "acct.pro", "avocat.pro", "bar.pro", "cpa.pro", "eng.pro", "jur.pro", "law.pro", "med.pro", "recht.pro", "prod", "productions", "prof", "progressive", "promo", "properties", "property", "protection", "pru", "prudential", "ps", "edu.ps", "gov.ps", "sec.ps", "plo.ps", "com.ps", "org.ps", "net.ps", "pt", "net.pt", "gov.pt", "org.pt", "edu.pt", "int.pt", "publ.pt", "com.pt", "nome.pt", "pub", "pw", "co.pw", "ne.pw", "or.pw", "ed.pw", "go.pw", "belau.pw", "pwc", "py", "com.py", "coop.py", "edu.py", "gov.py", "mil.py", "net.py", "org.py", "qa", "com.qa", "edu.qa", "gov.qa", "mil.qa", "name.qa", "net.qa", "org.qa", "sch.qa", "qpon", "quebec", "quest", "racing", "radio", "re", "asso.re", "com.re", "nom.re", "read", "realestate", "realtor", "realty", "recipes", "red", "redstone", "redumbrella", "rehab", "reise", "reisen", "reit", "reliance", "ren", "rent", "rentals", "repair", "report", "republican", "rest", "restaurant", "review", "reviews", "rexroth", "rich", "richardli", "ricoh", "ril", "rio", "rip", "ro", "arts.ro", "com.ro", "firm.ro", "info.ro", "nom.ro", "nt.ro", "org.ro", "rec.ro", "store.ro", "tm.ro", "www.ro", "rocks", "rodeo", "rogers", "room", "rs", "ac.rs", "co.rs", "edu.rs", "gov.rs", "in.rs", "org.rs", "rsvp", "ru", "rugby", "ruhr", "run", "rw", "ac.rw", "co.rw", "coop.rw", "gov.rw", "mil.rw", "net.rw", "org.rw", "rwe", "ryukyu", "sa", "com.sa", "net.sa", "org.sa", "gov.sa", "med.sa", "pub.sa", "edu.sa", "sch.sa", "saarland", "safe", "safety", "sakura", "sale", "salon", "samsclub", "samsung", "sandvik", "sandvikcoromant", "sanofi", "sap", "sarl", "sas", "save", "saxo", "sb", "com.sb", "edu.sb", "gov.sb", "net.sb", "org.sb", "sbi", "sbs", "sc", "com.sc", "gov.sc", "net.sc", "org.sc", "edu.sc", "scb", "schaeffler", "schmidt", "scholarships", "school", "schule", "schwarz", "science", "scot", "sd", "com.sd", "net.sd", "org.sd", "edu.sd", "med.sd", "tv.sd", "gov.sd", "info.sd", "se", "a.se", "ac.se", "b.se", "bd.se", "brand.se", "c.se", "d.se", "e.se", "f.se", "fh.se", "fhsk.se", "fhv.se", "g.se", "h.se", "i.se", "k.se", "komforb.se", "kommunalforbund.se", "komvux.se", "l.se", "lanbib.se", "m.se", "n.se", "naturbruksgymn.se", "o.se", "org.se", "p.se", "parti.se", "pp.se", "press.se", "r.se", "s.se", "t.se", "tm.se", "u.se", "w.se", "x.se", "y.se", "z.se", "search", "seat", "secure", "security", "seek", "select", "sener", "services", "seven", "sew", "sex", "sexy", "sfr", "sg", "com.sg", "net.sg", "org.sg", "gov.sg", "edu.sg", "per.sg", "sh", "com.sh", "net.sh", "gov.sh", "org.sh", "mil.sh", "shangrila", "sharp", "shaw", "shell", "shia", "shiksha", "shoes", "shop", "shopping", "shouji", "show", "si", "silk", "sina", "singles", "site", "sj", "sk", "ski", "skin", "sky", "skype", "sl", "com.sl", "net.sl", "edu.sl", "gov.sl", "org.sl", "sling", "sm", "smart", "smile", "sn", "art.sn", "com.sn", "edu.sn", "gouv.sn", "org.sn", "perso.sn", "univ.sn", "sncf", "so", "com.so", "edu.so", "gov.so", "me.so", "net.so", "org.so", "soccer", "social", "softbank", "software", "sohu", "solar", "solutions", "song", "sony", "soy", "spa", "space", "sport", "spot", "sr", "srl", "ss", "biz.ss", "com.ss", "edu.ss", "gov.ss", "me.ss", "net.ss", "org.ss", "sch.ss", "st", "co.st", "com.st", "consulado.st", "edu.st", "embaixada.st", "mil.st", "net.st", "org.st", "principe.st", "saotome.st", "store.st", "stada", "staples", "star", "statebank", "statefarm", "stc", "stcgroup", "stockholm", "storage", "store", "stream", "studio", "study", "style", "su", "sucks", "supplies", "supply", "support", "surf", "surgery", "suzuki", "sv", "com.sv", "edu.sv", "gob.sv", "org.sv", "red.sv", "swatch", "swiss", "sx", "gov.sx", "sy", "edu.sy", "gov.sy", "net.sy", "mil.sy", "com.sy", "org.sy", "sydney", "systems", "sz", "co.sz", "ac.sz", "org.sz", "tab", "taipei", "talk", "taobao", "target", "tatamotors", "tatar", "tattoo", "tax", "taxi", "tc", "tci", "td", "tdk", "team", "tech", "technology", "tel", "temasek", "tennis", "teva", "tf", "tg", "th", "ac.th", "co.th", "go.th", "in.th", "mi.th", "net.th", "or.th", "thd", "theater", "theatre", "tiaa", "tickets", "tienda", "tips", "tires", "tirol", "tj", "ac.tj", "biz.tj", "co.tj", "com.tj", "edu.tj", "go.tj", "gov.tj", "int.tj", "mil.tj", "name.tj", "net.tj", "nic.tj", "org.tj", "test.tj", "web.tj", "tjmaxx", "tjx", "tk", "tkmaxx", "tl", "gov.tl", "tm", "com.tm", "co.tm", "org.tm", "net.tm", "nom.tm", "gov.tm", "mil.tm", "edu.tm", "tmall", "tn", "com.tn", "ens.tn", "fin.tn", "gov.tn", "ind.tn", "info.tn", "intl.tn", "mincom.tn", "nat.tn", "net.tn", "org.tn", "perso.tn", "tourism.tn", "to", "com.to", "gov.to", "net.to", "org.to", "edu.to", "mil.to", "today", "tokyo", "tools", "top", "toray", "toshiba", "total", "tours", "town", "toyota", "toys", "tr", "av.tr", "bbs.tr", "bel.tr", "biz.tr", "com.tr", "dr.tr", "edu.tr", "gen.tr", "gov.tr", "info.tr", "mil.tr", "k12.tr", "kep.tr", "name.tr", "net.tr", "org.tr", "pol.tr", "tel.tr", "tsk.tr", "tv.tr", "web.tr", "nc.tr", "gov.nc.tr", "trade", "trading", "training", "travel", "travelers", "travelersinsurance", "trust", "trv", "tt", "co.tt", "com.tt", "org.tt", "net.tt", "biz.tt", "info.tt", "pro.tt", "int.tt", "coop.tt", "jobs.tt", "mobi.tt", "travel.tt", "museum.tt", "aero.tt", "name.tt", "gov.tt", "edu.tt", "tube", "tui", "tunes", "tushu", "tv", "tvs", "tw", "edu.tw", "gov.tw", "mil.tw", "com.tw", "net.tw", "org.tw", "idv.tw", "game.tw", "ebiz.tw", "club.tw", "網路.tw", "組織.tw", "商業.tw", "tz", "ac.tz", "co.tz", "go.tz", "hotel.tz", "info.tz", "me.tz", "mil.tz", "mobi.tz", "ne.tz", "or.tz", "sc.tz", "tv.tz", "ua", "com.ua", "edu.ua", "gov.ua", "in.ua", "net.ua", "org.ua", "cherkassy.ua", "cherkasy.ua", "chernigov.ua", "chernihiv.ua", "chernivtsi.ua", "chernovtsy.ua", "ck.ua", "cn.ua", "cr.ua", "crimea.ua", "cv.ua", "dn.ua", "dnepropetrovsk.ua", "dnipropetrovsk.ua", "donetsk.ua", "dp.ua", "if.ua", "ivano-frankivsk.ua", "kh.ua", "kharkiv.ua", "kharkov.ua", "kherson.ua", "khmelnitskiy.ua", "khmelnytskyi.ua", "kiev.ua", "kirovograd.ua", "km.ua", "kr.ua", "kropyvnytskyi.ua", "krym.ua", "ks.ua", "kv.ua", "kyiv.ua", "lg.ua", "lt.ua", "lugansk.ua", "luhansk.ua", "lutsk.ua", "lv.ua", "lviv.ua", "mk.ua", "mykolaiv.ua", "nikolaev.ua", "od.ua", "odesa.ua", "odessa.ua", "pl.ua", "poltava.ua", "rivne.ua", "rovno.ua", "rv.ua", "sb.ua", "sebastopol.ua", "sevastopol.ua", "sm.ua", "sumy.ua", "te.ua", "ternopil.ua", "uz.ua", "uzhgorod.ua", "uzhhorod.ua", "vinnica.ua", "vinnytsia.ua", "vn.ua", "volyn.ua", "yalta.ua", "zakarpattia.ua", "zaporizhzhe.ua", "zaporizhzhia.ua", "zhitomir.ua", "zhytomyr.ua", "zp.ua", "zt.ua", "ubank", "ubs", "ug", "co.ug", "or.ug", "ac.ug", "sc.ug", "go.ug", "ne.ug", "com.ug", "org.ug", "uk", "ac.uk", "co.uk", "gov.uk", "ltd.uk", "me.uk", "net.uk", "nhs.uk", "org.uk", "plc.uk", "police.uk", "*.sch.uk", "unicom", "university", "uno", "uol", "ups", "us", "dni.us", "fed.us", "isa.us", "kids.us", "nsn.us", "ak.us", "al.us", "ar.us", "as.us", "az.us", "ca.us", "co.us", "ct.us", "dc.us", "de.us", "fl.us", "ga.us", "gu.us", "hi.us", "ia.us", "id.us", "il.us", "in.us", "ks.us", "ky.us", "la.us", "ma.us", "md.us", "me.us", "mi.us", "mn.us", "mo.us", "ms.us", "mt.us", "nc.us", "nd.us", "ne.us", "nh.us", "nj.us", "nm.us", "nv.us", "ny.us", "oh.us", "ok.us", "or.us", "pa.us", "pr.us", "ri.us", "sc.us", "sd.us", "tn.us", "tx.us", "ut.us", "vi.us", "vt.us", "va.us", "wa.us", "wi.us", "wv.us", "wy.us", "k12.ak.us", "k12.al.us", "k12.ar.us", "k12.as.us", "k12.az.us", "k12.ca.us", "k12.co.us", "k12.ct.us", "k12.dc.us", "k12.fl.us", "k12.ga.us", "k12.gu.us", "k12.ia.us", "k12.id.us", "k12.il.us", "k12.in.us", "k12.ks.us", "k12.ky.us", "k12.la.us", "k12.ma.us", "k12.md.us", "k12.me.us", "k12.mi.us", "k12.mn.us", "k12.mo.us", "k12.ms.us", "k12.mt.us", "k12.nc.us", "k12.ne.us", "k12.nh.us", "k12.nj.us", "k12.nm.us", "k12.nv.us", "k12.ny.us", "k12.oh.us", "k12.ok.us", "k12.or.us", "k12.pa.us", "k12.pr.us", "k12.sc.us", "k12.tn.us", "k12.tx.us", "k12.ut.us", "k12.vi.us", "k12.vt.us", "k12.va.us", "k12.wa.us", "k12.wi.us", "k12.wy.us", "cc.ak.us", "cc.al.us", "cc.ar.us", "cc.as.us", "cc.az.us", "cc.ca.us", "cc.co.us", "cc.ct.us", "cc.dc.us", "cc.de.us", "cc.fl.us", "cc.ga.us", "cc.gu.us", "cc.hi.us", "cc.ia.us", "cc.id.us", "cc.il.us", "cc.in.us", "cc.ks.us", "cc.ky.us", "cc.la.us", "cc.ma.us", "cc.md.us", "cc.me.us", "cc.mi.us", "cc.mn.us", "cc.mo.us", "cc.ms.us", "cc.mt.us", "cc.nc.us", "cc.nd.us", "cc.ne.us", "cc.nh.us", "cc.nj.us", "cc.nm.us", "cc.nv.us", "cc.ny.us", "cc.oh.us", "cc.ok.us", "cc.or.us", "cc.pa.us", "cc.pr.us", "cc.ri.us", "cc.sc.us", "cc.sd.us", "cc.tn.us", "cc.tx.us", "cc.ut.us", "cc.vi.us", "cc.vt.us", "cc.va.us", "cc.wa.us", "cc.wi.us", "cc.wv.us", "cc.wy.us", "lib.ak.us", "lib.al.us", "lib.ar.us", "lib.as.us", "lib.az.us", "lib.ca.us", "lib.co.us", "lib.ct.us", "lib.dc.us", "lib.fl.us", "lib.ga.us", "lib.gu.us", "lib.hi.us", "lib.ia.us", "lib.id.us", "lib.il.us", "lib.in.us", "lib.ks.us", "lib.ky.us", "lib.la.us", "lib.ma.us", "lib.md.us", "lib.me.us", "lib.mi.us", "lib.mn.us", "lib.mo.us", "lib.ms.us", "lib.mt.us", "lib.nc.us", "lib.nd.us", "lib.ne.us", "lib.nh.us", "lib.nj.us", "lib.nm.us", "lib.nv.us", "lib.ny.us", "lib.oh.us", "lib.ok.us", "lib.or.us", "lib.pa.us", "lib.pr.us", "lib.ri.us", "lib.sc.us", "lib.sd.us", "lib.tn.us", "lib.tx.us", "lib.ut.us", "lib.vi.us", "lib.vt.us", "lib.va.us", "lib.wa.us", "lib.wi.us", "lib.wy.us", "pvt.k12.ma.us", "chtr.k12.ma.us", "paroch.k12.ma.us", "ann-arbor.mi.us", "cog.mi.us", "dst.mi.us", "eaton.mi.us", "gen.mi.us", "mus.mi.us", "tec.mi.us", "washtenaw.mi.us", "uy", "com.uy", "edu.uy", "gub.uy", "mil.uy", "net.uy", "org.uy", "uz", "co.uz", "com.uz", "net.uz", "org.uz", "va", "vacations", "vana", "vanguard", "vc", "com.vc", "net.vc", "org.vc", "gov.vc", "mil.vc", "edu.vc", "ve", "arts.ve", "bib.ve", "co.ve", "com.ve", "e12.ve", "edu.ve", "firm.ve", "gob.ve", "gov.ve", "info.ve", "int.ve", "mil.ve", "net.ve", "nom.ve", "org.ve", "rar.ve", "rec.ve", "store.ve", "tec.ve", "web.ve", "vegas", "ventures", "verisign", "vermögensberater", "vermögensberatung", "versicherung", "vet", "vg", "vi", "co.vi", "com.vi", "k12.vi", "net.vi", "org.vi", "viajes", "video", "vig", "viking", "villas", "vin", "vip", "virgin", "visa", "vision", "viva", "vivo", "vlaanderen", "vn", "ac.vn", "ai.vn", "biz.vn", "com.vn", "edu.vn", "gov.vn", "health.vn", "id.vn", "info.vn", "int.vn", "io.vn", "name.vn", "net.vn", "org.vn", "pro.vn", "angiang.vn", "bacgiang.vn", "backan.vn", "baclieu.vn", "bacninh.vn", "baria-vungtau.vn", "bentre.vn", "binhdinh.vn", "binhduong.vn", "binhphuoc.vn", "binhthuan.vn", "camau.vn", "cantho.vn", "caobang.vn", "daklak.vn", "daknong.vn", "danang.vn", "dienbien.vn", "dongnai.vn", "dongthap.vn", "gialai.vn", "hagiang.vn", "haiduong.vn", "haiphong.vn", "hanam.vn", "hanoi.vn", "hatinh.vn", "haugiang.vn", "hoabinh.vn", "hungyen.vn", "khanhhoa.vn", "kiengiang.vn", "kontum.vn", "laichau.vn", "lamdong.vn", "langson.vn", "laocai.vn", "longan.vn", "namdinh.vn", "nghean.vn", "ninhbinh.vn", "ninhthuan.vn", "phutho.vn", "phuyen.vn", "quangbinh.vn", "quangnam.vn", "quangngai.vn", "quangninh.vn", "quangtri.vn", "soctrang.vn", "sonla.vn", "tayninh.vn", "thaibinh.vn", "thainguyen.vn", "thanhhoa.vn", "thanhphohochiminh.vn", "thuathienhue.vn", "tiengiang.vn", "travinh.vn", "tuyenquang.vn", "vinhlong.vn", "vinhphuc.vn", "yenbai.vn", "vodka", "volvo", "vote", "voting", "voto", "voyage", "vu", "com.vu", "edu.vu", "net.vu", "org.vu", "wales", "walmart", "walter", "wang", "wanggou", "watch", "watches", "weather", "weatherchannel", "webcam", "weber", "website", "wed", "wedding", "weibo", "weir", "wf", "whoswho", "wien", "wiki", "williamhill", "win", "windows", "wine", "winners", "wme", "wolterskluwer", "woodside", "work", "works", "world", "wow", "ws", "com.ws", "net.ws", "org.ws", "gov.ws", "edu.ws", "wtc", "wtf", "xbox", "xerox", "xihuan", "xin", "xxx", "xyz", "yachts", "yahoo", "yamaxun", "yandex", "ye", "com.ye", "edu.ye", "gov.ye", "net.ye", "mil.ye", "org.ye", "yodobashi", "yoga", "yokohama", "you", "youtube", "yt", "yun", "ac.za", "agric.za", "alt.za", "co.za", "edu.za", "gov.za", "grondar.za", "law.za", "mil.za", "net.za", "ngo.za", "nic.za", "nis.za", "nom.za", "org.za", "school.za", "tm.za", "web.za", "zappos", "zara", "zero", "zip", "zm", "ac.zm", "biz.zm", "co.zm", "com.zm", "edu.zm", "gov.zm", "info.zm", "mil.zm", "net.zm", "org.zm", "sch.zm", "zone", "zuerich", "zw", "ac.zw", "co.zw", "gov.zw", "mil.zw", "org.zw", "ελ", "ευ", "бг", "бел", "дети", "ею", "католик", "ком", "мкд", "мон", "москва", "онлайн", "орг", "рус", "рф", "сайт", "срб", "пр.срб", "орг.срб", "обр.срб", "од.срб", "упр.срб", "ак.срб", "укр", "қаз", "հայ", "ישראל", "אקדמיה.ישראל", "ישוב.ישראל", "צהל.ישראל", "ממשל.ישראל", "קום", "ابوظبي", "ارامكو", "الاردن", "البحرين", "الجزائر", "السعودية", "السعوديه", "السعودیة", "السعودیۃ", "العليان", "المغرب", "اليمن", "امارات", "ايران", "ایران", "بارت", "بازار", "بيتك", "بھارت", "تونس", "سودان", "سوريا", "سورية", "شبكة", "عراق", "عرب", "عمان", "فلسطين", "قطر", "كاثوليك", "كوم", "مصر", "مليسيا", "موريتانيا", "موقع", "همراه", "پاكستان", "پاکستان", "ڀارت", "कॉम", "नेट", "भारत", "भारतम्", "भारोत", "संगठन", "বাংলা", "ভারত", "ভাৰত", "ਭਾਰਤ", "ભારત", "ଭାରତ", "இந்தியா", "இலங்கை", "சிங்கப்பூர்", "భారత్", "ಭಾರತ", "ഭാരതം", "ලංකා", "คอม", "ไทย", "ศึกษา.ไทย", "ธุรกิจ.ไทย", "รัฐบาล.ไทย", "ทหาร.ไทย", "เน็ต.ไทย", "องค์กร.ไทย", "ລາວ", "გე", "みんな", "アマゾン", "クラウド", "グーグル", "コム", "ストア", "セール", "ファッション", "ポイント", "世界", "中信", "中国", "中國", "中文网", "亚马逊", "企业", "佛山", "信息", "健康", "八卦", "公司", "公益", "台湾", "台灣", "商城", "商店", "商标", "嘉里", "嘉里大酒店", "在线", "大拿", "天主教", "娱乐", "家電", "广东", "微博", "慈善", "我爱你", "手机", "招聘", "政务", "政府", "新加坡", "新闻", "时尚", "書籍", "机构", "淡马锡", "游戏", "澳門", "澳门", "点看", "移动", "组织机构", "网址", "网店", "网站", "网络", "联通", "臺灣", "谷歌", "购物", "通販", "集团", "電訊盈科", "飞利浦", "食品", "餐厅", "香格里拉", "香港", "公司.香港", "教育.香港", "政府.香港", "個人.香港", "網絡.香港", "組織.香港", "닷넷", "닷컴", "삼성", "한국"], "private": ["drr.ac", "feedback.ac", "forms.ac", "official.academy", "blogspot.ae", "uwu.ai", "framer.ai", "blogspot.al", "radio.am", "blogspot.am", "adaptable.app", "*.beget.app", "clerk.app", "clerkstage.app", "wnext.app", "csb.app", "preview.csb.app", "cyclic.app", "platform0.app", "deta.app", "ondigitalocean.app", "easypanel.app", "encr.app", "edgecompute.app", "fireweb.app", "onflashdrive.app", "flutterflow.app", "framer.app", "*.run.app", "web.app", "hasura.app", "loginline.app", "messerli.app", "netlify.app", "ngrok.app", "ngrok-free.app", "*.developer.app", "noop.app", "*.northflank.app", "*.upsun.app", "replit.app", "id.replit.app", "*.snowflake.app", "*.privatelink.snowflake.app", "streamlit.app", "storipress.app", "telebit.app", "typedream.app", "vercel.app", "bookonline.app", "blogspot.com.ar", "cloudns.asia", "daemon.asia", "dix.asia", "wien.funkfeuer.at", "*.futurecms.at", "*.ex.futurecms.at", "*.in.futurecms.at", "futurehosting.at", "futuremailing.at", "*.ex.ortsinfo.at", "*.kunden.ortsinfo.at", "blogspot.co.at", "biz.at", "info.at", "123webseite.at", "priv.at", "myspreadshop.at", "12hp.at", "2ix.at", "4lima.at", "lima-city.at", "blogspot.com.au", "mel.cloudlets.com.au", "myspreadshop.com.au", "labeling.ap-northeast-1.sagemaker.aws", "labeling.ap-northeast-2.sagemaker.aws", "labeling.ap-south-1.sagemaker.aws", "labeling.ap-southeast-1.sagemaker.aws", "labeling.ap-southeast-2.sagemaker.aws", "labeling.ca-central-1.sagemaker.aws", "labeling.eu-central-1.sagemaker.aws", "labeling.eu-west-1.sagemaker.aws", "labeling.eu-west-2.sagemaker.aws", "labeling.us-east-1.sagemaker.aws", "labeling.us-east-2.sagemaker.aws", "labeling.us-west-2.sagemaker.aws", "notebook.af-south-1.sagemaker.aws", "notebook.ap-east-1.sagemaker.aws", "notebook.ap-northeast-1.sagemaker.aws", "notebook.ap-northeast-2.sagemaker.aws", "notebook.ap-northeast-3.sagemaker.aws", "notebook.ap-south-1.sagemaker.aws", "notebook.ap-south-2.sagemaker.aws", "notebook.ap-southeast-1.sagemaker.aws", "notebook.ap-southeast-2.sagemaker.aws", "notebook.ap-southeast-3.sagemaker.aws", "notebook.ap-southeast-4.sagemaker.aws", "notebook.ca-central-1.sagemaker.aws", "notebook-fips.ca-central-1.sagemaker.aws", "notebook.ca-west-1.sagemaker.aws", "notebook-fips.ca-west-1.sagemaker.aws", "notebook.eu-central-1.sagemaker.aws", "notebook.eu-central-2.sagemaker.aws", "notebook.eu-north-1.sagemaker.aws", "notebook.eu-south-1.sagemaker.aws", "notebook.eu-south-2.sagemaker.aws", "notebook.eu-west-1.sagemaker.aws", "notebook.eu-west-2.sagemaker.aws", "notebook.eu-west-3.sagemaker.aws", "notebook.il-central-1.sagemaker.aws", "notebook.me-central-1.sagemaker.aws", "notebook.me-south-1.sagemaker.aws", "notebook.sa-east-1.sagemaker.aws", "notebook.us-east-1.sagemaker.aws", "notebook-fips.us-east-1.sagemaker.aws", "notebook.us-east-2.sagemaker.aws", "notebook-fips.us-east-2.sagemaker.aws", "notebook.us-gov-east-1.sagemaker.aws", "notebook-fips.us-gov-east-1.sagemaker.aws", "notebook.us-gov-west-1.sagemaker.aws", "notebook-fips.us-gov-west-1.sagemaker.aws", "notebook.us-west-1.sagemaker.aws", "notebook-fips.us-west-1.sagemaker.aws", "notebook.us-west-2.sagemaker.aws", "notebook-fips.us-west-2.sagemaker.aws", "studio.af-south-1.sagemaker.aws", "studio.ap-east-1.sagemaker.aws", "studio.ap-northeast-1.sagemaker.aws", "studio.ap-northeast-2.sagemaker.aws", "studio.ap-northeast-3.sagemaker.aws", "studio.ap-south-1.sagemaker.aws", "studio.ap-southeast-1.sagemaker.aws", "studio.ap-southeast-2.sagemaker.aws", "studio.ap-southeast-3.sagemaker.aws", "studio.ca-central-1.sagemaker.aws", "studio.eu-central-1.sagemaker.aws", "studio.eu-north-1.sagemaker.aws", "studio.eu-south-1.sagemaker.aws", "studio.eu-south-2.sagemaker.aws", "studio.eu-west-1.sagemaker.aws", "studio.eu-west-2.sagemaker.aws", "studio.eu-west-3.sagemaker.aws", "studio.il-central-1.sagemaker.aws", "studio.me-central-1.sagemaker.aws", "studio.me-south-1.sagemaker.aws", "studio.sa-east-1.sagemaker.aws", "studio.us-east-1.sagemaker.aws", "studio.us-east-2.sagemaker.aws", "studio.us-gov-east-1.sagemaker.aws", "studio-fips.us-gov-east-1.sagemaker.aws", "studio.us-gov-west-1.sagemaker.aws", "studio-fips.us-gov-west-1.sagemaker.aws", "studio.us-west-1.sagemaker.aws", "studio.us-west-2.sagemaker.aws", "*.private.repost.aws", "rs.ba", "blogspot.ba", "aus.basketball", "nz.basketball", "cloudns.be", "webhosting.be", "blogspot.be", "cloud.interhostsolutions.be", "ezproxy.kuleuven.be", "123website.be", "myspreadshop.be", "*.transurl.be", "blogspot.bg", "barsy.bg", "activetrail.biz", "cloudns.biz", "jozi.biz", "dyndns.biz", "for-better.biz", "for-more.biz", "for-some.biz", "for-the.biz", "selfip.biz", "webhop.biz", "orx.biz", "mmafan.biz", "myftp.biz", "no-ip.biz", "dscloud.biz", "blogspot.bj", "co.bn", "blogspot.com.br", "ac.leg.br", "al.leg.br", "am.leg.br", "ap.leg.br", "ba.leg.br", "ce.leg.br", "df.leg.br", "es.leg.br", "go.leg.br", "ma.leg.br", "mg.leg.br", "ms.leg.br", "mt.leg.br", "pa.leg.br", "pb.leg.br", "pe.leg.br", "pi.leg.br", "pr.leg.br", "rj.leg.br", "rn.leg.br", "ro.leg.br", "rr.leg.br", "rs.leg.br", "sc.leg.br", "se.leg.br", "sp.leg.br", "to.leg.br", "simplesite.com.br", "we.bs", "cloudsite.builders", "co.business", "blogspot.com.by", "mycloud.by", "mediatech.by", "za.bz", "mydns.bz", "gsj.bz", "barsy.ca", "*.awdev.ca", "co.ca", "blogspot.ca", "no-ip.ca", "myspreadshop.ca", "at.emf.camp", "ui.nabu.casa", "cloudns.cc", "ftpaccess.cc", "game-server.cc", "myphotos.cc", "scrapping.cc", "twmail.cc", "csx.cc", "fantasyleague.cc", "instances.spawn.cc", "blogspot.cf", "square7.ch", "cust.cloudscale.ch", "objects.lpg.cloudscale.ch", "objects.rma.cloudscale.ch", "cloudns.ch", "blogspot.ch", "alp1.ae.flow.ch", "appengine.flow.ch", "linkyard-cloud.ch", "dnsking.ch", "gotdns.ch", "123website.ch", "myspreadshop.ch", "*.firenet.ch", "*.svc.firenet.ch", "12hp.ch", "2ix.ch", "4lima.ch", "lima-city.ch", "fin.ci", "cloudns.cl", "blogspot.cl", "*.banzai.cloud", "cyclic.cloud", "elementor.cloud", "eu.encoway.cloud", "*.statics.cloud", "ravendb.cloud", "es-1.axarnet.cloud", "diadem.cloud", "vip.jelastic.cloud", "jele.cloud", "it1.eur.aruba.jenv-aruba.cloud", "it1.jenv-aruba.cloud", "keliweb.cloud", "cs.keliweb.cloud", "oxa.cloud", "tn.oxa.cloud", "uk.oxa.cloud", "primetel.cloud", "uk.primetel.cloud", "ca.reclaim.cloud", "uk.reclaim.cloud", "us.reclaim.cloud", "ch.trendhosting.cloud", "de.trendhosting.cloud", "jotelulu.cloud", "kuleuven.cloud", "linkyard.cloud", "*.magentosite.cloud", "perspecta.cloud", "vapor.cloud", "*.on-rancher.cloud", "fr-par-1.baremetal.scw.cloud", "fr-par-2.baremetal.scw.cloud", "nl-ams-1.baremetal.scw.cloud", "cockpit.fr-par.scw.cloud", "fnc.fr-par.scw.cloud", "functions.fnc.fr-par.scw.cloud", "k8s.fr-par.scw.cloud", "nodes.k8s.fr-par.scw.cloud", "s3.fr-par.scw.cloud", "s3-website.fr-par.scw.cloud", "whm.fr-par.scw.cloud", "priv.instances.scw.cloud", "pub.instances.scw.cloud", "k8s.scw.cloud", "cockpit.nl-ams.scw.cloud", "k8s.nl-ams.scw.cloud", "nodes.k8s.nl-ams.scw.cloud", "s3.nl-ams.scw.cloud", "s3-website.nl-ams.scw.cloud", "whm.nl-ams.scw.cloud", "cockpit.pl-waw.scw.cloud", "k8s.pl-waw.scw.cloud", "nodes.k8s.pl-waw.scw.cloud", "s3.pl-waw.scw.cloud", "s3-website.pl-waw.scw.cloud", "scalebook.scw.cloud", "smartlabeling.scw.cloud", "runs.onstackit.cloud", "*.sensiosite.cloud", "trafficplex.cloud", "unison-services.cloud", "urown.cloud", "voorloper.cloud", "zap.cloud", "cloudns.club", "jele.club", "barsy.club", "execute-api.cn-north-1.amazonaws.com.cn", "execute-api.cn-northwest-1.amazonaws.com.cn", "*.compute.amazonaws.com.cn", "emrappui-prod.cn-north-1.amazonaws.com.cn", "emrnotebooks-prod.cn-north-1.amazonaws.com.cn", "emrstudio-prod.cn-north-1.amazonaws.com.cn", "emrappui-prod.cn-northwest-1.amazonaws.com.cn", "emrnotebooks-prod.cn-northwest-1.amazonaws.com.cn", "emrstudio-prod.cn-northwest-1.amazonaws.com.cn", "*.cn-north-1.airflow.amazonaws.com.cn", "*.cn-northwest-1.airflow.amazonaws.com.cn", "s3.dualstack.cn-north-1.amazonaws.com.cn", "s3-accesspoint.dualstack.cn-north-1.amazonaws.com.cn", "s3-website.dualstack.cn-north-1.amazonaws.com.cn", "s3.cn-north-1.amazonaws.com.cn", "s3-accesspoint.cn-north-1.amazonaws.com.cn", "s3-deprecated.cn-north-1.amazonaws.com.cn", "s3-object-lambda.cn-north-1.amazonaws.com.cn", "s3-website.cn-north-1.amazonaws.com.cn", "s3.dualstack.cn-northwest-1.amazonaws.com.cn", "s3-accesspoint.dualstack.cn-northwest-1.amazonaws.com.cn", "s3.cn-northwest-1.amazonaws.com.cn", "s3-accesspoint.cn-northwest-1.amazonaws.com.cn", "s3-object-lambda.cn-northwest-1.amazonaws.com.cn", "s3-website.cn-northwest-1.amazonaws.com.cn", "notebook.cn-north-1.sagemaker.com.cn", "notebook.cn-northwest-1.sagemaker.com.cn", "studio.cn-north-1.sagemaker.com.cn", "studio.cn-northwest-1.sagemaker.com.cn", "cn-north-1.eb.amazonaws.com.cn", "cn-northwest-1.eb.amazonaws.com.cn", "*.elb.amazonaws.com.cn", "canva-apps.cn", "*.my.canvasite.cn", "instantcloud.cn", "myqnapcloud.cn", "direct.quickconnect.cn", "carrd.co", "crd.co", "*.otap.co", "blogspot.com.co", "leadpages.co", "lpages.co", "mypi.co", "n4t.co", "*.xmit.co", "firewalledreplit.co", "id.firewalledreplit.co", "repl.co", "id.repl.co", "supabase.co", "*.owo.codes", "a2hosted.com", "cpserver.com", "*.devcdnaccesso.com", "adobeaemcloud.com", "*.dev.adobeaemcloud.com", "airkitapps.com", "airkitapps-au.com", "aivencloud.com", "kasserver.com", "execute-api.af-south-1.amazonaws.com", "execute-api.ap-east-1.amazonaws.com", "execute-api.ap-northeast-1.amazonaws.com", "execute-api.ap-northeast-2.amazonaws.com", "execute-api.ap-northeast-3.amazonaws.com", "execute-api.ap-south-1.amazonaws.com", "execute-api.ap-south-2.amazonaws.com", "execute-api.ap-southeast-1.amazonaws.com", "execute-api.ap-southeast-2.amazonaws.com", "execute-api.ap-southeast-3.amazonaws.com", "execute-api.ap-southeast-4.amazonaws.com", "execute-api.ca-central-1.amazonaws.com", "execute-api.ca-west-1.amazonaws.com", "execute-api.eu-central-1.amazonaws.com", "execute-api.eu-central-2.amazonaws.com", "execute-api.eu-north-1.amazonaws.com", "execute-api.eu-south-1.amazonaws.com", "execute-api.eu-south-2.amazonaws.com", "execute-api.eu-west-1.amazonaws.com", "execute-api.eu-west-2.amazonaws.com", "execute-api.eu-west-3.amazonaws.com", "execute-api.il-central-1.amazonaws.com", "execute-api.me-central-1.amazonaws.com", "execute-api.me-south-1.amazonaws.com", "execute-api.sa-east-1.amazonaws.com", "execute-api.us-east-1.amazonaws.com", "execute-api.us-east-2.amazonaws.com", "execute-api.us-gov-east-1.amazonaws.com", "execute-api.us-gov-west-1.amazonaws.com", "execute-api.us-west-1.amazonaws.com", "execute-api.us-west-2.amazonaws.com", "auth.af-south-1.amazoncognito.com", "auth.ap-northeast-1.amazoncognito.com", "auth.ap-northeast-2.amazoncognito.com", "auth.ap-northeast-3.amazoncognito.com", "auth.ap-south-1.amazoncognito.com", "auth.ap-south-2.amazoncognito.com", "auth.ap-southeast-1.amazoncognito.com", "auth.ap-southeast-2.amazoncognito.com", "auth.ap-southeast-3.amazoncognito.com", "auth.ap-southeast-4.amazoncognito.com", "auth.ca-central-1.amazoncognito.com", "auth.eu-central-1.amazoncognito.com", "auth.eu-central-2.amazoncognito.com", "auth.eu-north-1.amazoncognito.com", "auth.eu-south-1.amazoncognito.com", "auth.eu-south-2.amazoncognito.com", "auth.eu-west-1.amazoncognito.com", "auth.eu-west-2.amazoncognito.com", "auth.eu-west-3.amazoncognito.com", "auth.il-central-1.amazoncognito.com", "auth.me-central-1.amazoncognito.com", "auth.me-south-1.amazoncognito.com", "auth.sa-east-1.amazoncognito.com", "auth.us-east-1.amazoncognito.com", "auth-fips.us-east-1.amazoncognito.com", "auth.us-east-2.amazoncognito.com", "auth-fips.us-east-2.amazoncognito.com", "auth-fips.us-gov-west-1.amazoncognito.com", "auth.us-west-1.amazoncognito.com", "auth-fips.us-west-1.amazoncognito.com", "auth.us-west-2.amazoncognito.com", "auth-fips.us-west-2.amazoncognito.com", "*.compute.amazonaws.com", "*.compute-1.amazonaws.com", "us-east-1.amazonaws.com", "emrappui-prod.af-south-1.amazonaws.com", "emrnotebooks-prod.af-south-1.amazonaws.com", "emrstudio-prod.af-south-1.amazonaws.com", "emrappui-prod.ap-east-1.amazonaws.com", "emrnotebooks-prod.ap-east-1.amazonaws.com", "emrstudio-prod.ap-east-1.amazonaws.com", "emrappui-prod.ap-northeast-1.amazonaws.com", "emrnotebooks-prod.ap-northeast-1.amazonaws.com", "emrstudio-prod.ap-northeast-1.amazonaws.com", "emrappui-prod.ap-northeast-2.amazonaws.com", "emrnotebooks-prod.ap-northeast-2.amazonaws.com", "emrstudio-prod.ap-northeast-2.amazonaws.com", "emrappui-prod.ap-northeast-3.amazonaws.com", "emrnotebooks-prod.ap-northeast-3.amazonaws.com", "emrstudio-prod.ap-northeast-3.amazonaws.com", "emrappui-prod.ap-south-1.amazonaws.com", "emrnotebooks-prod.ap-south-1.amazonaws.com", "emrstudio-prod.ap-south-1.amazonaws.com", "emrappui-prod.ap-south-2.amazonaws.com", "emrnotebooks-prod.ap-south-2.amazonaws.com", "emrstudio-prod.ap-south-2.amazonaws.com", "emrappui-prod.ap-southeast-1.amazonaws.com", "emrnotebooks-prod.ap-southeast-1.amazonaws.com", "emrstudio-prod.ap-southeast-1.amazonaws.com", "emrappui-prod.ap-southeast-2.amazonaws.com", "emrnotebooks-prod.ap-southeast-2.amazonaws.com", "emrstudio-prod.ap-southeast-2.amazonaws.com", "emrappui-prod.ap-southeast-3.amazonaws.com", "emrnotebooks-prod.ap-southeast-3.amazonaws.com", "emrstudio-prod.ap-southeast-3.amazonaws.com", "emrappui-prod.ap-southeast-4.amazonaws.com", "emrnotebooks-prod.ap-southeast-4.amazonaws.com", "emrstudio-prod.ap-southeast-4.amazonaws.com", "emrappui-prod.ca-central-1.amazonaws.com", "emrnotebooks-prod.ca-central-1.amazonaws.com", "emrstudio-prod.ca-central-1.amazonaws.com", "emrappui-prod.ca-west-1.amazonaws.com", "emrnotebooks-prod.ca-west-1.amazonaws.com", "emrstudio-prod.ca-west-1.amazonaws.com", "emrappui-prod.eu-central-1.amazonaws.com", "emrnotebooks-prod.eu-central-1.amazonaws.com", "emrstudio-prod.eu-central-1.amazonaws.com", "emrappui-prod.eu-central-2.amazonaws.com", "emrnotebooks-prod.eu-central-2.amazonaws.com", "emrstudio-prod.eu-central-2.amazonaws.com", "emrappui-prod.eu-north-1.amazonaws.com", "emrnotebooks-prod.eu-north-1.amazonaws.com", "emrstudio-prod.eu-north-1.amazonaws.com", "emrappui-prod.eu-south-1.amazonaws.com", "emrnotebooks-prod.eu-south-1.amazonaws.com", "emrstudio-prod.eu-south-1.amazonaws.com", "emrappui-prod.eu-south-2.amazonaws.com", "emrnotebooks-prod.eu-south-2.amazonaws.com", "emrstudio-prod.eu-south-2.amazonaws.com", "emrappui-prod.eu-west-1.amazonaws.com", "emrnotebooks-prod.eu-west-1.amazonaws.com", "emrstudio-prod.eu-west-1.amazonaws.com", "emrappui-prod.eu-west-2.amazonaws.com", "emrnotebooks-prod.eu-west-2.amazonaws.com", "emrstudio-prod.eu-west-2.amazonaws.com", "emrappui-prod.eu-west-3.amazonaws.com", "emrnotebooks-prod.eu-west-3.amazonaws.com", "emrstudio-prod.eu-west-3.amazonaws.com", "emrappui-prod.il-central-1.amazonaws.com", "emrnotebooks-prod.il-central-1.amazonaws.com", "emrstudio-prod.il-central-1.amazonaws.com", "emrappui-prod.me-central-1.amazonaws.com", "emrnotebooks-prod.me-central-1.amazonaws.com", "emrstudio-prod.me-central-1.amazonaws.com", "emrappui-prod.me-south-1.amazonaws.com", "emrnotebooks-prod.me-south-1.amazonaws.com", "emrstudio-prod.me-south-1.amazonaws.com", "emrappui-prod.sa-east-1.amazonaws.com", "emrnotebooks-prod.sa-east-1.amazonaws.com", "emrstudio-prod.sa-east-1.amazonaws.com", "emrappui-prod.us-east-1.amazonaws.com", "emrnotebooks-prod.us-east-1.amazonaws.com", "emrstudio-prod.us-east-1.amazonaws.com", "emrappui-prod.us-east-2.amazonaws.com", "emrnotebooks-prod.us-east-2.amazonaws.com", "emrstudio-prod.us-east-2.amazonaws.com", "emrappui-prod.us-gov-east-1.amazonaws.com", "emrnotebooks-prod.us-gov-east-1.amazonaws.com", "emrstudio-prod.us-gov-east-1.amazonaws.com", "emrappui-prod.us-gov-west-1.amazonaws.com", "emrnotebooks-prod.us-gov-west-1.amazonaws.com", "emrstudio-prod.us-gov-west-1.amazonaws.com", "emrappui-prod.us-west-1.amazonaws.com", "emrnotebooks-prod.us-west-1.amazonaws.com", "emrstudio-prod.us-west-1.amazonaws.com", "emrappui-prod.us-west-2.amazonaws.com", "emrnotebooks-prod.us-west-2.amazonaws.com", "emrstudio-prod.us-west-2.amazonaws.com", "*.af-south-1.airflow.amazonaws.com", "*.ap-east-1.airflow.amazonaws.com", "*.ap-northeast-1.airflow.amazonaws.com", "*.ap-northeast-2.airflow.amazonaws.com", "*.ap-south-1.airflow.amazonaws.com", "*.ap-southeast-1.airflow.amazonaws.com", "*.ap-southeast-2.airflow.amazonaws.com", "*.ca-central-1.airflow.amazonaws.com", "*.eu-central-1.airflow.amazonaws.com", "*.eu-north-1.airflow.amazonaws.com", "*.eu-south-1.airflow.amazonaws.com", "*.eu-west-1.airflow.amazonaws.com", "*.eu-west-2.airflow.amazonaws.com", "*.eu-west-3.airflow.amazonaws.com", "*.me-south-1.airflow.amazonaws.com", "*.sa-east-1.airflow.amazonaws.com", "*.us-east-1.airflow.amazonaws.com", "*.us-east-2.airflow.amazonaws.com", "*.us-west-1.airflow.amazonaws.com", "*.us-west-2.airflow.amazonaws.com", "s3.dualstack.af-south-1.amazonaws.com", "s3-accesspoint.dualstack.af-south-1.amazonaws.com", "s3-website.dualstack.af-south-1.amazonaws.com", "s3.af-south-1.amazonaws.com", "s3-accesspoint.af-south-1.amazonaws.com", "s3-object-lambda.af-south-1.amazonaws.com", "s3-website.af-south-1.amazonaws.com", "s3.dualstack.ap-east-1.amazonaws.com", "s3-accesspoint.dualstack.ap-east-1.amazonaws.com", "s3.ap-east-1.amazonaws.com", "s3-accesspoint.ap-east-1.amazonaws.com", "s3-object-lambda.ap-east-1.amazonaws.com", "s3-website.ap-east-1.amazonaws.com", "s3.dualstack.ap-northeast-1.amazonaws.com", "s3-accesspoint.dualstack.ap-northeast-1.amazonaws.com", "s3-website.dualstack.ap-northeast-1.amazonaws.com", "s3.ap-northeast-1.amazonaws.com", "s3-accesspoint.ap-northeast-1.amazonaws.com", "s3-object-lambda.ap-northeast-1.amazonaws.com", "s3-website.ap-northeast-1.amazonaws.com", "s3.dualstack.ap-northeast-2.amazonaws.com", "s3-accesspoint.dualstack.ap-northeast-2.amazonaws.com", "s3-website.dualstack.ap-northeast-2.amazonaws.com", "s3.ap-northeast-2.amazonaws.com", "s3-accesspoint.ap-northeast-2.amazonaws.com", "s3-object-lambda.ap-northeast-2.amazonaws.com", "s3-website.ap-northeast-2.amazonaws.com", "s3.dualstack.ap-northeast-3.amazonaws.com", "s3-accesspoint.dualstack.ap-northeast-3.amazonaws.com", "s3-website.dualstack.ap-northeast-3.amazonaws.com", "s3.ap-northeast-3.amazonaws.com", "s3-accesspoint.ap-northeast-3.amazonaws.com", "s3-object-lambda.ap-northeast-3.amazonaws.com", "s3-website.ap-northeast-3.amazonaws.com", "s3.dualstack.ap-south-1.amazonaws.com", "s3-accesspoint.dualstack.ap-south-1.amazonaws.com", "s3-website.dualstack.ap-south-1.amazonaws.com", "s3.ap-south-1.amazonaws.com", "s3-accesspoint.ap-south-1.amazonaws.com", "s3-object-lambda.ap-south-1.amazonaws.com", "s3-website.ap-south-1.amazonaws.com", "s3.dualstack.ap-south-2.amazonaws.com", "s3-accesspoint.dualstack.ap-south-2.amazonaws.com", "s3.ap-south-2.amazonaws.com", "s3-accesspoint.ap-south-2.amazonaws.com", "s3-object-lambda.ap-south-2.amazonaws.com", "s3-website.ap-south-2.amazonaws.com", "s3.dualstack.ap-southeast-1.amazonaws.com", "s3-accesspoint.dualstack.ap-southeast-1.amazonaws.com", "s3-website.dualstack.ap-southeast-1.amazonaws.com", "s3.ap-southeast-1.amazonaws.com", "s3-accesspoint.ap-southeast-1.amazonaws.com", "s3-object-lambda.ap-southeast-1.amazonaws.com", "s3-website.ap-southeast-1.amazonaws.com", "s3.dualstack.ap-southeast-2.amazonaws.com", "s3-accesspoint.dualstack.ap-southeast-2.amazonaws.com", "s3-website.dualstack.ap-southeast-2.amazonaws.com", "s3.ap-southeast-2.amazonaws.com", "s3-accesspoint.ap-southeast-2.amazonaws.com", "s3-object-lambda.ap-southeast-2.amazonaws.com", "s3-website.ap-southeast-2.amazonaws.com", "s3.dualstack.ap-southeast-3.amazonaws.com", "s3-accesspoint.dualstack.ap-southeast-3.amazonaws.com", "s3.ap-southeast-3.amazonaws.com", "s3-accesspoint.ap-southeast-3.amazonaws.com", "s3-object-lambda.ap-southeast-3.amazonaws.com", "s3-website.ap-southeast-3.amazonaws.com", "s3.dualstack.ap-southeast-4.amazonaws.com", "s3-accesspoint.dualstack.ap-southeast-4.amazonaws.com", "s3.ap-southeast-4.amazonaws.com", "s3-accesspoint.ap-southeast-4.amazonaws.com", "s3-object-lambda.ap-southeast-4.amazonaws.com", "s3-website.ap-southeast-4.amazonaws.com", "s3.dualstack.ca-central-1.amazonaws.com", "s3-accesspoint.dualstack.ca-central-1.amazonaws.com", "s3-accesspoint-fips.dualstack.ca-central-1.amazonaws.com", "s3-fips.dualstack.ca-central-1.amazonaws.com", "s3-website.dualstack.ca-central-1.amazonaws.com", "s3.ca-central-1.amazonaws.com", "s3-accesspoint.ca-central-1.amazonaws.com", "s3-accesspoint-fips.ca-central-1.amazonaws.com", "s3-fips.ca-central-1.amazonaws.com", "s3-object-lambda.ca-central-1.amazonaws.com", "s3-website.ca-central-1.amazonaws.com", "s3.dualstack.ca-west-1.amazonaws.com", "s3-accesspoint.dualstack.ca-west-1.amazonaws.com", "s3-accesspoint-fips.dualstack.ca-west-1.amazonaws.com", "s3-fips.dualstack.ca-west-1.amazonaws.com", "s3-website.dualstack.ca-west-1.amazonaws.com", "s3.ca-west-1.amazonaws.com", "s3-accesspoint.ca-west-1.amazonaws.com", "s3-accesspoint-fips.ca-west-1.amazonaws.com", "s3-fips.ca-west-1.amazonaws.com", "s3-website.ca-west-1.amazonaws.com", "s3.dualstack.eu-central-1.amazonaws.com", "s3-accesspoint.dualstack.eu-central-1.amazonaws.com", "s3-website.dualstack.eu-central-1.amazonaws.com", "s3.eu-central-1.amazonaws.com", "s3-accesspoint.eu-central-1.amazonaws.com", "s3-object-lambda.eu-central-1.amazonaws.com", "s3-website.eu-central-1.amazonaws.com", "s3.dualstack.eu-central-2.amazonaws.com", "s3-accesspoint.dualstack.eu-central-2.amazonaws.com", "s3.eu-central-2.amazonaws.com", "s3-accesspoint.eu-central-2.amazonaws.com", "s3-object-lambda.eu-central-2.amazonaws.com", "s3-website.eu-central-2.amazonaws.com", "s3.dualstack.eu-north-1.amazonaws.com", "s3-accesspoint.dualstack.eu-north-1.amazonaws.com", "s3.eu-north-1.amazonaws.com", "s3-accesspoint.eu-north-1.amazonaws.com", "s3-object-lambda.eu-north-1.amazonaws.com", "s3-website.eu-north-1.amazonaws.com", "s3.dualstack.eu-south-1.amazonaws.com", "s3-accesspoint.dualstack.eu-south-1.amazonaws.com", "s3-website.dualstack.eu-south-1.amazonaws.com", "s3.eu-south-1.amazonaws.com", "s3-accesspoint.eu-south-1.amazonaws.com", "s3-object-lambda.eu-south-1.amazonaws.com", "s3-website.eu-south-1.amazonaws.com", "s3.dualstack.eu-south-2.amazonaws.com", "s3-accesspoint.dualstack.eu-south-2.amazonaws.com", "s3.eu-south-2.amazonaws.com", "s3-accesspoint.eu-south-2.amazonaws.com", "s3-object-lambda.eu-south-2.amazonaws.com", "s3-website.eu-south-2.amazonaws.com", "s3.dualstack.eu-west-1.amazonaws.com", "s3-accesspoint.dualstack.eu-west-1.amazonaws.com", "s3-website.dualstack.eu-west-1.amazonaws.com", "s3.eu-west-1.amazonaws.com", "s3-accesspoint.eu-west-1.amazonaws.com", "s3-deprecated.eu-west-1.amazonaws.com", "s3-object-lambda.eu-west-1.amazonaws.com", "s3-website.eu-west-1.amazonaws.com", "s3.dualstack.eu-west-2.amazonaws.com", "s3-accesspoint.dualstack.eu-west-2.amazonaws.com", "s3.eu-west-2.amazonaws.com", "s3-accesspoint.eu-west-2.amazonaws.com", "s3-object-lambda.eu-west-2.amazonaws.com", "s3-website.eu-west-2.amazonaws.com", "s3.dualstack.eu-west-3.amazonaws.com", "s3-accesspoint.dualstack.eu-west-3.amazonaws.com", "s3-website.dualstack.eu-west-3.amazonaws.com", "s3.eu-west-3.amazonaws.com", "s3-accesspoint.eu-west-3.amazonaws.com", "s3-object-lambda.eu-west-3.amazonaws.com", "s3-website.eu-west-3.amazonaws.com", "s3.dualstack.il-central-1.amazonaws.com", "s3-accesspoint.dualstack.il-central-1.amazonaws.com", "s3.il-central-1.amazonaws.com", "s3-accesspoint.il-central-1.amazonaws.com", "s3-object-lambda.il-central-1.amazonaws.com", "s3-website.il-central-1.amazonaws.com", "s3.dualstack.me-central-1.amazonaws.com", "s3-accesspoint.dualstack.me-central-1.amazonaws.com", "s3.me-central-1.amazonaws.com", "s3-accesspoint.me-central-1.amazonaws.com", "s3-object-lambda.me-central-1.amazonaws.com", "s3-website.me-central-1.amazonaws.com", "s3.dualstack.me-south-1.amazonaws.com", "s3-accesspoint.dualstack.me-south-1.amazonaws.com", "s3.me-south-1.amazonaws.com", "s3-accesspoint.me-south-1.amazonaws.com", "s3-object-lambda.me-south-1.amazonaws.com", "s3-website.me-south-1.amazonaws.com", "s3.amazonaws.com", "s3-1.amazonaws.com", "s3-ap-east-1.amazonaws.com", "s3-ap-northeast-1.amazonaws.com", "s3-ap-northeast-2.amazonaws.com", "s3-ap-northeast-3.amazonaws.com", "s3-ap-south-1.amazonaws.com", "s3-ap-southeast-1.amazonaws.com", "s3-ap-southeast-2.amazonaws.com", "s3-ca-central-1.amazonaws.com", "s3-eu-central-1.amazonaws.com", "s3-eu-north-1.amazonaws.com", "s3-eu-west-1.amazonaws.com", "s3-eu-west-2.amazonaws.com", "s3-eu-west-3.amazonaws.com", "s3-external-1.amazonaws.com", "s3-fips-us-gov-east-1.amazonaws.com", "s3-fips-us-gov-west-1.amazonaws.com", "mrap.accesspoint.s3-global.amazonaws.com", "s3-me-south-1.amazonaws.com", "s3-sa-east-1.amazonaws.com", "s3-us-east-2.amazonaws.com", "s3-us-gov-east-1.amazonaws.com", "s3-us-gov-west-1.amazonaws.com", "s3-us-west-1.amazonaws.com", "s3-us-west-2.amazonaws.com", "s3-website-ap-northeast-1.amazonaws.com", "s3-website-ap-southeast-1.amazonaws.com", "s3-website-ap-southeast-2.amazonaws.com", "s3-website-eu-west-1.amazonaws.com", "s3-website-sa-east-1.amazonaws.com", "s3-website-us-east-1.amazonaws.com", "s3-website-us-gov-west-1.amazonaws.com", "s3-website-us-west-1.amazonaws.com", "s3-website-us-west-2.amazonaws.com", "s3.dualstack.sa-east-1.amazonaws.com", "s3-accesspoint.dualstack.sa-east-1.amazonaws.com", "s3-website.dualstack.sa-east-1.amazonaws.com", "s3.sa-east-1.amazonaws.com", "s3-accesspoint.sa-east-1.amazonaws.com", "s3-object-lambda.sa-east-1.amazonaws.com", "s3-website.sa-east-1.amazonaws.com", "s3.dualstack.us-east-1.amazonaws.com", "s3-accesspoint.dualstack.us-east-1.amazonaws.com", "s3-accesspoint-fips.dualstack.us-east-1.amazonaws.com", "s3-fips.dualstack.us-east-1.amazonaws.com", "s3-website.dualstack.us-east-1.amazonaws.com", "s3.us-east-1.amazonaws.com", "s3-accesspoint.us-east-1.amazonaws.com", "s3-accesspoint-fips.us-east-1.amazonaws.com", "s3-deprecated.us-east-1.amazonaws.com", "s3-fips.us-east-1.amazonaws.com", "s3-object-lambda.us-east-1.amazonaws.com", "s3-website.us-east-1.amazonaws.com", "s3.dualstack.us-east-2.amazonaws.com", "s3-accesspoint.dualstack.us-east-2.amazonaws.com", "s3-accesspoint-fips.dualstack.us-east-2.amazonaws.com", "s3-fips.dualstack.us-east-2.amazonaws.com", "s3.us-east-2.amazonaws.com", "s3-accesspoint.us-east-2.amazonaws.com", "s3-accesspoint-fips.us-east-2.amazonaws.com", "s3-deprecated.us-east-2.amazonaws.com", "s3-fips.us-east-2.amazonaws.com", "s3-object-lambda.us-east-2.amazonaws.com", "s3-website.us-east-2.amazonaws.com", "s3.dualstack.us-gov-east-1.amazonaws.com", "s3-accesspoint.dualstack.us-gov-east-1.amazonaws.com", "s3-accesspoint-fips.dualstack.us-gov-east-1.amazonaws.com", "s3-fips.dualstack.us-gov-east-1.amazonaws.com", "s3.us-gov-east-1.amazonaws.com", "s3-accesspoint.us-gov-east-1.amazonaws.com", "s3-accesspoint-fips.us-gov-east-1.amazonaws.com", "s3-fips.us-gov-east-1.amazonaws.com", "s3-object-lambda.us-gov-east-1.amazonaws.com", "s3-website.us-gov-east-1.amazonaws.com", "s3.dualstack.us-gov-west-1.amazonaws.com", "s3-accesspoint.dualstack.us-gov-west-1.amazonaws.com", "s3-accesspoint-fips.dualstack.us-gov-west-1.amazonaws.com", "s3-fips.dualstack.us-gov-west-1.amazonaws.com", "s3.us-gov-west-1.amazonaws.com", "s3-accesspoint.us-gov-west-1.amazonaws.com", "s3-accesspoint-fips.us-gov-west-1.amazonaws.com", "s3-fips.us-gov-west-1.amazonaws.com", "s3-object-lambda.us-gov-west-1.amazonaws.com", "s3-website.us-gov-west-1.amazonaws.com", "s3.dualstack.us-west-1.amazonaws.com", "s3-accesspoint.dualstack.us-west-1.amazonaws.com", "s3-accesspoint-fips.dualstack.us-west-1.amazonaws.com", "s3-fips.dualstack.us-west-1.amazonaws.com", "s3-website.dualstack.us-west-1.amazonaws.com", "s3.us-west-1.amazonaws.com", "s3-accesspoint.us-west-1.amazonaws.com", "s3-accesspoint-fips.us-west-1.amazonaws.com", "s3-fips.us-west-1.amazonaws.com", "s3-object-lambda.us-west-1.amazonaws.com", "s3-website.us-west-1.amazonaws.com", "s3.dualstack.us-west-2.amazonaws.com", "s3-accesspoint.dualstack.us-west-2.amazonaws.com", "s3-accesspoint-fips.dualstack.us-west-2.amazonaws.com", "s3-fips.dualstack.us-west-2.amazonaws.com", "s3-website.dualstack.us-west-2.amazonaws.com", "s3.us-west-2.amazonaws.com", "s3-accesspoint.us-west-2.amazonaws.com", "s3-accesspoint-fips.us-west-2.amazonaws.com", "s3-deprecated.us-west-2.amazonaws.com", "s3-fips.us-west-2.amazonaws.com", "s3-object-lambda.us-west-2.amazonaws.com", "s3-website.us-west-2.amazonaws.com", "analytics-gateway.ap-northeast-1.amazonaws.com", "analytics-gateway.ap-northeast-2.amazonaws.com", "analytics-gateway.ap-south-1.amazonaws.com", "analytics-gateway.ap-southeast-1.amazonaws.com", "analytics-gateway.ap-southeast-2.amazonaws.com", "analytics-gateway.eu-central-1.amazonaws.com", "analytics-gateway.eu-west-1.amazonaws.com", "analytics-gateway.us-east-1.amazonaws.com", "analytics-gateway.us-east-2.amazonaws.com", "analytics-gateway.us-west-2.amazonaws.com", "*.amplifyapp.com", "*.awsapprunner.com", "webview-assets.aws-cloud9.af-south-1.amazonaws.com", "vfs.cloud9.af-south-1.amazonaws.com", "webview-assets.cloud9.af-south-1.amazonaws.com", "webview-assets.aws-cloud9.ap-east-1.amazonaws.com", "vfs.cloud9.ap-east-1.amazonaws.com", "webview-assets.cloud9.ap-east-1.amazonaws.com", "webview-assets.aws-cloud9.ap-northeast-1.amazonaws.com", "vfs.cloud9.ap-northeast-1.amazonaws.com", "webview-assets.cloud9.ap-northeast-1.amazonaws.com", "webview-assets.aws-cloud9.ap-northeast-2.amazonaws.com", "vfs.cloud9.ap-northeast-2.amazonaws.com", "webview-assets.cloud9.ap-northeast-2.amazonaws.com", "webview-assets.aws-cloud9.ap-northeast-3.amazonaws.com", "vfs.cloud9.ap-northeast-3.amazonaws.com", "webview-assets.cloud9.ap-northeast-3.amazonaws.com", "webview-assets.aws-cloud9.ap-south-1.amazonaws.com", "vfs.cloud9.ap-south-1.amazonaws.com", "webview-assets.cloud9.ap-south-1.amazonaws.com", "webview-assets.aws-cloud9.ap-southeast-1.amazonaws.com", "vfs.cloud9.ap-southeast-1.amazonaws.com", "webview-assets.cloud9.ap-southeast-1.amazonaws.com", "webview-assets.aws-cloud9.ap-southeast-2.amazonaws.com", "vfs.cloud9.ap-southeast-2.amazonaws.com", "webview-assets.cloud9.ap-southeast-2.amazonaws.com", "webview-assets.aws-cloud9.ca-central-1.amazonaws.com", "vfs.cloud9.ca-central-1.amazonaws.com", "webview-assets.cloud9.ca-central-1.amazonaws.com", "webview-assets.aws-cloud9.eu-central-1.amazonaws.com", "vfs.cloud9.eu-central-1.amazonaws.com", "webview-assets.cloud9.eu-central-1.amazonaws.com", "webview-assets.aws-cloud9.eu-north-1.amazonaws.com", "vfs.cloud9.eu-north-1.amazonaws.com", "webview-assets.cloud9.eu-north-1.amazonaws.com", "webview-assets.aws-cloud9.eu-south-1.amazonaws.com", "vfs.cloud9.eu-south-1.amazonaws.com", "webview-assets.cloud9.eu-south-1.amazonaws.com", "webview-assets.aws-cloud9.eu-west-1.amazonaws.com", "vfs.cloud9.eu-west-1.amazonaws.com", "webview-assets.cloud9.eu-west-1.amazonaws.com", "webview-assets.aws-cloud9.eu-west-2.amazonaws.com", "vfs.cloud9.eu-west-2.amazonaws.com", "webview-assets.cloud9.eu-west-2.amazonaws.com", "webview-assets.aws-cloud9.eu-west-3.amazonaws.com", "vfs.cloud9.eu-west-3.amazonaws.com", "webview-assets.cloud9.eu-west-3.amazonaws.com", "webview-assets.aws-cloud9.il-central-1.amazonaws.com", "vfs.cloud9.il-central-1.amazonaws.com", "webview-assets.aws-cloud9.me-south-1.amazonaws.com", "vfs.cloud9.me-south-1.amazonaws.com", "webview-assets.cloud9.me-south-1.amazonaws.com", "webview-assets.aws-cloud9.sa-east-1.amazonaws.com", "vfs.cloud9.sa-east-1.amazonaws.com", "webview-assets.cloud9.sa-east-1.amazonaws.com", "webview-assets.aws-cloud9.us-east-1.amazonaws.com", "vfs.cloud9.us-east-1.amazonaws.com", "webview-assets.cloud9.us-east-1.amazonaws.com", "webview-assets.aws-cloud9.us-east-2.amazonaws.com", "vfs.cloud9.us-east-2.amazonaws.com", "webview-assets.cloud9.us-east-2.amazonaws.com", "webview-assets.aws-cloud9.us-west-1.amazonaws.com", "vfs.cloud9.us-west-1.amazonaws.com", "webview-assets.cloud9.us-west-1.amazonaws.com", "webview-assets.aws-cloud9.us-west-2.amazonaws.com", "vfs.cloud9.us-west-2.amazonaws.com", "webview-assets.cloud9.us-west-2.amazonaws.com", "awsapps.com", "elasticbeanstalk.com", "af-south-1.elasticbeanstalk.com", "ap-east-1.elasticbeanstalk.com", "ap-northeast-1.elasticbeanstalk.com", "ap-northeast-2.elasticbeanstalk.com", "ap-northeast-3.elasticbeanstalk.com", "ap-south-1.elasticbeanstalk.com", "ap-southeast-1.elasticbeanstalk.com", "ap-southeast-2.elasticbeanstalk.com", "ap-southeast-3.elasticbeanstalk.com", "ca-central-1.elasticbeanstalk.com", "eu-central-1.elasticbeanstalk.com", "eu-north-1.elasticbeanstalk.com", "eu-south-1.elasticbeanstalk.com", "eu-west-1.elasticbeanstalk.com", "eu-west-2.elasticbeanstalk.com", "eu-west-3.elasticbeanstalk.com", "il-central-1.elasticbeanstalk.com", "me-south-1.elasticbeanstalk.com", "sa-east-1.elasticbeanstalk.com", "us-east-1.elasticbeanstalk.com", "us-east-2.elasticbeanstalk.com", "us-gov-east-1.elasticbeanstalk.com", "us-gov-west-1.elasticbeanstalk.com", "us-west-1.elasticbeanstalk.com", "us-west-2.elasticbeanstalk.com", "*.elb.amazonaws.com", "awsglobalaccelerator.com", "siiites.com", "appspacehosted.com", "appspaceusercontent.com", "on-aptible.com", "myasustor.com", "balena-devices.com", "betainabox.com", "boutir.com", "bplaced.com", "cafjs.com", "canva-apps.com", "br.com", "cn.com", "de.com", "eu.com", "jpn.com", "mex.com", "ru.com", "sa.com", "uk.com", "us.com", "za.com", "ar.com", "hu.com", "kr.com", "no.com", "qc.com", "uy.com", "africa.com", "gr.com", "co.com", "jdevcloud.com", "wpdevcloud.com", "cloudcontrolled.com", "cloudcontrolapp.com", "cf-ipfs.com", "cloudflare-ipfs.com", "trycloudflare.com", "cdn77-storage.com", "dnsabr.com", "*.cprapid.com", "*.customer-oci.com", "*.oci.customer-oci.com", "*.ocp.customer-oci.com", "*.ocs.customer-oci.com", "cyclic-app.com", "dattolocal.com", "dattorelay.com", "dattoweb.com", "mydatto.com", "builtwithdark.com", "demo.datadetect.com", "instance.datadetect.com", "ddns5.com", "discordsays.com", "discordsez.com", "drayddns.com", "dreamhosters.com", "mydrobo.com", "dyndns-at-home.com", "dyndns-at-work.com", "dyndns-blog.com", "dyndns-free.com", "dyndns-home.com", "dyndns-ip.com", "dyndns-mail.com", "dyndns-office.com", "dyndns-pics.com", "dyndns-remote.com", "dyndns-server.com", "dyndns-web.com", "dyndns-wiki.com", "dyndns-work.com", "blogdns.com", "cechire.com", "dnsalias.com", "dnsdojo.com", "doesntexist.com", "dontexist.com", "doomdns.com", "dyn-o-saur.com", "dynalias.com", "est-a-la-maison.com", "est-a-la-masion.com", "est-le-patron.com", "est-mon-blogueur.com", "from-ak.com", "from-al.com", "from-ar.com", "from-ca.com", "from-ct.com", "from-dc.com", "from-de.com", "from-fl.com", "from-ga.com", "from-hi.com", "from-ia.com", "from-id.com", "from-il.com", "from-in.com", "from-ks.com", "from-ky.com", "from-ma.com", "from-md.com", "from-mi.com", "from-mn.com", "from-mo.com", "from-ms.com", "from-mt.com", "from-nc.com", "from-nd.com", "from-ne.com", "from-nh.com", "from-nj.com", "from-nm.com", "from-nv.com", "from-oh.com", "from-ok.com", "from-or.com", "from-pa.com", "from-pr.com", "from-ri.com", "from-sc.com", "from-sd.com", "from-tn.com", "from-tx.com", "from-ut.com", "from-va.com", "from-vt.com", "from-wa.com", "from-wi.com", "from-wv.com", "from-wy.com", "getmyip.com", "gotdns.com", "hobby-site.com", "homelinux.com", "homeunix.com", "iamallama.com", "is-a-anarchist.com", "is-a-blogger.com", "is-a-bookkeeper.com", "is-a-bulls-fan.com", "is-a-caterer.com", "is-a-chef.com", "is-a-conservative.com", "is-a-cpa.com", "is-a-cubicle-slave.com", "is-a-democrat.com", "is-a-designer.com", "is-a-doctor.com", "is-a-financialadvisor.com", "is-a-geek.com", "is-a-green.com", "is-a-guru.com", "is-a-hard-worker.com", "is-a-hunter.com", "is-a-landscaper.com", "is-a-lawyer.com", "is-a-liberal.com", "is-a-libertarian.com", "is-a-llama.com", "is-a-musician.com", "is-a-nascarfan.com", "is-a-nurse.com", "is-a-painter.com", "is-a-personaltrainer.com", "is-a-photographer.com", "is-a-player.com", "is-a-republican.com", "is-a-rockstar.com", "is-a-socialist.com", "is-a-student.com", "is-a-teacher.com", "is-a-techie.com", "is-a-therapist.com", "is-an-accountant.com", "is-an-actor.com", "is-an-actress.com", "is-an-anarchist.com", "is-an-artist.com", "is-an-engineer.com", "is-an-entertainer.com", "is-certified.com", "is-gone.com", "is-into-anime.com", "is-into-cars.com", "is-into-cartoons.com", "is-into-games.com", "is-leet.com", "is-not-certified.com", "is-slick.com", "is-uberleet.com", "is-with-theband.com", "isa-geek.com", "isa-hockeynut.com", "issmarterthanyou.com", "likes-pie.com", "likescandy.com", "neat-url.com", "saves-the-whales.com", "selfip.com", "sells-for-less.com", "sells-for-u.com", "servebbs.com", "simple-url.com", "space-to-rent.com", "teaches-yoga.com", "writesthisblog.com", "*.digitaloceanspaces.com", "ddnsfree.com", "ddnsgeek.com", "giize.com", "gleeze.com", "kozow.com", "loseyourip.com", "ooguy.com", "theworkpc.com", "mytuleap.com", "tuleap-partners.com", "encoreapi.com", "eu-1.evennode.com", "eu-2.evennode.com", "eu-3.evennode.com", "eu-4.evennode.com", "us-1.evennode.com", "us-2.evennode.com", "us-3.evennode.com", "us-4.evennode.com", "onfabrica.com", "fastly-edge.com", "fastly-terrarium.com", "fastvps-server.com", "mydobiss.com", "firebaseapp.com", "fldrv.com", "forgeblocks.com", "framercanvas.com", "freebox-os.com", "freeboxos.com", "freemyip.com", "aliases121.com", "gentapps.com", "gentlentapis.com", "githubusercontent.com", "*.0emm.com", "appspot.com", "*.r.appspot.com", "codespot.com", "googleapis.com", "googlecode.com", "pagespeedmobilizer.com", "publishproxy.com", "withgoogle.com", "withyoutube.com", "blogspot.com", "grayjayleagues.com", "awsmppl.com", "herokuapp.com", "herokussl.com", "impertrixcdn.com", "impertrix.com", "smushcdn.com", "wphostedmail.com", "wpmucdn.com", "pixolino.com", "amscompute.com", "dopaas.com", "paas.hosted-by-previder.com", "rag-cloud.hosteur.com", "rag-cloud-ch.hosteur.com", "jcloud.ik-server.com", "jcloud-ver-jpc.ik-server.com", "demo.jelastic.com", "kilatiron.com", "paas.massivegrid.com", "jed.wafaicloud.com", "lon.wafaicloud.com", "ryd.wafaicloud.com", "webadorsite.com", "*.cns.joyent.com", "ktistory.com", "lpusercontent.com", "members.linode.com", "*.nodebalancer.linode.com", "*.linodeobjects.com", "ip.linodeusercontent.com", "barsycenter.com", "barsyonline.com", "mazeplay.com", "miniserver.com", "atmeta.com", "apps.fbsbx.com", "meteorapp.com", "eu.meteorapp.com", "hostedpi.com", "customer.mythic-beasts.com", "caracal.mythic-beasts.com", "fentiger.mythic-beasts.com", "lynx.mythic-beasts.com", "ocelot.mythic-beasts.com", "oncilla.mythic-beasts.com", "onza.mythic-beasts.com", "sphinx.mythic-beasts.com", "vs.mythic-beasts.com", "x.mythic-beasts.com", "yali.mythic-beasts.com", "cloud.nospamproxy.com", "4u.com", "nfshost.com", "001www.com", "ddnslive.com", "myiphost.com", "blogsyte.com", "ciscofreak.com", "damnserver.com", "ditchyourip.com", "dnsiskinky.com", "dynns.com", "geekgalaxy.com", "health-carereform.com", "homesecuritymac.com", "homesecuritypc.com", "myactivedirectory.com", "mysecuritycamera.com", "net-freaks.com", "onthewifi.com", "point2this.com", "quicksytes.com", "securitytactics.com", "serveexchange.com", "servehumour.com", "servep2p.com", "servesarcasm.com", "stufftoread.com", "unusualperson.com", "workisboring.com", "3utilities.com", "ddnsking.com", "myvnc.com", "servebeer.com", "servecounterstrike.com", "serveftp.com", "servegame.com", "servehalflife.com", "servehttp.com", "serveirc.com", "servemp3.com", "servepics.com", "servequake.com", "static.observableusercontent.com", "simplesite.com", "orsites.com", "operaunite.com", "authgear-staging.com", "authgearapps.com", "skygearapp.com", "outsystemscloud.com", "ownprovider.com", "pgfog.com", "pagefrontapp.com", "pagexl.com", "*.paywhirl.com", "gotpantheon.com", "upsunapp.com", "platter-app.com", "pleskns.com", "postman-echo.com", "xen.prgmr.com", "pythonanywhere.com", "eu.pythonanywhere.com", "qualifioapp.com", "ladesk.com", "qbuser.com", "qa2.com", "alpha-myqnapcloud.com", "dev-myqnapcloud.com", "mycloudnas.com", "mynascloud.com", "myqnapcloud.com", "*.quipelements.com", "rackmaze.com", "rhcloud.com", "app.render.com", "onrender.com", "180r.com", "dojin.com", "sakuratan.com", "sakuraweb.com", "x0.com", "*.builder.code.com", "*.dev-builder.code.com", "*.stg-builder.code.com", "*.001.test.code-builder-stg.platform.salesforce.com", "logoip.com", "scrysec.com", "firewall-gateway.com", "myshopblocks.com", "myshopify.com", "shopitsite.com", "1kapp.com", "appchizi.com", "applinzi.com", "sinaapp.com", "vipsinaapp.com", "bounty-full.com", "alpha.bounty-full.com", "beta.bounty-full.com", "streamlitapp.com", "try-snowplow.com", "w-corp-staticblitz.com", "w-credentialless-staticblitz.com", "w-staticblitz.com", "stackhero-network.com", "playstation-cloud.com", "myspreadshop.com", "api.stdlib.com", "streak-link.com", "streaklinks.com", "streakusercontent.com", "temp-dns.com", "dsmynas.com", "familyds.com", "mytabit.com", "site.tb-hosting.com", "reservd.com", "thingdustdata.com", "bloxcms.com", "townnews-staging.com", "pro.typeform.com", "hk.com", "it.com", "*.vultrobjects.com", "wafflecell.com", "reserve-online.com", "hotelwithflight.com", "remotewd.com", "pages.wiardweb.com", "messwithdns.com", "woltlab-demo.com", "wpenginepowered.com", "js.wpenginepowered.com", "wixsite.com", "xnbay.com", "u2.xnbay.com", "u2-local.xnbay.com", "yolasite.com", "nog.community", "ravendb.community", "myforum.community", "elementor.cool", "de.cool", "blogspot.cv", "cloudns.cx", "ath.cx", "info.cx", "assessments.cx", "calculators.cx", "funnels.cx", "paynow.cx", "quizzes.cx", "researched.cx", "tests.cx", "blogspot.com.cy", "j.scaleforce.com.cy", "co.cz", "rsc.contentproxy9.cz", "realm.cz", "e4.cz", "blogspot.cz", "*.cloud.metacentrum.cz", "custom.metacentrum.cz", "flt.cloud.muni.cz", "usr.cloud.muni.cz", "bplaced.de", "square7.de", "com.de", "dyn.cosidns.de", "dynamisches-dns.de", "dnsupdater.de", "internet-dns.de", "l-o-g-i-n.de", "dnshome.de", "fuettertdasnetz.de", "isteingeek.de", "istmein.de", "lebtimnetz.de", "leitungsen.de", "traeumtgerade.de", "ddnss.de", "dyn.ddnss.de", "dyndns.ddnss.de", "dyndns1.de", "dyn-ip24.de", "home-webserver.de", "dyn.home-webserver.de", "myhome-server.de", "*.frusky.de", "goip.de", "blogspot.de", "günstigbestellen.de", "günstigliefern.de", "pages.it.hs-heilbronn.de", "dyn-berlin.de", "in-berlin.de", "in-brb.de", "in-butter.de", "in-dsl.de", "in-vpn.de", "iservschule.de", "mein-iserv.de", "schulplattform.de", "schulserver.de", "test-iserv.de", "keymachine.de", "git-repos.de", "lcube-server.de", "svn-repos.de", "barsy.de", "123webseite.de", "logoip.de", "firewall-gateway.de", "my-gateway.de", "my-router.de", "spdns.de", "customer.speedpartner.de", "myspreadshop.de", "taifun-dns.de", "12hp.de", "2ix.de", "4lima.de", "lima-city.de", "dd-dns.de", "dray-dns.de", "draydns.de", "dyn-vpn.de", "dynvpn.de", "mein-vigor.de", "my-vigor.de", "my-wan.de", "syno-ds.de", "synology-diskstation.de", "synology-ds.de", "*.uberspace.de", "virtualuser.de", "virtual-user.de", "community-pro.de", "diskussionsbereich.de", "graphic.design", "bss.design", "12chars.dev", "panel.dev", "autocode.dev", "*.lcl.dev", "*.lclstage.dev", "*.stg.dev", "*.stgstage.dev", "pages.dev", "r2.dev", "workers.dev", "curv.dev", "deno.dev", "deno-staging.dev", "deta.dev", "fly.dev", "githubpreview.dev", "*.gateway.dev", "is-a.dev", "iserv.dev", "runcontainers.dev", "*.user.localcert.dev", "loginline.dev", "mediatech.dev", "modx.dev", "ngrok.dev", "ngrok-free.dev", "is-cool.dev", "is-not-a.dev", "localplayer.dev", "xmit.dev", "platter-app.dev", "replit.dev", "archer.replit.dev", "bones.replit.dev", "canary.replit.dev", "global.replit.dev", "hacker.replit.dev", "id.replit.dev", "janeway.replit.dev", "kim.replit.dev", "kira.replit.dev", "kirk.replit.dev", "odo.replit.dev", "paris.replit.dev", "picard.replit.dev", "pike.replit.dev", "prerelease.replit.dev", "reed.replit.dev", "riker.replit.dev", "sisko.replit.dev", "spock.replit.dev", "staging.replit.dev", "sulu.replit.dev", "tarpit.replit.dev", "teams.replit.dev", "tucker.replit.dev", "wesley.replit.dev", "worf.replit.dev", "shiftcrypto.dev", "vercel.dev", "*.webhare.dev", "cloudapps.digital", "london.cloudapps.digital", "biz.dk", "co.dk", "firm.dk", "reg.dk", "store.dk", "blogspot.dk", "123hjemmeside.dk", "myspreadshop.dk", "*.dapps.earth", "*.bzz.dapps.earth", "base.ec", "official.ec", "git-pages.rit.edu", "co.education", "blogspot.com.ee", "blogspot.com.eg", "on.crisp.email", "blogspot.com.es", "123miweb.es", "myspreadshop.es", "*.compute.estate", "airkitapps.eu", "mycd.eu", "cloudns.eu", "jelastic.dogado.eu", "barsy.eu", "wellbeingzone.eu", "spdns.eu", "*.transurl.eu", "diskstation.eu", "user.party.eus", "koobin.events", "co.events", "ybo.faith", "storj.farm", "dy.fi", "blogspot.fi", "häkkinen.fi", "iki.fi", "fi.cloudplatform.fi", "demo.datacenter.fi", "paas.datacenter.fi", "kapsi.fi", "123kotisivu.fi", "myspreadshop.fi", "co.financial", "radio.fm", "*.user.fm", "en-root.fr", "fbx-os.fr", "fbxos.fr", "freebox-os.fr", "freeboxos.fr", "blogspot.fr", "goupile.fr", "123siteweb.fr", "on-web.fr", "chirurgiens-dentistes-en-france.fr", "dedibox.fr", "aeroport.fr", "avocat.fr", "chambagri.fr", "chirurgiens-dentistes.fr", "experts-comptables.fr", "medecin.fr", "notaires.fr", "pharmacien.fr", "port.fr", "veterinaire.fr", "myspreadshop.fr", "ynh.fr", "pley.games", "sheezy.games", "pages.gay", "cnpy.gdn", "kaas.gg", "cya.gg", "stackit.gg", "panel.gg", "daemon.panel.gg", "biz.gl", "cloud.goog", "translate.goog", "*.usercontent.goog", "blogspot.gr", "simplesite.gr", "discourse.group", "hra.health", "blogspot.hk", "secaas.hk", "ltd.hk", "inc.hk", "cloudaccess.host", "freesite.host", "easypanel.host", "fastvps.host", "myfast.host", "tempurl.host", "wpmudev.host", "jele.host", "mircloud.host", "pcloud.host", "half.host", "opencraft.hosting", "shop.brendly.hr", "blogspot.hr", "free.hr", "rt.ht", "blogspot.hu", "*.rss.my.id", "flap.id", "blogspot.co.id", "forte.id", "blogspot.ie", "myspreadshop.ie", "ravpage.co.il", "blogspot.co.il", "tabitorder.co.il", "mytabit.co.il", "ro.im", "web.in", "cloudns.in", "cyclic.co.in", "blogspot.in", "barsy.in", "supabase.in", "cloudns.info", "dynamic-dns.info", "dyndns.info", "barrel-of-knowledge.info", "barrell-of-knowledge.info", "for-our.info", "groks-the.info", "groks-this.info", "here-for-more.info", "knowsitall.info", "selfip.info", "webhop.info", "barsy.info", "mayfirst.info", "forumz.info", "nsupdate.info", "dvrcam.info", "ilovecollege.info", "no-ip.info", "dnsupdate.info", "v-info.info", "*.on-acorn.io", "apigee.io", "b-data.io", "backplaneapp.io", "app.banzaicloud.io", "*.backyards.banzaicloud.io", "beagleboard.io", "bitbucket.io", "bluebite.io", "boxfuse.io", "*.s.brave.io", "browsersafetymark.io", "uk0.bigv.io", "cleverapps.io", "dyndns.dappnode.io", "darklang.io", "dedyn.io", "drud.io", "definima.io", "fh-muenster.io", "shw.io", "id.forgerock.io", "github.io", "gitlab.io", "lolipop.io", "hasura-app.io", "hostyhosting.io", "*.moonscale.io", "paas.beebyte.io", "sekd1.beebyteapp.io", "jele.io", "cloud-fr1.unispace.io", "webthings.io", "loginline.io", "barsy.io", "*.azurecontainer.io", "ngrok.io", "ap.ngrok.io", "au.ngrok.io", "eu.ngrok.io", "in.ngrok.io", "jp.ngrok.io", "sa.ngrok.io", "us.ngrok.io", "stage.nodeart.io", "nid.io", "pantheonsite.io", "dyn53.io", "pstmn.io", "mock.pstmn.io", "protonet.io", "qoto.io", "qcx.io", "*.sys.qcx.io", "vaporcloud.io", "g.vbrplsbx.io", "*.on-k3s.io", "*.on-rio.io", "readthedocs.io", "resindevice.io", "devices.resinstaging.io", "hzc.io", "sandcats.io", "client.scrypted.io", "shiftcrypto.io", "shiftedit.io", "mo-siemens.io", "musician.io", "apps.lair.io", "*.stolos.io", "spacekit.io", "utwente.io", "*.s5y.io", "edugit.io", "telebit.io", "cust.dev.thingdust.io", "cust.disrec.thingdust.io", "cust.prod.thingdust.io", "cust.testing.thingdust.io", "reservd.dev.thingdust.io", "reservd.disrec.thingdust.io", "reservd.testing.thingdust.io", "tickets.io", "upli.io", "2038.io", "webflow.io", "webflowtest.io", "wedeploy.io", "editorx.io", "wixstudio.io", "basicserver.io", "virtualserver.io", "cupcake.is", "blogspot.is", "12chars.it", "blogspot.it", "ibxos.it", "iliadboxos.it", "jc.neen.it", "cloud.jelastic.open.tim.it", "16-b.it", "32-b.it", "64-b.it", "123homepage.it", "myspreadshop.it", "syncloud.it", "of.je", "user.aseinet.ne.jp", "buyshop.jp", "fashionstore.jp", "handcrafted.jp", "kawaiishop.jp", "supersale.jp", "theshop.jp", "0am.jp", "0g0.jp", "0j0.jp", "0t0.jp", "mydns.jp", "pgw.jp", "wjg.jp", "gehirn.ne.jp", "usercontent.jp", "angry.jp", "babyblue.jp", "babymilk.jp", "backdrop.jp", "bambina.jp", "bitter.jp", "blush.jp", "boo.jp", "boy.jp", "boyfriend.jp", "but.jp", "candypop.jp", "capoo.jp", "catfood.jp", "cheap.jp", "chicappa.jp", "chillout.jp", "chips.jp", "chowder.jp", "chu.jp", "ciao.jp", "cocotte.jp", "coolblog.jp", "cranky.jp", "cutegirl.jp", "daa.jp", "deca.jp", "deci.jp", "digick.jp", "egoism.jp", "fakefur.jp", "fem.jp", "flier.jp", "floppy.jp", "fool.jp", "frenchkiss.jp", "girlfriend.jp", "girly.jp", "gloomy.jp", "gonna.jp", "greater.jp", "hacca.jp", "heavy.jp", "her.jp", "hiho.jp", "hippy.jp", "holy.jp", "hungry.jp", "icurus.jp", "itigo.jp", "jellybean.jp", "kikirara.jp", "kill.jp", "kilo.jp", "kuron.jp", "littlestar.jp", "lolipopmc.jp", "lolitapunk.jp", "lomo.jp", "lovepop.jp", "lovesick.jp", "main.jp", "mods.jp", "mond.jp", "mongolian.jp", "moo.jp", "namaste.jp", "nikita.jp", "nobushi.jp", "noor.jp", "oops.jp", "parallel.jp", "parasite.jp", "pecori.jp", "peewee.jp", "penne.jp", "pepper.jp", "perma.jp", "pigboat.jp", "pinoko.jp", "punyu.jp", "pupu.jp", "pussycat.jp", "pya.jp", "raindrop.jp", "readymade.jp", "sadist.jp", "schoolbus.jp", "secret.jp", "staba.jp", "stripper.jp", "sub.jp", "sunnyday.jp", "thick.jp", "tonkotsu.jp", "under.jp", "upper.jp", "velvet.jp", "verse.jp", "versus.jp", "vivian.jp", "watson.jp", "weblike.jp", "whitesnow.jp", "zombie.jp", "blogspot.jp", "2-d.jp", "bona.jp", "crap.jp", "daynight.jp", "eek.jp", "flop.jp", "halfmoon.jp", "jeez.jp", "matrix.jp", "mimoza.jp", "ivory.ne.jp", "mail-box.ne.jp", "mints.ne.jp", "mokuren.ne.jp", "opal.ne.jp", "sakura.ne.jp", "sumomo.ne.jp", "topaz.ne.jp", "netgamers.jp", "nyanta.jp", "o0o0.jp", "rdy.jp", "rgr.jp", "rulez.jp", "s3.isk01.sakurastorage.jp", "s3.isk02.sakurastorage.jp", "saloon.jp", "sblo.jp", "skr.jp", "tank.jp", "uh-oh.jp", "undo.jp", "rs.webaccel.jp", "user.webaccel.jp", "websozai.jp", "xii.jp", "blogspot.co.ke", "us.kg", "blogspot.kr", "co.krd", "edu.krd", "jcloud.kz", "upaas.kazteleport.kz", "bnr.la", "c.la", "static.land", "dev.static.land", "sites.static.land", "oy.lc", "blogspot.li", "caa.li", "myfritz.link", "cyon.link", "ipfs.nftstorage.link", "mypep.link", "*.dweb.link", "aem.live", "hlx.live", "*.ewp.live", "omg.lol", "blogspot.lt", "blogspot.lu", "123website.lu", "router.management", "blogspot.md", "ir.md", "c66.me", "daplie.me", "localhost.daplie.me", "edgestack.me", "filegear.me", "filegear-au.me", "filegear-de.me", "filegear-gb.me", "filegear-ie.me", "filegear-jp.me", "filegear-sg.me", "glitch.me", "lohmus.me", "barsy.me", "mcpe.me", "mcdir.me", "soundcast.me", "tcp4.me", "brasilia.me", "ddns.me", "dnsfor.me", "hopto.me", "loginto.me", "noip.me", "webhop.me", "vp4.me", "diskstation.me", "dscloud.me", "i234.me", "myds.me", "synology.me", "site.transip.me", "wedeploy.me", "yombo.me", "nohost.me", "framer.media", "barsy.menu", "blogspot.mk", "nyc.mn", "barsy.mobi", "dscloud.mobi", "ju.mp", "blogspot.mr", "lab.ms", "minisite.ms", "blogspot.com.mt", "blogspot.mx", "blogspot.my", "forgot.her.name", "forgot.his.name", "adobeaemcloud.net", "adobeio-static.net", "adobeioruntime.net", "akadns.net", "akamai.net", "akamai-staging.net", "akamaiedge.net", "akamaiedge-staging.net", "akamaihd.net", "akamaihd-staging.net", "akamaiorigin.net", "akamaiorigin-staging.net", "akamaized.net", "akamaized-staging.net", "edgekey.net", "edgekey-staging.net", "edgesuite.net", "edgesuite-staging.net", "alwaysdata.net", "myamaze.net", "cloudfront.net", "t3l3p0rt.net", "appudo.net", "cdn.prod.atlassian-dev.net", "myfritz.net", "onavstack.net", "shopselect.net", "blackbaudcdn.net", "boomla.net", "bplaced.net", "square7.net", "gb.net", "hu.net", "jp.net", "se.net", "uk.net", "in.net", "clickrising.net", "cloudaccess.net", "cdn77-ssl.net", "r.cdn77.net", "dns-cloud.net", "dns-dynamic.net", "feste-ip.net", "knx-server.net", "static-access.net", "*.cryptonomic.net", "dattolocal.net", "mydatto.net", "debian.net", "bitbridge.net", "at-band-camp.net", "blogdns.net", "broke-it.net", "buyshouses.net", "dnsalias.net", "dnsdojo.net", "does-it.net", "dontexist.net", "dynalias.net", "dynathome.net", "endofinternet.net", "from-az.net", "from-co.net", "from-la.net", "from-ny.net", "gets-it.net", "ham-radio-op.net", "homeftp.net", "homeip.net", "homelinux.net", "homeunix.net", "in-the-band.net", "is-a-chef.net", "is-a-geek.net", "isa-geek.net", "kicks-ass.net", "office-on-the.net", "podzone.net", "scrapper-site.net", "selfip.net", "sells-it.net", "servebbs.net", "serveftp.net", "thruhere.net", "webhop.net", "definima.net", "casacam.net", "dynu.net", "dynv6.net", "twmail.net", "ru.net", "channelsdvr.net", "u.channelsdvr.net", "fastlylb.net", "map.fastlylb.net", "freetls.fastly.net", "map.fastly.net", "a.prod.fastly.net", "global.prod.fastly.net", "a.ssl.fastly.net", "b.ssl.fastly.net", "global.ssl.fastly.net", "edgeapp.net", "flynnhosting.net", "keyword-on.net", "live-on.net", "server-on.net", "cdn-edges.net", "localcert.net", "localhostcert.net", "heteml.net", "cloudfunctions.net", "moonscale.net", "in-dsl.net", "in-vpn.net", "ipifony.net", "iobb.net", "cloudjiffy.net", "fra1-de.cloudjiffy.net", "west1-us.cloudjiffy.net", "jls-sto1.elastx.net", "jls-sto2.elastx.net", "jls-sto3.elastx.net", "faststacks.net", "fr-1.paas.massivegrid.net", "lon-1.paas.massivegrid.net", "lon-2.paas.massivegrid.net", "ny-1.paas.massivegrid.net", "ny-2.paas.massivegrid.net", "sg-1.paas.massivegrid.net", "jelastic.saveincloud.net", "nordeste-idc.saveincloud.net", "j.scaleforce.net", "jelastic.tsukaeru.net", "kinghost.net", "uni5.net", "krellian.net", "barsy.net", "memset.net", "azure-api.net", "azureedge.net", "azurefd.net", "azurewebsites.net", "azure-mobile.net", "azurestaticapps.net", "1.azurestaticapps.net", "2.azurestaticapps.net", "3.azurestaticapps.net", "4.azurestaticapps.net", "5.azurestaticapps.net", "6.azurestaticapps.net", "7.azurestaticapps.net", "centralus.azurestaticapps.net", "eastasia.azurestaticapps.net", "eastus2.azurestaticapps.net", "westeurope.azurestaticapps.net", "westus2.azurestaticapps.net", "cloudapp.net", "trafficmanager.net", "blob.core.windows.net", "servicebus.windows.net", "dnsup.net", "hicam.net", "now-dns.net", "ownip.net", "vpndns.net", "eating-organic.net", "mydissent.net", "myeffect.net", "mymediapc.net", "mypsx.net", "mysecuritycamera.net", "nhlfan.net", "no-ip.net", "pgafan.net", "privatizehealthinsurance.net", "bounceme.net", "ddns.net", "redirectme.net", "serveblog.net", "serveminecraft.net", "sytes.net", "cloudycluster.net", "*.webpaas.ovh.net", "*.hosting.ovh.net", "myradweb.net", "rackmaze.net", "squares.net", "schokokeks.net", "firewall-gateway.net", "seidat.net", "senseering.net", "siteleaf.net", "vps-host.net", "atl.jelastic.vps-host.net", "njs.jelastic.vps-host.net", "ric.jelastic.vps-host.net", "myspreadshop.net", "soc.srcf.net", "user.srcf.net", "supabase.net", "dsmynas.net", "familyds.net", "beta.tailscale.net", "ts.net", "*.c.ts.net", "torproject.net", "pages.torproject.net", "reserve-online.net", "community-pro.net", "meinforum.net", "yandexcloud.net", "storage.yandexcloud.net", "website.yandexcloud.net", "za.net", "*.alces.network", "co.network", "arvo.network", "azimuth.network", "tlon.network", "noticeable.news", "blogspot.com.ng", "col.ng", "firm.ng", "gen.ng", "ltd.ng", "ngo.ng", "co.nl", "hosting-cluster.nl", "blogspot.nl", "gov.nl", "khplay.nl", "123website.nl", "myspreadshop.nl", "*.transurl.nl", "cistron.nl", "demon.nl", "co.no", "blogspot.no", "123hjemmeside.no", "myspreadshop.no", "merseine.nu", "mine.nu", "shacknet.nu", "enterprisecloud.nu", "cloudns.nz", "blogspot.co.nz", "onred.one", "staging.onred.one", "*.kin.one", "service.one", "homelink.one", "eero.online", "eero-stage.online", "barsy.online", "tech.orange", "altervista.org", "tele.amune.org", "pimienta.org", "poivron.org", "potager.org", "sweetpepper.org", "ae.org", "us.org", "certmgr.org", "ssl.origin.cdn77-secure.org", "c.cdn77.org", "rsc.cdn77.org", "cloudns.org", "duckdns.org", "tunk.org", "dyndns.org", "blogdns.org", "blogsite.org", "boldlygoingnowhere.org", "dnsalias.org", "dnsdojo.org", "doesntexist.org", "dontexist.org", "doomdns.org", "dvrdns.org", "dynalias.org", "endofinternet.org", "endoftheinternet.org", "from-me.org", "game-host.org", "go.dyndns.org", "gotdns.org", "hobby-site.org", "home.dyndns.org", "homedns.org", "homeftp.org", "homelinux.org", "homeunix.org", "is-a-bruinsfan.org", "is-a-candidate.org", "is-a-celticsfan.org", "is-a-chef.org", "is-a-geek.org", "is-a-knight.org", "is-a-linux-user.org", "is-a-patsfan.org", "is-a-soxfan.org", "is-found.org", "is-lost.org", "is-saved.org", "is-very-bad.org", "is-very-evil.org", "is-very-good.org", "is-very-nice.org", "is-very-sweet.org", "isa-geek.org", "kicks-ass.org", "misconfused.org", "podzone.org", "readmyblog.org", "selfip.org", "sellsyourhome.org", "servebbs.org", "serveftp.org", "servegame.org", "stuff-4-sale.org", "webhop.org", "ddnss.org", "accesscam.org", "camdvr.org", "freeddns.org", "mywire.org", "webredirect.org", "eu.org", "al.eu.org", "asso.eu.org", "at.eu.org", "au.eu.org", "be.eu.org", "bg.eu.org", "ca.eu.org", "cd.eu.org", "ch.eu.org", "cn.eu.org", "cy.eu.org", "cz.eu.org", "de.eu.org", "dk.eu.org", "edu.eu.org", "ee.eu.org", "es.eu.org", "fi.eu.org", "fr.eu.org", "gr.eu.org", "hr.eu.org", "hu.eu.org", "ie.eu.org", "il.eu.org", "in.eu.org", "int.eu.org", "is.eu.org", "it.eu.org", "jp.eu.org", "kr.eu.org", "lt.eu.org", "lu.eu.org", "lv.eu.org", "mc.eu.org", "me.eu.org", "mk.eu.org", "mt.eu.org", "my.eu.org", "net.eu.org", "ng.eu.org", "nl.eu.org", "no.eu.org", "nz.eu.org", "paris.eu.org", "pl.eu.org", "pt.eu.org", "q-a.eu.org", "ro.eu.org", "ru.eu.org", "se.eu.org", "si.eu.org", "sk.eu.org", "tr.eu.org", "uk.eu.org", "us.eu.org", "twmail.org", "fedorainfracloud.org", "fedorapeople.org", "cloud.fedoraproject.org", "app.os.fedoraproject.org", "app.os.stg.fedoraproject.org", "freedesktop.org", "hepforge.org", "in-dsl.org", "in-vpn.org", "js.org", "barsy.org", "mayfirst.org", "mozilla-iot.org", "bmoattachments.org", "dynserv.org", "now-dns.org", "cable-modem.org", "collegefan.org", "couchpotatofries.org", "mlbfan.org", "mysecuritycamera.org", "nflfan.org", "read-books.org", "ufcfan.org", "hopto.org", "myftp.org", "no-ip.org", "zapto.org", "is-local.org", "httpbin.org", "pubtls.org", "jpn.org", "my-firewall.org", "myfirewall.org", "spdns.org", "small-web.org", "dsmynas.org", "familyds.org", "s3.teckids.org", "tuxfamily.org", "diskstation.org", "hk.org", "wmflabs.org", "toolforge.org", "wmcloud.org", "za.org", "nerdpol.ovh", "aem.page", "hlx.page", "hlx3.page", "translated.page", "codeberg.page", "prvcy.page", "pdns.page", "plesk.page", "rocky.page", "magnet.page", "ybo.party", "blogspot.pe", "cloudns.ph", "framer.photos", "1337.pictures", "ngrok.pizza", "beep.pl", "ecommerce-shop.pl", "bielsko.pl", "shoparena.pl", "homesklep.pl", "sdscloud.pl", "unicloud.pl", "krasnik.pl", "leczna.pl", "lubartow.pl", "lublin.pl", "poniatowa.pl", "swidnik.pl", "co.pl", "torun.pl", "simplesite.pl", "art.pl", "gliwice.pl", "krakow.pl", "poznan.pl", "wroc.pl", "zakopane.pl", "myspreadshop.pl", "gda.pl", "gdansk.pl", "gdynia.pl", "med.pl", "sopot.pl", "co.place", "own.pm", "name.pm", "12chars.pro", "cloudns.pro", "bci.dnstrace.pro", "barsy.pro", "ngrok.pro", "blogspot.pt", "123paginaweb.pt", "*.id.pub", "*.kin.pub", "barsy.pub", "cloudns.pw", "x443.pw", "blogspot.qa", "blogspot.re", "can.re", "ybo.review", "clan.rip", "co.ro", "shop.ro", "blogspot.ro", "barsy.ro", "myddns.rocks", "stackit.rocks", "lima-city.rocks", "webspace.rocks", "shop.brendly.rs", "blogspot.rs", "ua.rs", "ox.rs", "ac.ru", "edu.ru", "gov.ru", "int.ru", "mil.ru", "test.ru", "eurodir.ru", "adygeya.ru", "bashkiria.ru", "bir.ru", "cbg.ru", "com.ru", "dagestan.ru", "grozny.ru", "kalmykia.ru", "kustanai.ru", "marine.ru", "mordovia.ru", "msk.ru", "mytis.ru", "nalchik.ru", "nov.ru", "pyatigorsk.ru", "spb.ru", "vladikavkaz.ru", "vladimir.ru", "blogspot.ru", "na4u.ru", "mircloud.ru", "jelastic.regruhosting.ru", "myjino.ru", "*.hosting.myjino.ru", "*.landing.myjino.ru", "*.spectrum.myjino.ru", "*.vps.myjino.ru", "hb.cldmail.ru", "mcdir.ru", "mcpre.ru", "vps.mcdir.ru", "net.ru", "org.ru", "pp.ru", "lk3.ru", "ras.ru", "hs.run", "development.run", "ravendb.run", "servers.run", "*.build.run", "*.code.run", "*.database.run", "*.migration.run", "onporter.run", "repl.run", "stackit.run", "wix.run", "ybo.science", "edu.scot", "gov.scot", "service.gov.scot", "com.se", "blogspot.se", "conf.se", "iopsys.se", "123minsida.se", "itcouldbewor.se", "myspreadshop.se", "su.paba.se", "loginline.services", "blogspot.sg", "enscaled.sg", "bip.sh", "hashbang.sh", "ent.platform.sh", "eu.platform.sh", "us.platform.sh", "now.sh", "wedeploy.sh", "base.shop", "hoplix.shop", "barsy.shop", "f5.si", "gitapp.si", "gitpage.si", "blogspot.si", "*.my.canva.site", "*.cloudera.site", "convex.site", "cyon.site", "fnwk.site", "folionetwork.site", "fastvps.site", "jele.site", "jouwweb.site", "lelux.site", "loginline.site", "barsy.site", "mintere.site", "omniwe.site", "opensocial.site", "*.platformsh.site", "*.tst.site", "byen.site", "srht.site", "novecore.site", "blogspot.sk", "blogspot.sn", "sch.so", "surveys.so", "*.diher.solutions", "myfast.space", "uber.space", "xs4all.space", "helioho.st", "kirara.st", "noho.st", "sellfy.store", "shopware.store", "storebase.store", "abkhazia.su", "adygeya.su", "aktyubinsk.su", "arkhangelsk.su", "armenia.su", "ashgabad.su", "azerbaijan.su", "balashov.su", "bashkiria.su", "bryansk.su", "bukhara.su", "chimkent.su", "dagestan.su", "east-kazakhstan.su", "exnet.su", "georgia.su", "grozny.su", "ivanovo.su", "jambyl.su", "kalmykia.su", "kaluga.su", "karacol.su", "karaganda.su", "karelia.su", "khakassia.su", "krasnodar.su", "kurgan.su", "kustanai.su", "lenug.su", "mangyshlak.su", "mordovia.su", "msk.su", "murmansk.su", "nalchik.su", "navoi.su", "north-kazakhstan.su", "nov.su", "obninsk.su", "penza.su", "pokrovsk.su", "sochi.su", "spb.su", "tashkent.su", "termez.su", "togliatti.su", "troitsk.su", "tselinograd.su", "tula.su", "tuva.su", "vladikavkaz.su", "vladimir.su", "vologda.su", "barsy.support", "knightpoint.systems", "blogspot.td", "discourse.team", "jelastic.team", "co.technology", "sch.tf", "online.th", "shop.th", "orangecloud.tn", "611.to", "oya.to", "x0.to", "vpnplus.to", "direct.quickconnect.to", "prequalifyme.today", "now-dns.top", "ntdll.top", "*.wadl.top", "blogspot.com.tr", "ybo.trade", "dyndns.tv", "better-than.tv", "on-the-web.tv", "worse-than.tv", "from.tv", "sakura.tv", "mymailer.com.tw", "url.tw", "mydns.tw", "blogspot.tw", "cc.ua", "inf.ua", "ltd.ua", "cx.ua", "ie.ua", "biz.ua", "co.ua", "pp.ua", "v.ua", "blogspot.ug", "dh.bytemark.co.uk", "vm.bytemark.co.uk", "conn.uk", "copro.uk", "hosp.uk", "independent-commission.uk", "independent-inquest.uk", "independent-inquiry.uk", "independent-panel.uk", "independent-review.uk", "public-inquiry.uk", "royal-commission.uk", "campaign.gov.uk", "service.gov.uk", "api.gov.uk", "pymnt.uk", "blogspot.co.uk", "j.layershift.co.uk", "glug.org.uk", "lug.org.uk", "lugs.org.uk", "barsy.co.uk", "barsyonline.co.uk", "barsy.uk", "cust.retrosnub.co.uk", "nh-serv.co.uk", "nimsite.uk", "no-ip.co.uk", "wellbeingzone.co.uk", "adimo.co.uk", "myspreadshop.co.uk", "affinitylottery.org.uk", "raffleentry.org.uk", "weeklylottery.org.uk", "graphox.us", "cloudns.us", "drud.us", "is-by.us", "land-4-sale.us", "stuff-4-sale.us", "heliohost.us", "phx.enscaled.us", "mircloud.us", "ngo.us", "freeddns.us", "golffan.us", "noip.us", "pointto.us", "srv.us", "gh.srv.us", "gl.srv.us", "platterp.us", "servername.us", "lib.de.us", "blogspot.com.uy", "gv.vc", "d.gv.vc", "0e.vc", "mydns.vc", "blogspot.vn", "aaa.vodka", "cn.vu", "framer.website", "biz.wf", "sch.wf", "framer.wiki", "corpnet.work", "*.advisor.ws", "cloud66.ws", "dyndns.ws", "mypets.ws", "blogsite.xyz", "localzone.xyz", "crafting.xyz", "zapto.xyz", "*.telebit.xyz", "org.yt", "blogspot.co.za", "cloud66.zone", "hs.zone", "*.triton.zone", "stackit.zone", "lima.zone", "биз.рус", "ком.рус", "крым.рус", "мир.рус", "мск.рус", "орг.рус", "самара.рус", "сочи.рус", "спб.рус", "я.рус"]};

globalThis.MCG.TERMS = {
"en":{"secret":["password","passcode","otp","verification code","recovery code","backup code","one-time code"],"submit":["enter","submit","send","reply with","provide","type","upload"],"action":["verify","confirm","recover","restore","resolve","review","appeal","view case","sign in","log in","reset","unlock"],"account":["account","security alert","security issue","subpoena","legal request","case materials","access suspended"],"negation":["do not","don't","never","must not","not ask","won't ask","will not ask"],"share":["shared a document","shared a file","view the document","view this document"]},
"ja":{"secret":["パスワード","認証コード","確認コード","復旧コード","バックアップコード","ワンタイムコード","暗証番号"],"submit":["入力","送信","返信","提出","記入","教えて","アップロード"],"action":["確認","復旧","復元","解決","対応","異議","ログイン","再設定","解除","審査","資料を確認"],"account":["アカウント","セキュリティ警告","セキュリティの問題","召喚状","法的手続","法的措置","ケース資料"],"negation":["入力しない","入力しないで","送信しない","返信しない","教えない","求めません","要求しません","入力しないよう","送信しないで","入力してはいけません"],"share":["ドキュメントを共有","ファイルを共有","資料を閲覧","ドキュメントを閲覧"]},
"zh_CN":{"secret":["密码","验证码","恢复代码","备用代码","一次性代码","口令"],"submit":["输入","提交","发送","回复","提供","填写","上传"],"action":["验证","确认","恢复","解决","处理","申诉","登录","重置","解锁","查看案件"],"account":["账户","帐号","账号","安全警报","安全问题","传票","法律请求","案件材料"],"negation":["不要","切勿","不会要求","从不要求","请勿","不应"],"share":["共享文档","共享文件","查看文档"]},
"es":{"secret":["contraseña","código de verificación","código de recuperación","código de un solo uso","otp"],"submit":["introduce","introduzca","ingresa","ingrese","envía","envíe","envie","envia","escribe","proporciona","responde con"],"action":["verifica","verifique","confirma","confirme","recupera","recupere","restaura","resuelve","revisa","inicia sesión","restablece","desbloquea"],"account":["cuenta","alerta de seguridad","problema de seguridad","citación","solicitud legal"],"negation":["no introduzcas","no ingreses","no envíes","nunca","no te pediremos","no solicitamos"],"share":["documento compartido","archivo compartido","ver el documento"]},
"ar":{"secret":["كلمة المرور","رمز التحقق","رمز الاسترداد","رمز احتياطي","رمز لمرة واحدة"],"submit":["أدخل","ادخل","أرسل","ارسل","قدّم","قدم","اكتب","املأ","قم بإدخال"],"action":["تحقق","تأكيد","استرداد","استعادة","حل","مراجعة","تسجيل الدخول","إعادة تعيين","عرض القضية"],"account":["حساب","حسابك","الحساب","تنبيه أمني","مشكلة أمنية","استدعاء","طلب قانوني"],"negation":["لا تدخل","لا ترسل","لن نطلب","لا نطلب","لا تشارك","إياك"],"share":["مستند مشترك","ملف مشترك","عرض المستند"]},
"pt_BR":{"secret":["senha","código de verificação","código de recuperação","código de uso único","otp"],"submit":["digite","insira","envie","informe","forneça","responda com","preencha"],"action":["verifique","confirme","recupere","restaure","resolva","revise","entre","redefina","desbloqueie"],"account":["conta","alerta de segurança","problema de segurança","intimação","solicitação legal"],"negation":["não digite","não insira","não envie","nunca","não pedimos","não solicitamos"],"share":["documento compartilhado","arquivo compartilhado","ver o documento"]},
"fr":{"secret":["mot de passe","code de vérification","code de récupération","code de secours","code à usage unique","otp"],"submit":["saisissez","entrez","envoyez","fournissez","indiquez","répondez avec","remplissez"],"action":["vérifiez","confirmez","récupérez","restaurez","résolvez","consultez","connectez-vous","réinitialisez","débloquez"],"account":["compte","alerte de sécurité","problème de sécurité","assignation","demande légale"],"negation":["ne saisissez pas","n'entrez pas","n’envoyez pas","n'envoyez pas","jamais","ne demandons pas"],"share":["document partagé","fichier partagé","consulter le document"]},
"ru":{"secret":["пароль","код подтверждения","код восстановления","резервный код","одноразовый код"],"submit":["введите","отправьте","пришлите","укажите","впишите","сообщите"],"action":["подтвердите","проверьте","восстановите","решите","войдите","сбросьте","разблокируйте","ознакомьтесь"],"account":["аккаунт","аккаунта","аккаунте","учётная запись","учетная запись","учётной записи","учетной записи","безопасности","повестка","судебный запрос"],"negation":["не вводите","не отправляйте","никогда","не сообщайте","не просим"],"share":["общий документ","общий файл","просмотр документа"]},
"de":{"secret":["passwort","bestätigungscode","wiederherstellungscode","sicherungscode","einmalcode","otp"],"submit":["geben sie","gib","senden sie","sende","tragen sie","teile","übermitteln sie"],"action":["bestätigen sie","bestätige","überprüfen sie","prüfen sie","stellen sie","wiederherstellen","anmelden","entsperren","zurücksetzen","lösen sie"],"account":["konto","kontos","sicherheitswarnung","sicherheitsproblem","vorladung","rechtliche anfrage"],"negation":["niemals","nicht eingeben","nicht senden","geben sie niemals","fordern nicht","fragen nicht"],"share":["geteiltes dokument","freigegebene datei","dokument ansehen"]},
"id":{"secret":["kata sandi","sandi","kode verifikasi","kode pemulihan","kode cadangan","kode sekali pakai","otp"],"submit":["masukkan","kirim","kirimkan","berikan","balas dengan","isi","unggah"],"action":["verifikasi","konfirmasi","pulihkan","selesaikan","tinjau","masuk","atur ulang","buka blokir"],"account":["akun","peringatan keamanan","masalah keamanan","panggilan pengadilan","permintaan hukum"],"negation":["jangan","tidak pernah","tidak meminta","tidak akan meminta"],"share":["dokumen bersama","file bersama","lihat dokumen"]},
"ko":{
  "secret": [
    "비밀번호",
    "비밀번호를",
    "비밀번호는",
    "비밀번호와",
    "패스워드",
    "패스워드를",
    "패스워드는",
    "패스워드와",
    "암호",
    "암호를",
    "암호는",
    "암호와",
    "인증 코드",
    "인증 코드를",
    "인증 코드는",
    "인증 코드와",
    "인증코드",
    "인증코드를",
    "인증코드는",
    "인증코드와",
    "확인 코드",
    "확인 코드를",
    "확인 코드는",
    "확인 코드와",
    "확인코드",
    "확인코드를",
    "확인코드는",
    "확인코드와",
    "복구 코드",
    "복구 코드를",
    "복구 코드는",
    "복구 코드와",
    "복구코드",
    "복구코드를",
    "복구코드는",
    "복구코드와",
    "백업 코드",
    "백업 코드를",
    "백업 코드는",
    "백업 코드와",
    "백업코드",
    "백업코드를",
    "백업코드는",
    "백업코드와",
    "일회용 코드",
    "일회용 코드를",
    "일회용 코드는",
    "일회용 코드와",
    "일회용코드",
    "일회용코드를",
    "일회용코드는",
    "일회용코드와",
    "일회용 비밀번호",
    "일회용 비밀번호를",
    "일회용 비밀번호는",
    "일회용 비밀번호와",
    "일회용 암호",
    "일회용 암호를",
    "일회용 암호는",
    "일회용 암호와",
    "인증번호",
    "인증번호를",
    "인증번호는",
    "인증번호와",
    "인증 번호",
    "인증 번호를",
    "인증 번호는",
    "인증 번호와",
    "보안 코드",
    "보안 코드를",
    "보안 코드는",
    "보안 코드와",
    "보안코드",
    "보안코드를",
    "보안코드는",
    "보안코드와",
    "OTP",
    "OTP를",
    "OTP는",
    "OTP와"
  ],
  "submit": [
    "입력하세요",
    "입력하십시오",
    "입력해 주세요",
    "입력해주세요",
    "입력해 주십시오",
    "입력하시기 바랍니다",
    "입력해야 합니다",
    "입력해 주셔야 합니다",
    "입력 부탁드립니다",
    "제출하세요",
    "제출하십시오",
    "제출해 주세요",
    "제출해주세요",
    "제출해 주십시오",
    "제출하시기 바랍니다",
    "제출해야 합니다",
    "제출해 주셔야 합니다",
    "제출 부탁드립니다",
    "전송하세요",
    "전송하십시오",
    "전송해 주세요",
    "전송해주세요",
    "전송해 주십시오",
    "전송하시기 바랍니다",
    "전송해야 합니다",
    "전송해 주셔야 합니다",
    "전송 부탁드립니다",
    "제공하세요",
    "제공하십시오",
    "제공해 주세요",
    "제공해주세요",
    "제공해 주십시오",
    "제공하시기 바랍니다",
    "제공해야 합니다",
    "제공해 주셔야 합니다",
    "제공 부탁드립니다",
    "회신하세요",
    "회신하십시오",
    "회신해 주세요",
    "회신해주세요",
    "회신해 주십시오",
    "회신하시기 바랍니다",
    "회신해야 합니다",
    "회신해 주셔야 합니다",
    "회신 부탁드립니다",
    "업로드하세요",
    "업로드하십시오",
    "업로드해 주세요",
    "업로드해주세요",
    "업로드해 주십시오",
    "업로드하시기 바랍니다",
    "업로드해야 합니다",
    "업로드해 주셔야 합니다",
    "업로드 부탁드립니다",
    "보내세요",
    "보내십시오",
    "보내 주세요",
    "보내주세요",
    "보내 주십시오",
    "보내시기 바랍니다",
    "보내야 합니다",
    "보내 주셔야 합니다",
    "알려 주세요",
    "알려주세요",
    "알려 주십시오",
    "적어 주세요",
    "적어주세요",
    "기입하세요",
    "기입해 주세요",
    "기입해주세요",
    "답장해 주세요",
    "답장해주세요"
  ],
  "action": [
    "확인하세요",
    "확인하십시오",
    "확인해 주세요",
    "확인해주세요",
    "확인해 주십시오",
    "확인하시기 바랍니다",
    "확인해야 합니다",
    "인증하세요",
    "인증하십시오",
    "인증해 주세요",
    "인증해주세요",
    "인증해 주십시오",
    "인증하시기 바랍니다",
    "인증해야 합니다",
    "복구하세요",
    "복구하십시오",
    "복구해 주세요",
    "복구해주세요",
    "복구해 주십시오",
    "복구하시기 바랍니다",
    "복구해야 합니다",
    "복원하세요",
    "복원하십시오",
    "복원해 주세요",
    "복원해주세요",
    "복원해 주십시오",
    "복원하시기 바랍니다",
    "복원해야 합니다",
    "해결하세요",
    "해결하십시오",
    "해결해 주세요",
    "해결해주세요",
    "해결해 주십시오",
    "해결하시기 바랍니다",
    "해결해야 합니다",
    "검토하세요",
    "검토하십시오",
    "검토해 주세요",
    "검토해주세요",
    "검토해 주십시오",
    "검토하시기 바랍니다",
    "검토해야 합니다",
    "로그인하세요",
    "로그인하십시오",
    "로그인해 주세요",
    "로그인해주세요",
    "로그인해 주십시오",
    "로그인하시기 바랍니다",
    "로그인해야 합니다",
    "재설정하세요",
    "재설정하십시오",
    "재설정해 주세요",
    "재설정해주세요",
    "재설정해 주십시오",
    "재설정하시기 바랍니다",
    "재설정해야 합니다",
    "잠금 해제하세요",
    "잠금 해제하십시오",
    "잠금 해제해 주세요",
    "잠금 해제해주세요",
    "잠금 해제해 주십시오",
    "잠금 해제하시기 바랍니다",
    "잠금 해제해야 합니다",
    "로그인",
    "로그인해",
    "로그인하여",
    "로그인하면",
    "로그인해서",
    "계정 확인",
    "계정 인증",
    "계정 복구",
    "계정 재설정",
    "보안 문제 해결"
  ],
  "account": [
    "계정",
    "계정을",
    "계정의",
    "계정에",
    "계정에서",
    "계정이",
    "계정은",
    "계정으로",
    "계정과",
    "계정 확인",
    "계정 인증",
    "보안 경고",
    "보안 경고를",
    "보안 문제",
    "보안 문제를",
    "보안 문제로",
    "소환장",
    "소환장을",
    "법적 요청",
    "법적 요청을",
    "사건 자료",
    "사건 자료를",
    "접근 제한",
    "접근이 제한",
    "접근이 차단",
    "액세스 중지"
  ],
  "negation": [
    "입력하지 마세요",
    "입력하지 마십시오",
    "입력하지 말아 주세요",
    "입력하면 안 됩니다",
    "입력해서는 안 됩니다",
    "제출하지 마세요",
    "제출하지 마십시오",
    "제출하지 말아 주세요",
    "제출하면 안 됩니다",
    "제출해서는 안 됩니다",
    "전송하지 마세요",
    "전송하지 마십시오",
    "전송하지 말아 주세요",
    "전송하면 안 됩니다",
    "전송해서는 안 됩니다",
    "제공하지 마세요",
    "제공하지 마십시오",
    "제공하지 말아 주세요",
    "제공하면 안 됩니다",
    "제공해서는 안 됩니다",
    "회신하지 마세요",
    "회신하지 마십시오",
    "회신하지 말아 주세요",
    "회신하면 안 됩니다",
    "회신해서는 안 됩니다",
    "업로드하지 마세요",
    "업로드하지 마십시오",
    "업로드하지 말아 주세요",
    "업로드하면 안 됩니다",
    "업로드해서는 안 됩니다",
    "공유하지 마세요",
    "공유하지 마십시오",
    "공유하지 말아 주세요",
    "공유하면 안 됩니다",
    "공유해서는 안 됩니다",
    "보내지 마세요",
    "보내지 마십시오",
    "보내지 말아 주세요",
    "보내면 안 됩니다",
    "보내서는 안 됩니다",
    "알려 주지 마세요",
    "알려주지 마세요",
    "알려 주지 마십시오",
    "요구하지 않습니다",
    "요청하지 않습니다",
    "묻지 않습니다",
    "입력을 요구하지 않습니다",
    "입력을 요청하지 않습니다"
  ],
  "share": [
    "문서를 공유했습니다",
    "파일을 공유했습니다",
    "문서를 공유합니다",
    "파일을 공유합니다",
    "공유 문서",
    "공유 파일",
    "공유된 문서",
    "공유된 파일",
    "문서를 열어 주세요",
    "문서를 열어주세요",
    "문서를 확인해 주세요",
    "문서를 확인해주세요",
    "문서를 보려면",
    "파일을 보려면"
  ]
}
}
;

(() => {
 'use strict';const M=globalThis.MCG;
 let rules=null;
 const ascii=s=>{try{return new URL('https://'+s).hostname.toLowerCase().replace(/\.$/,'');}catch{return s;}};
 function init(){if(rules)return;rules={exact:new Set(),wild:new Set(),exception:new Set()};
  for(const value of [...M.PSL.icann,...M.PSL.private]){let k='exact',v=value;if(v.startsWith('!')){k='exception';v=v.slice(1);}else if(v.startsWith('*.')){k='wild';v=v.slice(2);}rules[k].add(ascii(v));}}
 M.domain=host=>{init();host=ascii(host);if(host.startsWith('[')||/^\d+(?:\.\d+){3}$/.test(host)||!host.includes('.'))return {host,suffix:null,registrable:null};
  const p=host.split('.');let n=1;
  for(let i=0;i<p.length;i++){const rest=p.slice(i).join('.');if(rules.exception.has(rest)){n=p.length-i-1;break;}if(rules.exact.has(rest))n=Math.max(n,p.length-i);if(i>0&&rules.wild.has(rest))n=Math.max(n,p.length-i+1);}
  return {host,suffix:p.slice(-n).join('.'),registrable:p.length>n?p.slice(-n-1).join('.'):null};
 };
 // RFC 3492 decoder, bounded to a DNS label. Display assistance only; URL() decides navigation.
 function decode(label){if(!label.startsWith('xn--'))return label;const s=label.slice(4);let n=128,i=0,bias=72,out=[],pos=0;const dash=s.lastIndexOf('-');
  if(dash>=0){out=[...s.slice(0,dash)].map(c=>c.codePointAt(0));pos=dash+1;}
  function adapt(d,count,first){d=first?Math.floor(d/700):d>>1;d+=Math.floor(d/count);let k=0;while(d>455){d=Math.floor(d/35);k+=36;}return k+Math.floor(36*d/(d+38));}
  while(pos<s.length){const old=i;let w=1,k=36;for(;;k+=36){if(pos>=s.length)throw 0;const c=s.charCodeAt(pos++);const d=c>=48&&c<=57?c-22:c>=65&&c<=90?c-65:c>=97&&c<=122?c-97:99;if(d>=36)throw 0;i+=d*w;if(!Number.isSafeInteger(i))throw 0;const t=k<=bias?1:k>=bias+26?26:k-bias;if(d<t)break;w*=36-t;if(!Number.isSafeInteger(w))throw 0;}
   const len=out.length+1;bias=adapt(i-old,len,old===0);n+=Math.floor(i/len);i%=len;if(n>0x10ffff||n>=0xd800&&n<=0xdfff)throw 0;out.splice(i++,0,n);if(out.length>256)throw 0;}
  return String.fromCodePoint(...out);
 }
 M.unicodeHost=host=>{try{return host.split('.').map(decode).join('.');}catch{return host;}};
 const look={'а':'a','е':'e','о':'o','р':'p','с':'c','у':'y','х':'x','і':'i','ј':'j','ѕ':'s','ԁ':'d','ԍ':'g','ӏ':'l','α':'a','ο':'o','ρ':'p','ν':'v','ι':'i','ϲ':'c','ℓ':'l','０':'0','１':'1'};
 M.skeleton=s=>[...s.normalize('NFKC').toLowerCase()].map(c=>look[c]||c).join('');
 M.BRANDS=[
  {id:'google',name:'Google',words:['google','グーグル','谷歌','جوجل'],domains:['google.com'],auth:['accounts.google.com'],account:['myaccount.google.com'],support:['support.google.com']},
  {id:'microsoft',name:'Microsoft',words:['microsoft','マイクロソフト','微软','مايكروسوفت'],domains:['microsoft.com','live.com','outlook.com','microsoftonline.com'],auth:['login.microsoftonline.com','login.live.com'],account:['account.microsoft.com','account.live.com'],support:['support.microsoft.com']},
  {id:'apple',name:'Apple',words:['apple','アップル','苹果','آبل'],domains:['apple.com','icloud.com'],auth:['account.apple.com','appleid.apple.com','idmsa.apple.com'],account:['account.apple.com'],support:['support.apple.com']},
  {id:'paypal',name:'PayPal',words:['paypal','ペイパル'],domains:['paypal.com'],auth:['www.paypal.com','paypal.com'],account:['www.paypal.com'],support:[]},
  {id:'amazon',name:'Amazon',words:['amazon','アマゾン','亚马逊','أمازون'],domains:['amazon.com','amazon.co.jp','amazon.de','amazon.fr','amazon.co.uk','amazon.es','amazon.com.br'],auth:[],account:[],support:[]},
  {id:'github',name:'GitHub',words:['github','ギットハブ'],domains:['github.com'],auth:['github.com'],account:[],support:['support.github.com']}
 ];
 M.findBrands=text=>{const s=M.normalize(text);return M.BRANDS.filter(b=>b.words.some(w=>/^[a-z]+$/.test(w)?new RegExp('(^|[^a-z])'+w+'([^a-z]|$)').test(s):s.includes(w)));};
 M.senderBrand=sender=>{const dom=M.clip(sender,500).split('@').pop().replace(/[>\s].*$/,'').toLowerCase();return M.BRANDS.find(b=>b.domains.some(d=>M.boundary(dom,d)))||null;};
 M.service=u=>{const h=u.hostname.toLowerCase().replace(/\.$/,'');const p=u.pathname;
  const role=(kind,operator='')=>({kind,operator,thirdParty:['ugc','form','document','file'].includes(kind)});
  if(h==='accounts.google.com')return role(p.includes('/o/oauth2/')?'oauth':'authentication','Google');
  if(h==='sites.google.com')return role(/^\/(view|site|u|d)\//.test(p)?'ugc':'unknown','Google');
  if(['forms.google.com','forms.gle'].includes(h)||h==='docs.google.com'&&p.startsWith('/forms/'))return role('form','Google');
  if(h==='docs.google.com'&&/^\/(document|spreadsheets|presentation|drawings)\//.test(p))return role('document','Google');
  if(h==='drive.google.com'&&/^\/(file|drive|open|uc)/.test(p))return role('file','Google');
  if(h==='github.com')return role(p==='/login/oauth/authorize'?'oauth':/^\/(login|session|sessions)(\/|$)/.test(p)?'authentication':'ugc','GitHub');
  if(h==='forms.office.com'||h==='forms.cloud.microsoft')return role('form','Microsoft');
  if(h.endsWith('.sharepoint.com')||h==='1drv.ms'||h==='onedrive.live.com')return role('file','Microsoft');
  const hostings=[['github.io','GitHub'],['pages.dev','Cloudflare'],['workers.dev','Cloudflare'],['web.app','Firebase'],['firebaseapp.com','Firebase'],['vercel.app','Vercel'],['netlify.app','Netlify'],['notion.site','Notion'],['blogspot.com','Blogger']];
  for(const [d,o] of hostings)if(h.endsWith('.'+d))return role('ugc',o);
  if(['www.notion.so','notion.so'].includes(h))return role('document','Notion');
  if((M.boundary(h,'dropbox.com')&&/^\/(s|sh|scl)\//.test(p))||(M.boundary(h,'box.com')&&p.startsWith('/s/')))return role('file',h.includes('dropbox')?'Dropbox':'Box');
  for(const b of M.BRANDS){if(b.auth.includes(h))return role(p.includes('oauth')?'oauth':'authentication',b.name);if(b.account.includes(h))return role('account',b.name);if(b.support.includes(h))return role('support',b.name);}
  return role('unknown');
 };
 M.brandHost=(b,h)=>!!b&&b.domains.some(d=>M.boundary(h,d));
})();

/* Sender metadata is an unverified claim, never authentication or a safe verdict. */
(() => {
 'use strict';const M=globalThis.MCG;
 M.senderDomain=value=>{
  if(typeof value!=='string'||value.length>253)return '';
  const raw=value.trim().toLowerCase().replace(/\.$/,'');
  if(!raw||/[\s/@:#?\[\]\\<>]/.test(raw))return '';
  let host;try{host=new URL('https://'+raw).hostname.toLowerCase();}catch{return '';}
  if(!host.includes('.')||/^\d+(?:\.\d+){3}$/.test(host)||!host.split('.').every(x=>/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(x)))return '';
  return host;
 };
 M.mailboxInfo=value=>{
  const empty={address:'',domain:'',displayName:''};if(typeof value!=='string'||value.length>1000||/[\r\n]/.test(value))return empty;
  let text=value.trim(),name='';const angle=/^([^<>]*)<([^<>]+)>$/.exec(text);
  if(angle){name=angle[1].trim().replace(/^"([^"]*)"$/,'$1');text=angle[2].trim();}else if(/[<>]/.test(text))return empty;
  const match=/^([a-z0-9.!#$%&'*+\/=?^_`{|}~-]+)@([^@]+)$/i.exec(text);
  if(!match||match[1].startsWith('.')||match[1].endsWith('.')||match[1].includes('..'))return empty;
  const domain=M.senderDomain(match[2]);if(!domain)return empty;
  return {address:match[1]+'@'+domain,domain,displayName:M.clip(name,200)};
 };
 const domainBrand=domain=>M.BRANDS.find(b=>b.domains.some(d=>M.boundary(domain,d)))||null;
 const publicMailboxes=new Set(['outlook.com','live.com','icloud.com']);
 M.senderBrand=sender=>{const domain=M.mailboxInfo(sender).domain;return domain?M.BRANDS.find(b=>b.domains.some(d=>!publicMailboxes.has(d)&&M.boundary(domain,d)))||null:null;};
 M.compareSenderDomains=(a,b)=>{
  a=M.senderDomain(a);b=M.senderDomain(b);if(!a||!b)return 'UNKNOWN';if(a===b)return 'SAME';
  const aa=M.domain(a).registrable,bb=M.domain(b).registrable;if(aa&&bb&&aa===bb)return 'RELATED';
  const ba=domainBrand(a),br=domainBrand(b);return ba&&br&&ba.id===br.id?'RELATED':'DIFFERENT';
 };
 M.senderMetadata=(address,displayName='')=>{
  const box=M.mailboxInfo(address),name=M.clip(displayName||box.displayName,200).trim();
  const nameBrand=M.BRANDS.find(b=>b.words.some(w=>M.normalize(w)===M.normalize(name)))||null;
  const displayedAddress=M.mailboxInfo(name),claimedDomain=displayedAddress.domain;
  // Shared mailbox-provider ownership does not identify the company as sender.
  // Outlook/Live/iCloud users can choose ordinary personal mailbox addresses.
  const nameDomainMatches=nameBrand?.domains.some(d=>!publicMailboxes.has(d)&&M.boundary(box.domain,d));
  const actualSite=box.domain?M.domain(box.domain).registrable:null,claimedSite=claimedDomain?M.domain(claimedDomain).registrable:null;
  const displayedDomainMatches=box.domain===claimedDomain||!!actualSite&&actualSite===claimedSite;
  const nameMismatch=!!box.domain&&((!!nameBrand&&!nameDomainMatches)||(!!claimedDomain&&!displayedDomainMatches));
  return {address:box.address,domain:box.domain,displayName:name,claimedBrand:nameBrand?.id||'',claimedDomain,nameMismatch,provenance:'UNVERIFIED_SENDER_CLAIM'};
 };
 M.senderHeaderEvidence=(fields,sender)=>{
  const all=n=>fields.filter(f=>f.name===n),from=all('from'),returns=all('return-path');
  const goodFrom=from.length===1&&!from[0].invalid,fromDomain=goodFrom?M.mailboxInfo(from[0].value).domain:'';
  const deliveryDomain=returns.length===1&&!returns[0].invalid?M.mailboxInfo(returns[0].value).domain:'';
  const signatures=all('dkim-signature');let malformed=false;const signatureDomains=[];
  for(const field of signatures.slice(0,50)){
   const ds=M.splitHeader(field.value).filter(x=>/^d\s*=/i.test(x));
   const domain=ds.length===1&&!field.invalid?M.senderDomain(ds[0].slice(ds[0].indexOf('=')+1)):'';
   if(!domain)malformed=true;else if(!signatureDomains.includes(domain))signatureDomains.push(domain);
  }
  const signerRelation=!fromDomain||!signatureDomains.length||malformed||signatures.length>50?'UNKNOWN':signatureDomains.some(d=>M.compareSenderDomains(fromDomain,d)==='SAME')?'SAME':signatureDomains.some(d=>M.compareSenderDomains(fromDomain,d)==='RELATED')?'RELATED':'DIFFERENT';
  return {...M.senderMetadata(goodFrom?sender:''),fromDomain,deliveryDomain,signatureDomains,deliveryRelation:M.compareSenderDomains(fromDomain,deliveryDomain),signerRelation,provenance:'UNVERIFIED_HEADER_CLAIM'};
 };
 // Gmail's own displayed details are useful claims, not verified SPF/DKIM.
 M.senderDisplayEvidence=(metadata,observations)=>{
  if(!metadata?.address||!metadata.domain||!observations||observations.source!=='GMAIL_DETAILS'||observations.fromAddress!==metadata.address)return metadata;
  const deliveryDomain=M.senderDomain(observations.mailedBy||''),signed=M.senderDomain(observations.signedBy||''),signatureDomains=signed?[signed]:[];
  return {...metadata,fromDomain:metadata.domain,deliveryDomain,signatureDomains,deliveryRelation:M.compareSenderDomains(metadata.domain,deliveryDomain),signerRelation:signed?M.compareSenderDomains(metadata.domain,signed):'UNKNOWN',provenance:'GMAIL_DISPLAY_CLAIM'};
 };
})();

(() => {
 'use strict';const M=globalThis.MCG;let cache;
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 function init(){if(cache)return;cache=Object.entries(M.TERMS).map(([locale,d])=>[locale,Object.fromEntries(Object.entries(d).map(([k,a])=>[k,a.map(word=>{const w=M.normalize(word);return {w,re:/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(w)?null:new RegExp('(^|[^\\p{L}\\p{N}])'+escape(w)+'(?=$|[^\\p{L}\\p{N}])','u')};})]))]);}
 M.context=text=>{init();const s=M.normalize(text);const sentences=s.split(/(?<=[!?。！？;；\n])\s*|(?<=\.)\s+(?=[a-z\p{Script=Cyrillic}])/u).slice(0,40);
  const result={secret:false,submit:false,action:false,account:false,share:false,active:false,secretRequest:false,languages:[],brandIds:[]};
  for(const sent of sentences){const brands=M.findBrands(sent);for(const b of brands)if(!result.brandIds.includes(b.id))result.brandIds.push(b.id);
   for(const [lang,d] of cache){const found=k=>d[k].some(x=>x.re?x.re.test(sent):sent.includes(x.w));const n=found('negation');if(n)continue;const f={secret:found('secret'),submit:found('submit'),action:found('action'),account:found('account'),share:found('share')};
    if(Object.values(f).some(Boolean)&&!result.languages.includes(lang))result.languages.push(lang);
    for(const [k,v] of Object.entries(f))result[k]||=v;
    result.secretRequest||=f.secret&&f.submit;result.active||=(f.action&&f.account)||(f.secret&&f.submit);
   }
  }
  return result;
 };
})();

(() => {
 'use strict';const M=globalThis.MCG;
 M.inspectUrl=(raw,label='')=>{
  const result={raw:M.clip(raw,M.LIMIT.url),url:null,host:'',unicodeHost:'',registrable:null,role:{kind:'unknown',thirdParty:false,operator:''},candidates:[],issues:[],displayHost:'',shownText:M.clip(label,500),unsupported:false,partial:false,lookalikeBrands:[],userinfoBrands:[],userinfoText:'',invisibleChars:[]};
  if(typeof raw!=='string'||!raw.trim()||raw.length>M.LIMIT.url){result.partial=true;result.issues.push('unparsed');return result;}
  let u;try{u=new URL(raw);}catch{result.partial=true;result.issues.push('unparsed');return result;}
  result.url=u.href;result.host=u.hostname.toLowerCase().replace(/\.$/,'');result.unicodeHost=M.unicodeHost(result.host);
  if(!['http:','https:','mailto:','tel:'].includes(u.protocol)){result.unsupported=true;result.issues.push('scheme');return result;}
  if(!/^https?:$/.test(u.protocol)){result.role.kind=u.protocol==='mailto:'?'email':'phone';return result;}
  result.registrable=M.domain(result.host).registrable;result.role=M.service(u);
  if(u.username||u.password){result.issues.push('userinfo');result.userinfoText=[u.username,u.password].filter(Boolean).join(':');}
  const invis=[...new Set((raw+label).match(/[\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g)||[])].map(ch=>'U+'+ch.codePointAt(0).toString(16).toUpperCase().padStart(4,'0'));
  if(invis.length){result.issues.push('invisible');result.invisibleChars=invis;}
  if(u.protocol==='http:')result.issues.push('http');
  if(u.port&&!['443','80'].includes(u.port))result.issues.push('port');
  if(result.host.startsWith('[')||/^\d+(?:\.\d+){3}$/.test(result.host)||result.host==='localhost'||result.host.endsWith('.localhost'))result.issues.push('numeric');
  let cur=u;const seen=new Set([u.href]);
  for(let depth=0;depth<3;depth++){
   let next=null;const h=cur.hostname.toLowerCase();
   if(h==='www.google.com'&&cur.pathname==='/url')next=cur.searchParams.get('q')||cur.searchParams.get('url');
   if(h.endsWith('.safelinks.protection.outlook.com')&&cur.pathname==='/')next=cur.searchParams.get('url');
   if(!next)break;
   const parsed=M.validHttp(next);if(!parsed||seen.has(parsed.href)){result.partial=true;break;}
   seen.add(parsed.href);result.candidates.push({url:parsed.href,host:parsed.hostname,role:M.service(parsed)});cur=parsed;
  }
  if(result.candidates.length)result.issues.push('wrapper');
  if(['bit.ly','tinyurl.com','t.co','is.gd','shorturl.at','ow.ly'].includes(result.host))result.issues.push('shortener');
  const shown=M.normalize(label).replace(/\s+/g,'');
  if(shown.length<=2048&&/^(https?:\/\/|www\.)/i.test(shown)){
   const d=M.validHttp(shown.startsWith('www.')?'https://'+shown:shown);if(d){result.displayHost=d.hostname.toLowerCase().replace(/\.$/,'');
    // This suppresses only the displayed-domain mismatch indicator. A shared
    // ICANN+PRIVATE registrable domain is not verified ownership or safety.
    const displayedDomain=M.domain(result.displayHost).registrable;
    const sameSite=displayedDomain!==null&&result.registrable!==null&&displayedDomain===result.registrable;
    if(result.displayHost!==result.host&&!sameSite&&!result.candidates.some(x=>x.host.toLowerCase().replace(/\.$/,'')===result.displayHost))result.issues.push('displayMismatch');}}
  const skeleton=M.skeleton(result.unicodeHost);result.lookalikeBrands=[];result.userinfoBrands=[];
  for(const b of M.BRANDS){if(M.brandHost(b,result.host))continue;
   const names=[...b.domains,...b.auth];
   if(names.some(d=>skeleton===d||skeleton.endsWith('.'+d))&&skeleton!==result.host)result.lookalikeBrands.push(b.id);
   // Explicit domain placed on the left of an unrelated real domain; do not guess edit-distance ownership.
   if(names.some(d=>result.host.startsWith(d+'.')))result.lookalikeBrands.push(b.id);
   if((u.username||u.password)&&names.some(d=>(u.username+':'+u.password).toLowerCase().includes(d)))result.userinfoBrands.push(b.id);
  }
  return result;
 };
})();

(() => {
 'use strict';const M=globalThis.MCG;
 // Split only outside comments and quoted strings. Never flatten duplicate fields.
 M.splitHeader=(s,delimiter=';')=>{const out=[];let start=0,quote=false,escape=false,depth=0;
  for(let i=0;i<s.length;i++){const c=s[i];if(escape){escape=false;continue;}if(c==='\\'&&(quote||depth)){escape=true;continue;}if(c==='"'&&!depth){quote=!quote;continue;}if(!quote){if(c==='('){depth++;continue;}if(c===')'&&depth){depth--;continue;}if(c===delimiter&&!depth){out.push(s.slice(start,i).trim());start=i+1;}}}out.push(s.slice(start).trim());return out;};
 M.parseHeaders=raw=>{
  if(typeof raw!=='string')raw='';const end=raw.search(/\r?\n\r?\n/);let text=end<0?raw:raw.slice(0,end);let partial=text.length>M.LIMIT.header;
  text=text.slice(0,M.LIMIT.header);const fields=[],errors=[];
  for(const line of text.split(/\r\n|\n|\r/)){
   if(/^[ \t]/.test(line)&&fields.length){let f=fields.at(-1);if(f.value.length+line.length>M.LIMIT.field){partial=true;f.invalid=true;continue;}f.value+=' '+line.trim();continue;}
   const idx=line.indexOf(':');if(idx<1){if(line.trim())errors.push('malformed');continue;}
   if(fields.length>=M.LIMIT.fields){partial=true;break;}const name=line.slice(0,idx);if(!/^[!-9;-~]+$/.test(name)){errors.push('name');continue;}
   const v=line.slice(idx+1).trim();fields.push({name:name.toLowerCase(),originalName:name,value:v.slice(0,M.LIMIT.field),ordinal:fields.length,invalid:v.length>M.LIMIT.field});if(v.length>M.LIMIT.field)partial=true;
  }
  const all=n=>fields.filter(x=>x.name===n).map(x=>x.value);const first=n=>all(n)[0]||'';
  const tags=s=>Object.fromEntries(M.splitHeader(s).map(x=>{let i=x.indexOf('=');return i>0?[x.slice(0,i).trim().toLowerCase(),x.slice(i+1).trim()]:null;}).filter(x=>x&&/^[a-z][a-z0-9_-]*$/.test(x[0])&&!['constructor','prototype','__proto__'].includes(x[0])));
  const authClaims=[];for(const value of all('authentication-results')){const parts=M.splitHeader(value);for(const part of parts.slice(1)){const match=/^(spf|dkim|dmarc|arc)\s*=\s*(pass|fail|none|neutral|softfail|temperror|permerror|policy)\b/i.exec(part);if(match)authClaims.push({authservId:parts[0],method:match[1].toLowerCase(),result:match[2].toLowerCase(),provenance:'UNVERIFIED_HEADER_CLAIM'});}}
  const dkim=all('dkim-signature').map(tags).map(t=>Object.fromEntries(['d','s','i','h','l','t','x','a','c'].filter(k=>Object.hasOwn(t,k)).map(k=>[k,t[k]])));
  const arc=all('arc-seal').slice(0,50).map(tags).map(t=>({i:t.i||'',d:t.d||'',cv:t.cv||'',verified:false}));
  const domains=s=>{const x=[...s.matchAll(/@([a-z0-9.-]+)/gi)].map(m=>m[1].toLowerCase());return x;};const from=domains(first('from')),reply=domains(first('reply-to'));
  return {fields,errors,partial:partial||errors.length>0,authentication:'UNKNOWN',authClaims,dkim,arc,received:all('received').slice(0,128),
    duplicateIdentity:all('from').length>1||all('reply-to').length>1,
    indirection:fields.some(f=>/^(x-forwarded-|x-sieve-redirected-|resent-|list-id)/.test(f.name))||/^<?srs[01][=+-]/i.test(first('return-path')),
    replyMismatch:reply.length>0&&from.length>0&&reply.some(x=>!from.includes(x)),
    sender:first('from'),replyTo:first('reply-to'),senderEvidence:M.senderHeaderEvidence(fields,first('from'))};
 };
})();

(() => {
 'use strict';const M=globalThis.MCG;
 M.analyzeLink=(input,message={})=>{
  const info=M.inspectUrl(input.href,input.label);const context=M.context(input.context||input.label||'');const labelContext=M.context(input.label||'');
  const binding=input.binding||'anchor';const bound=binding!=='ambiguous';
  const senderEvidence=M.senderMetadata(message.sender,message.senderName||'');
  const brand=M.BRANDS.find(b=>labelContext.brandIds.includes(b.id))||M.BRANDS.find(b=>context.brandIds.includes(b.id))||M.senderBrand(message.sender)||M.BRANDS.find(b=>b.id===senderEvidence.claimedBrand);
  const active=!input.quoted&&(bound?context.active:labelContext.active);const secret=!input.quoted&&(bound?context.secretRequest:labelContext.secretRequest);
  const findings=[];const add=(id,level,reason)=>{if(!findings.some(x=>x.id===id))findings.push({id,level,reason,confidence:['HIGH_RISK','WARNING'].includes(level)?'high':'medium'});};
  const destinations=[{host:info.host,role:info.role,url:info.url},...info.candidates];
  const third=destinations.some(d=>d.role.thirdParty);
  const incompatible=!!brand&&destinations.some(d=>d.role.thirdParty&&(d.role.operator!==brand.name||!['support','authentication','account'].includes(d.role.kind)));
  const authSpoof=info.userinfoBrands.length>0||!!info.displayHost&&M.BRANDS.some(b=>b.auth.includes(info.displayHost)&&!M.brandHost(b,info.host))&&!info.issues.includes('wrapper');
  if(info.unsupported)add('P01','CAUTION','reasonScheme');
  if(third)add('I02','INFO','reasonUgc');
  if(info.issues.includes('wrapper')||info.issues.includes('shortener'))add('I04','INFO','reasonRedirect');
  if(info.partial)add('C05','CAUTION','reasonUnparsed');
  if(info.issues.includes('displayMismatch'))add('C02','CAUTION','reasonMismatch');
  if(info.issues.includes('userinfo'))add('C06','CAUTION','reasonUserinfo');
  if(info.issues.includes('invisible'))add('C07','CAUTION','reasonInvisible');
  if(active&&brand&&incompatible)add('W01','WARNING','reasonAccount');
  if(secret&&brand&&third)add('H01','HIGH_RISK','reasonSecret');
  if(secret&&brand&&info.role.kind==='email')add('H01','HIGH_RISK','reasonSecret');
  if(active&&authSpoof)add('H02','HIGH_RISK','reasonSpoof');
  if(active&&info.lookalikeBrands.length)add('W03','WARNING','reasonLookalike');
  if(active&&brand&&!third&&(info.candidates.length?[info.candidates.at(-1)]:destinations).some(d=>d.role.kind==='unknown'&&!M.brandHost(brand,d.host)))add('C04','CAUTION','reasonUnknown');
  if(!bound&&!input.quoted&&context.active&&third&&!labelContext.active)add('C01','CAUTION','reasonAmbiguous');
  const level=M.maxLevel(...findings.map(f=>f.level));
  const intent=secret?'secret':active?'account':context.share?'shared':'generic';
  return {id:input.id||'',info,findings,level,intent,brand:brand?.name||'',senderEvidence,occurrence:{context:M.clip(input.context||input.label||'',M.LIMIT.context),binding,quoted:!!input.quoted},action:info.unsupported?'BLOCK_UNSUPPORTED':M.LEVELS.indexOf(level)>=3?'CONFIRM':'ALLOW',coverage:info.partial?'PARTIAL':'READY'};
 };
 M.analyzeMessage=input=>{
  const links=(input.links||[]).slice(0,M.LIMIT.links).map(x=>M.analyzeLink(x,input));
  const findings=[];let header=null;let senderEvidence=M.senderDisplayEvidence(M.senderMetadata(input.sender,input.senderName||''),input.senderObservations);
  if(input.headers){header=M.parseHeaders(input.headers);senderEvidence=header.senderEvidence;if(header.indirection)addHeader('I01','INFO','reasonForward');if(header.replyMismatch)addHeader('I03','INFO','reasonReply');}
  if(senderEvidence.nameMismatch)addHeader('I05','INFO','reasonSenderName');
  if(senderEvidence.deliveryRelation==='DIFFERENT')addHeader('I06','INFO','reasonDeliveryDomain');
  if(senderEvidence.signerRelation==='DIFFERENT')addHeader('I07','INFO','reasonSignerDomain');
  for(const f of findings)if(['I05','I06','I07'].includes(f.id))f.senderEvidence=senderEvidence;
  function addHeader(id,level,reason){findings.push({id,level,reason,confidence:'low'});}
  const partial=!!input.partial||(input.links||[]).length>M.LIMIT.links||links.some(x=>x.coverage==='PARTIAL')||header?.partial;
  return {version:M.VERSION,level:M.maxLevel(...links.map(x=>x.level),...findings.map(x=>x.level)),links,findings,header,senderEvidence,
   coverage:{renderedBody:input.noBody?'NOT_INSPECTED':partial?'PARTIAL':'INSPECTED',urls:partial?'PARTIAL':'INSPECTED',headers:header?'UNVERIFIED_CLAIMS':'NOT_INSPECTED',qr:'NOT_INSPECTED',remoteDestination:'NOT_INSPECTED'},state:input.noBody&&!links.length?'UNAVAILABLE':partial?'PARTIAL':'READY'};
 };
})();

globalThis.MCG.LOCALES = {
  "en": {
    "description": "Local phishing warnings for Gmail. Check message context and links without sending your email to a server.",
    "active": "Checks enabled",
    "paused": "Checks paused",
    "enable": "Enable local checks",
    "options": "Settings",
    "language": "Language",
    "auto": "Browser language",
    "showInfo": "Also show additional information",
    "save": "Save settings",
    "saved": "Saved",
    "privacy": "Privacy",
    "coverage": "Checks cover the message text and links available to the extension. Email authentication, images, QR codes, attachments, and destination pages are not verified. A missing warning is not a safety guarantee.",
    "scan": "Local message check",
    "scanHelp": "Paste email headers or a complete email, or choose an .eml or .txt file, to analyze it using the same rules as Mail Guard’s automatic checks in Gmail. Content is processed only on your device and is not sent elsewhere or saved (up to 5 MB).",
    "choose": "Choose .eml or .txt",
    "analyze": "Check message",
    "clear": "Clear",
    "sample": "Try a fictional sample",
    "error": "Unable to complete this check. Check the input and size limit.",
    "noGmail": "Open Gmail to check messages.",
    "noMessages": "Open or expand a message in Gmail. If no result appears, reload Gmail.",
    "messages": "Open messages: {n}",
    "details": "View details",
    "close": "Close",
    "cancel": "Cancel",
    "proceed": "Open this link",
    "copy": "Copy URL",
    "copied": "Copied",
    "confirm": "Check before you open",
    "unsupported": "This type of link cannot be opened by the extension.",
    "target": "Click destination",
    "candidate": "Embedded destination candidate — not visited",
    "reason": "Why this is shown",
    "headers": "Header information",
    "headerNote": "This feature does not guarantee that an email’s sender is genuine.",
    "refresh": "Refresh",
    "reset": "Reset settings",
    "resetConfirm": "Reset settings? Local checks and additional information will be enabled, and the display language will follow your browser.",
    "input": "Paste a message or headers here…",
    "NO_FINDINGS": "No indicators found",
    "INFO": "Additional information",
    "CAUTION": "Review recommended",
    "WARNING": "Check before acting",
    "HIGH_RISK": "High-risk indicators",
    "reasonUgc": "This service can host content created by other people.",
    "reasonRedirect": "The final destination is not verified. An embedded URL is only a candidate.",
    "reasonUnparsed": "This link could not be fully parsed.",
    "reasonMismatch": "The displayed URL and actual link point to different domains.",
    "reasonUserinfo": "Text before @ is not the destination host.",
    "reasonInvisible": "Invisible or text-direction characters appear in this link.",
    "reasonAccount": "An account or security action points to third-party content.",
    "reasonSecret": "The message requests a password or code through an unsuitable destination.",
    "reasonSpoof": "An account-related request uses a link that disguises its real host.",
    "reasonLookalike": "This host resembles a known brand in a sensitive request.",
    "reasonUnknown": "The relationship between this destination and the requested account action is unknown.",
    "reasonAmbiguous": "The request and link cannot be linked confidently.",
    "reasonScheme": "Unsupported link type. No navigation is performed by the extension.",
    "reasonForward": "Headers contain signs consistent with forwarding. Forwarding alone does not indicate danger.",
    "reasonReply": "Reply and sender domains differ. This difference alone does not indicate danger.",
    "name": "Mail Guard",
    "partial": "Only part of this input could be checked. Size, format or parsing limits left some content uninspected.",
    "unavailable": "There is no readable message body to check. Header details may still be available.",
    "settingsHelp": "Choose the display language and what the extension shows while checking Gmail.",
    "languageHelp": "Changes the language used in the extension UI.",
    "enableHelp": "Automatically checks messages you open in Gmail. Turn this off to pause on-page warnings.",
    "showInfoHelp": "When off, additional information is available from a small button. Warnings and incomplete-check notices remain visible.",
    "shownHost": "Link display",
    "actualHost": "Actual destination host",
    "apparentTarget": "Text before @",
    "suspiciousChars": "Suspicious characters",
    "requestedAction": "Requested action",
    "destinationHost": "Destination",
    "destinationType": "Destination type",
    "candidateHost": "Possible destination",
    "thirdPartyContent": "third-party content",
    "actionSecret": "Password or verification code entry",
    "actionAccount": "Account or sign-in action",
    "actionShared": "Open shared content",
    "actionOpen": "Open link",
    "unknown": "Incomplete check",
    "occurrences": "Occurrences: {n}",
    "context": "Nearby text",
    "linkText": "Link text",
    "otherFindings": "Other findings: {n}",
    "linkInput": "Unparsed link input",
    "privacyChecks": "Checks the visible text and links of messages you open in Gmail, plus email content you paste or select from .eml or .txt files, on this device.",
    "privacyExclusions": "Does not verify images, QR codes, attachments, or destination pages.",
    "privacyStorage": "The extension does not send email content outside this device or save it. Only settings are saved.",
    "privacyDisclaimer": "A missing warning does not guarantee safety or an authentic sender.",
    "linkCount": "Links: {n}",
    "groupLinkCount": "Groups: {groups} · links: {links}",
    "locateLink": "Go to location",
    "linkChanged": "Link changed; checking again",
    "warningMarker": "Check",
    "locateWarning": "Go to location",
    "copyUnavailable": "Unable to copy",
    "markerTarget": "Link destination",
    "showFullUrl": "Show full URL",
    "hideFullUrl": "Hide full URL",
    "scanning": "Checking message…",
    "sampleSubject": "Fictional test message; not a real email",
    "sampleBody": "Enter your Google password:",
    "settingsError": "Unable to read or save settings. Try again.",
    "fileNone": "No file selected",
    "fileSelected": "Selected file: {name}",
    "reasonCount": "Reasons: {n}",
    "groupReasonCount": "Links: {groups} · reasons: {reasons}",
    "reasonSenderName": "The displayed sender name or address does not match the sender address domain. This alone does not establish impersonation.",
    "reasonDeliveryDomain": "The sending or forwarding domain differs from the sender domain. Legitimate forwarding can explain this.",
    "reasonSignerDomain": "The reported signing domain differs from the sender domain. This alone does not establish impersonation.",
    "senderAddress": "Sender address",
    "senderName": "Displayed sender name",
    "senderDomain": "Sender domain",
    "deliveryDomain": "Sending / forwarding domain",
    "signerDomain": "Reported signing domain",
    "senderClaimsNote": "Sender and authentication details are reported information, not independently verified. A familiar address does not verify the link.",
    "senderLinkWarning": "Check links",
    "senderInfo": "Sender info",
    "locateSender": "Go to sender",
    "senderContext": "Sender and link context",
    "privacySenderChecks": "Also compares the displayed sender name/address and sending/signing domains from Gmail details you open, locally on this device."
  },
  "ja": {
    "description": "Gmailの本文とリンクを端末内で確認し、フィッシングの兆候を通知します。メール内容をサーバーへ送信しません。",
    "active": "チェックは有効です",
    "paused": "チェックは停止中です",
    "enable": "端末内チェックを有効にする",
    "options": "設定",
    "language": "表示言語",
    "auto": "ブラウザーの言語",
    "showInfo": "補足情報も表示する",
    "save": "設定を保存",
    "saved": "保存しました",
    "privacy": "プライバシー",
    "coverage": "確認対象は、この拡張機能が読み取れる本文とリンクです。メール認証・画像・QRコード・添付ファイル・リンク先ページは検証しません。警告がなくても安全を保証するものではありません。",
    "scan": "メールを端末内で確認",
    "scanHelp": "メールヘッダーやメール全文を貼り付けるか、.eml／.txtファイルを選ぶと、Gmailの自動チェックと同じルールで解析できます。内容は端末内だけで処理し、外部へ送信・保存しません（最大5 MB）。",
    "choose": ".eml／.txtを選択",
    "analyze": "メールを確認",
    "clear": "消去",
    "sample": "架空のサンプルで試す",
    "error": "確認を完了できませんでした。入力内容とサイズ制限を確認してください。",
    "noGmail": "Gmailを開いてメールを確認してください。",
    "noMessages": "Gmailでメールを開くか展開してください。結果が出ない場合はGmailを再読み込みしてください。",
    "messages": "開いているメール：{n}件",
    "details": "詳細を見る",
    "close": "閉じる",
    "cancel": "キャンセル",
    "proceed": "このリンクを開く",
    "copy": "URLをコピー",
    "copied": "コピーしました",
    "confirm": "開く前に確認してください",
    "unsupported": "この種類のリンクは、拡張機能から開けません。",
    "target": "クリック先",
    "candidate": "URL内の遷移候補（アクセスしていません）",
    "reason": "表示の理由",
    "headers": "ヘッダー情報",
    "headerNote": "メールの送信元が本物かどうかを保証する機能ではありません。",
    "refresh": "更新",
    "reset": "設定を初期化",
    "resetConfirm": "設定を初期化しますか？端末内チェックと補足情報の表示が有効になり、表示言語はブラウザーの言語に戻ります。",
    "input": "メールやヘッダーを貼り付けてください…",
    "NO_FINDINGS": "注意すべき兆候は見つかりませんでした",
    "INFO": "補足情報",
    "CAUTION": "確認をおすすめします",
    "WARNING": "操作前に確認",
    "HIGH_RISK": "高リスクの特徴があります",
    "reasonUgc": "このサービスでは、第三者がコンテンツを作成できます。",
    "reasonRedirect": "最終的な移動先は未確認です。URLに含まれる移動先も候補にすぎません。",
    "reasonUnparsed": "このリンクを完全には解析できませんでした。",
    "reasonMismatch": "表示されたURLと実際のリンクで、接続先のドメインが異なります。",
    "reasonUserinfo": "@より前の文字列は、実際のリンク先のホスト名ではありません。",
    "reasonInvisible": "リンクに不可視文字や文字方向を変える文字が含まれています。",
    "reasonAccount": "アカウントやセキュリティに関する操作で、第三者のコンテンツへ誘導しています。",
    "reasonSecret": "パスワードや認証コードを、不適切なリンク先で入力・送信するよう求めています。",
    "reasonSpoof": "アカウントに関する操作で、実際の接続先を偽装するリンクが使われています。",
    "reasonLookalike": "重要な操作を求めるリンクのホスト名が、既知のブランド名に似ています。",
    "reasonUnknown": "このリンク先と、求められているアカウント操作の関係は確認できません。",
    "reasonAmbiguous": "要求される操作とリンクの対応を、明確に確認できません。",
    "reasonScheme": "未対応のリンク形式です。拡張機能はこのリンクを開きません。",
    "reasonForward": "ヘッダーに転送の可能性を示す情報があります。転送だけで危険とは判断できません。",
    "reasonReply": "返信先と差出人のドメインが異なります。この違いだけで危険とは判断できません。",
    "name": "Mail Guard",
    "partial": "一部のみ確認しました。サイズ・形式・解析上限などにより、未確認の内容が残っています。",
    "unavailable": "確認できるメール本文がありません。ヘッダー情報は参照できる場合があります。",
    "settingsHelp": "表示言語と、Gmailでの自動チェックや表示する情報を設定します。",
    "languageHelp": "拡張機能の表示言語を変更します。",
    "enableHelp": "Gmailで開いたメールを自動で確認します。オフにすると画面上の警告表示を一時停止します。",
    "showInfoHelp": "オフの場合、補足情報は小さなボタンから確認できます。警告や未確認部分の通知は引き続き表示します。",
    "shownHost": "表示されたURL",
    "actualHost": "実際のリンク先ホスト名",
    "apparentTarget": "@ の前の文字列",
    "suspiciousChars": "注意が必要な文字",
    "requestedAction": "求められている操作",
    "destinationHost": "接続先",
    "destinationType": "接続先の種類",
    "candidateHost": "考えられる移動先",
    "thirdPartyContent": "第三者コンテンツ",
    "actionSecret": "パスワードや認証コードの入力",
    "actionAccount": "アカウントやログインに関する操作",
    "actionShared": "共有コンテンツを開く",
    "actionOpen": "リンクを開く",
    "unknown": "確認できない部分があります",
    "occurrences": "{n} か所",
    "context": "周辺の文面",
    "linkText": "リンクの表示文",
    "otherFindings": "ほかに {n} 件の注意点",
    "linkInput": "解析できなかったリンク",
    "privacyChecks": "Gmailで開いたメールの表示中の本文とリンク、および貼り付けたメールや選択した.eml／.txtファイルの内容を、端末内で確認します。",
    "privacyExclusions": "画像・QRコード・添付ファイル・リンク先ページは検証しません。",
    "privacyStorage": "メール内容は外部へ送信せず、保存もしません。保存するのは設定だけです。",
    "privacyDisclaimer": "警告がなくても、メールの安全性や送信元が本物であることは保証されません。",
    "linkCount": "{n} 個のリンク",
    "groupLinkCount": "{groups} 組・{links} 個のリンク",
    "locateLink": "該当箇所に移動",
    "linkChanged": "リンクが変更されました。再確認中",
    "warningMarker": "要確認",
    "locateWarning": "該当箇所に移動",
    "copyUnavailable": "コピーできませんでした",
    "markerTarget": "リンク先",
    "showFullUrl": "URL全文を表示",
    "hideFullUrl": "URL全文を非表示",
    "scanning": "メールを確認中…",
    "sampleSubject": "テスト用の架空メール（実際のメールではありません）",
    "sampleBody": "Googleのパスワードを入力してください：",
    "settingsError": "設定の読み込み、または保存に失敗しました。もう一度お試しください。",
    "fileNone": "ファイルは選択されていません",
    "fileSelected": "選択したファイル：{name}",
    "reasonCount": "注意点 {n} 件",
    "groupReasonCount": "リンク {groups} 件・注意点 {reasons} 件",
    "reasonSenderName": "表示された送信者名やアドレスが、送信者アドレスのドメインと一致しません。この違いだけでなりすましとは判断できません。",
    "reasonDeliveryDomain": "送信経路や転送元のドメインが、送信者のドメインと異なります。正規の転送でも起こる場合があります。",
    "reasonSignerDomain": "表示上の署名ドメインが、送信者のドメインと異なります。この違いだけでなりすましとは判断できません。",
    "senderAddress": "送信者アドレス",
    "senderName": "表示された送信者名",
    "senderDomain": "送信者ドメイン",
    "deliveryDomain": "送信経路／転送ドメイン",
    "signerDomain": "表示上の署名ドメイン",
    "senderClaimsNote": "送信者や認証の詳細は記載された情報であり、独自に検証したものではありません。見慣れたアドレスでも、リンクの安全性は確認できません。",
    "senderLinkWarning": "リンクを確認",
    "senderInfo": "送信者情報",
    "locateSender": "送信者の位置へ",
    "senderContext": "送信者とリンクの関連情報",
    "privacySenderChecks": "Gmail画面の送信者名・アドレスと、利用者が開いた詳細欄の送信元・署名元ドメインも、この端末内で比較します。"
  },
  "zh_CN": {
    "description": "在本设备上检查 Gmail 邮件内容和链接，提示潜在钓鱼风险。不会将邮件发送到服务器。",
    "active": "检查已启用",
    "paused": "检查已暂停",
    "enable": "启用本地检查",
    "options": "设置",
    "language": "语言",
    "auto": "浏览器语言",
    "showInfo": "同时显示补充信息",
    "save": "保存设置",
    "saved": "已保存",
    "privacy": "隐私",
    "coverage": "检查范围为扩展程序可读取的邮件正文和链接。不验证邮件认证、图片、二维码、附件或目标网页。没有警告不代表安全。",
    "scan": "本地邮件检查",
    "scanHelp": "粘贴邮件头或完整邮件，或选择 .eml 或 .txt 文件，即可使用与 Mail Guard 在 Gmail 中自动检查相同的规则进行分析。内容仅在您的设备上处理，不会向外发送或保存（最大 5 MB）。",
    "choose": "选择 .eml 或 .txt",
    "analyze": "检查邮件",
    "clear": "清除",
    "sample": "试用虚构示例",
    "error": "无法完成检查。请检查输入和大小限制。",
    "noGmail": "请打开 Gmail 检查邮件。",
    "noMessages": "请在 Gmail 中打开或展开邮件。若没有结果，请重新加载 Gmail。",
    "messages": "{n} 封已打开的邮件",
    "details": "查看详情",
    "close": "关闭",
    "cancel": "取消",
    "proceed": "打开此链接",
    "copy": "复制网址",
    "copied": "已复制",
    "confirm": "打开前请确认",
    "unsupported": "扩展程序无法打开此类链接。",
    "target": "点击目标",
    "candidate": "网址内的跳转候选（未访问）",
    "reason": "显示原因",
    "headers": "邮件头信息",
    "headerNote": "此功能不保证邮件发件人的真实身份。",
    "refresh": "刷新",
    "reset": "重置设置",
    "resetConfirm": "要重置设置吗？本地检查和补充信息将启用，显示语言将恢复为浏览器语言。",
    "input": "在此粘贴邮件或邮件头…",
    "NO_FINDINGS": "未发现风险迹象",
    "INFO": "补充信息",
    "CAUTION": "建议检查",
    "WARNING": "操作前请确认",
    "HIGH_RISK": "发现高风险特征",
    "reasonUgc": "此服务允许他人创建内容。",
    "reasonRedirect": "最终目标未经验证。网址内的目标仅为候选。",
    "reasonUnparsed": "无法完整解析此链接。",
    "reasonMismatch": "显示的网址与实际链接指向不同的域名。",
    "reasonUserinfo": "@ 前的文字不是真正的目标主机。",
    "reasonInvisible": "链接中含有不可见字符或文字方向控制字符。",
    "reasonAccount": "账户或安全操作指向了第三方内容。",
    "reasonSecret": "邮件要求通过不适当的目标提交密码或验证码。",
    "reasonSpoof": "账户相关请求使用了掩饰真实主机的链接。",
    "reasonLookalike": "涉及敏感操作的链接主机与已知品牌相似。",
    "reasonUnknown": "目标与所请求账户操作之间的关系未知。",
    "reasonAmbiguous": "无法可靠地关联请求与链接。",
    "reasonScheme": "不支持此类链接。扩展不会执行跳转。",
    "reasonForward": "邮件头包含可能经过转发的迹象。仅凭转发不能判定有危险。",
    "reasonReply": "回复地址与发件人地址的域名不同。仅凭这一差异不能判定有危险。",
    "name": "Mail Guard",
    "partial": "仅检查了部分输入。由于大小、格式或解析限制，部分内容未经检查。",
    "unavailable": "没有可读取的邮件正文。仍可能显示邮件头信息。",
    "settingsHelp": "在这里选择界面语言，以及扩展在 Gmail 中显示哪些提示。",
    "languageHelp": "更改扩展界面的显示语言。",
    "enableHelp": "自动检查您在 Gmail 中打开的邮件。关闭后将暂停页面内警告。",
    "showInfoHelp": "关闭时，可通过小按钮查看补充信息。警告和检查不完整的提示仍会显示。",
    "shownHost": "显示的网址",
    "actualHost": "实际链接目标的主机名",
    "apparentTarget": "@ 前的文本",
    "suspiciousChars": "可疑字符",
    "requestedAction": "请求的操作",
    "destinationHost": "目标地址",
    "destinationType": "目标类型",
    "candidateHost": "可能的目标",
    "thirdPartyContent": "第三方内容",
    "actionSecret": "输入密码或验证码",
    "actionAccount": "账户或登录操作",
    "actionShared": "打开共享内容",
    "actionOpen": "打开链接",
    "unknown": "检查不完整",
    "occurrences": "{n} 处",
    "context": "附近文本",
    "linkText": "链接文本",
    "otherFindings": "其他 {n} 项提示",
    "linkInput": "无法解析的链接",
    "privacyChecks": "在本设备上检查您在 Gmail 中打开邮件的可见正文和链接，以及您粘贴的邮件或选择的 .eml／.txt 文件内容。",
    "privacyExclusions": "不验证图片、二维码、附件或链接目标网页。",
    "privacyStorage": "扩展程序不会将邮件内容发送到设备外部，也不会保存邮件内容。仅保存设置。",
    "privacyDisclaimer": "没有警告并不保证邮件安全，也不保证发件人的真实身份。",
    "linkCount": "{n} 个链接",
    "groupLinkCount": "{groups} 组 · {links} 个链接",
    "locateLink": "跳转到对应位置",
    "linkChanged": "链接已更改，正在重新检查",
    "warningMarker": "请检查",
    "locateWarning": "跳转到对应位置",
    "copyUnavailable": "无法复制",
    "markerTarget": "链接目标",
    "showFullUrl": "显示完整网址",
    "hideFullUrl": "隐藏完整网址",
    "scanning": "正在检查邮件…",
    "sampleSubject": "虚构测试邮件，并非真实邮件",
    "sampleBody": "请输入您的 Google 密码：",
    "settingsError": "无法读取或保存设置。请重试。",
    "fileNone": "未选择文件",
    "fileSelected": "已选择文件：{name}",
    "reasonCount": "{n} 个注意事项",
    "groupReasonCount": "{groups} 个链接 · {reasons} 个注意事项",
    "reasonSenderName": "显示的发件人名称或地址与发件人地址的域名不一致。仅凭这一点无法判定是否存在冒充。",
    "reasonDeliveryDomain": "发送或转发域名与发件人域名不同。正常转发也可能出现这种情况。",
    "reasonSignerDomain": "所显示的签名域名与发件人域名不同。仅凭这一点无法判定是否存在冒充。",
    "senderAddress": "发件人地址",
    "senderName": "显示的发件人名称",
    "senderDomain": "发件人域名",
    "deliveryDomain": "发送／转发域名",
    "signerDomain": "所显示的签名域名",
    "senderClaimsNote": "发件人和身份验证详情来自所提供的信息，未经独立验证。熟悉的地址并不能证明链接安全。",
    "senderLinkWarning": "检查链接",
    "senderInfo": "发件人信息",
    "locateSender": "跳转到发件人",
    "senderContext": "发件人和链接相关信息",
    "privacySenderChecks": "还会在此设备上比较 Gmail 显示的发件人名称／地址，以及您打开的详情中的发送／签名域名。"
  },
  "es": {
    "description": "Alertas locales de suplantación de identidad en Gmail. Revisa texto y enlaces sin enviar tus correos a un servidor.",
    "active": "Revisión activada",
    "paused": "Revisión en pausa",
    "enable": "Activar revisión local",
    "options": "Ajustes",
    "language": "Idioma",
    "auto": "Idioma del navegador",
    "showInfo": "Mostrar también información adicional",
    "save": "Guardar ajustes",
    "saved": "Guardado",
    "privacy": "Privacidad",
    "coverage": "Se revisan el texto y los enlaces del correo que la extensión puede leer. No se verifican la autenticación del correo, las imágenes, los códigos QR, los adjuntos ni las páginas de destino. La ausencia de advertencias no garantiza la seguridad.",
    "scan": "Revisión local de correo",
    "scanHelp": "Pega las cabeceras o un correo completo, o elige un archivo .eml o .txt, para analizarlo con las mismas reglas que las comprobaciones automáticas de Mail Guard en Gmail. El contenido se procesa solo en tu dispositivo y no se envía fuera ni se guarda (hasta 5 MB).",
    "choose": "Elegir .eml o .txt",
    "analyze": "Revisar correo",
    "clear": "Borrar",
    "sample": "Probar un ejemplo ficticio",
    "error": "No se pudo completar la revisión. Comprueba la entrada y el límite de tamaño.",
    "noGmail": "Abre Gmail para revisar correos.",
    "noMessages": "Abre o despliega un correo en Gmail. Si no aparece un resultado, recarga Gmail.",
    "messages": "Correos abiertos: {n}",
    "details": "Ver detalles",
    "close": "Cerrar",
    "cancel": "Cancelar",
    "proceed": "Abrir este enlace",
    "copy": "Copiar URL",
    "copied": "Copiado",
    "confirm": "Revisa antes de abrir",
    "unsupported": "La extensión no puede abrir este tipo de enlace.",
    "target": "Destino del clic",
    "candidate": "Posible destino incluido en la URL — no visitado",
    "reason": "Motivo del aviso",
    "headers": "Información de cabeceras",
    "headerNote": "Esta función no garantiza que el remitente del correo sea auténtico.",
    "refresh": "Actualizar",
    "reset": "Restablecer ajustes",
    "resetConfirm": "¿Restablecer los ajustes? Se activarán la revisión local y la información adicional, y se usará el idioma del navegador.",
    "input": "Pega aquí el correo o las cabeceras…",
    "NO_FINDINGS": "No se encontraron indicios",
    "INFO": "Información adicional",
    "CAUTION": "Se recomienda revisar",
    "WARNING": "Revisa antes de actuar",
    "HIGH_RISK": "Indicadores de alto riesgo",
    "reasonUgc": "Este servicio puede alojar contenido creado por otras personas.",
    "reasonRedirect": "El destino final no está verificado. Una URL incluida es solo un posible destino.",
    "reasonUnparsed": "No se pudo analizar completamente este enlace.",
    "reasonMismatch": "La URL mostrada y el enlace real apuntan a dominios distintos.",
    "reasonUserinfo": "El texto antes de @ no es el servidor de destino.",
    "reasonInvisible": "El enlace contiene caracteres invisibles o de dirección de texto.",
    "reasonAccount": "Una acción de cuenta o seguridad apunta a contenido de terceros.",
    "reasonSecret": "El mensaje pide una contraseña o código a través de un destino inadecuado.",
    "reasonSpoof": "Una solicitud relacionada con una cuenta usa un enlace que oculta su servidor de destino real.",
    "reasonLookalike": "El servidor de destino se parece a una marca conocida en una solicitud que implica información sensible.",
    "reasonUnknown": "Se desconoce la relación entre el destino y la acción de cuenta solicitada.",
    "reasonAmbiguous": "No se puede vincular con certeza la solicitud al enlace.",
    "reasonScheme": "Tipo de enlace no compatible. La extensión no abre este enlace.",
    "reasonForward": "Las cabeceras contienen indicios de reenvío. El reenvío por sí solo no indica peligro.",
    "reasonReply": "Los dominios de respuesta y del remitente son distintos. Esta diferencia por sí sola no indica peligro.",
    "name": "Mail Guard",
    "partial": "Solo se pudo revisar parte del contenido debido a límites de tamaño, formato o análisis.",
    "unavailable": "No hay un cuerpo de mensaje legible. Puede haber información de cabeceras.",
    "settingsHelp": "Elige el idioma y qué información muestra la extensión al revisar Gmail.",
    "languageHelp": "Cambia el idioma de la interfaz de la extensión.",
    "enableHelp": "Analiza automáticamente los mensajes que abras en Gmail. Desactívalo para pausar los avisos en la página.",
    "showInfoHelp": "Si se desactiva, la información adicional se puede consultar desde un botón pequeño. Los avisos y las notificaciones de revisiones incompletas siguen visibles.",
    "shownHost": "URL mostrada",
    "actualHost": "Servidor de destino real",
    "apparentTarget": "Texto antes de @",
    "suspiciousChars": "Caracteres sospechosos",
    "requestedAction": "Acción solicitada",
    "destinationHost": "Destino",
    "destinationType": "Tipo de destino",
    "candidateHost": "Posible destino",
    "thirdPartyContent": "contenido de terceros",
    "actionSecret": "Introducir contraseña o código de verificación",
    "actionAccount": "Acción de cuenta o inicio de sesión",
    "actionShared": "Abrir contenido compartido",
    "actionOpen": "Abrir enlace",
    "unknown": "Revisión incompleta",
    "occurrences": "Apariciones: {n}",
    "context": "Texto cercano",
    "linkText": "Texto del enlace",
    "otherFindings": "Otros indicios: {n}",
    "linkInput": "Enlace sin analizar",
    "privacyChecks": "Revisa en este dispositivo el texto visible y los enlaces de los correos que abres en Gmail, además del correo que pegues o selecciones en archivos .eml o .txt.",
    "privacyExclusions": "No verifica imágenes, códigos QR, archivos adjuntos ni páginas de destino.",
    "privacyStorage": "La extensión no envía el contenido del correo fuera de este dispositivo ni lo guarda. Solo guarda los ajustes.",
    "privacyDisclaimer": "La ausencia de advertencias no garantiza la seguridad ni la autenticidad del remitente.",
    "linkCount": "Enlaces: {n}",
    "groupLinkCount": "Grupos: {groups} · enlaces: {links}",
    "locateLink": "Ir a la ubicación",
    "linkChanged": "El enlace cambió; revisando",
    "warningMarker": "Revisar",
    "locateWarning": "Ir a la ubicación",
    "copyUnavailable": "No se pudo copiar",
    "markerTarget": "Destino del enlace",
    "showFullUrl": "Mostrar URL completa",
    "hideFullUrl": "Ocultar URL completa",
    "scanning": "Revisando el correo…",
    "sampleSubject": "Mensaje de prueba ficticio; no es un correo real",
    "sampleBody": "Introduce tu contraseña de Google:",
    "settingsError": "No se pudieron leer o guardar los ajustes. Inténtalo de nuevo.",
    "fileNone": "Ningún archivo seleccionado",
    "fileSelected": "Archivo seleccionado: {name}",
    "reasonCount": "Motivos: {n}",
    "groupReasonCount": "Enlaces: {groups} · motivos: {reasons}",
    "reasonSenderName": "El nombre o la dirección que se muestran no coinciden con el dominio de la dirección del remitente. Esto por sí solo no demuestra una suplantación.",
    "reasonDeliveryDomain": "El dominio de envío o reenvío difiere del dominio del remitente. Un reenvío legítimo puede explicar esta diferencia.",
    "reasonSignerDomain": "El dominio de firma indicado difiere del dominio del remitente. Esto por sí solo no demuestra una suplantación.",
    "senderAddress": "Dirección del remitente",
    "senderName": "Nombre mostrado del remitente",
    "senderDomain": "Dominio del remitente",
    "deliveryDomain": "Dominio de envío / reenvío",
    "signerDomain": "Dominio de firma indicado",
    "senderClaimsNote": "Los datos del remitente y de autenticación son información indicada, sin verificación independiente. Una dirección conocida no verifica el enlace.",
    "senderLinkWarning": "Revisar enlaces",
    "senderInfo": "Información del remitente",
    "locateSender": "Ir al remitente",
    "senderContext": "Contexto del remitente y los enlaces",
    "privacySenderChecks": "También compara localmente, en este dispositivo, el nombre y la dirección mostrados del remitente con los dominios de envío y firma de los detalles que abres en Gmail."
  },
  "ar": {
    "description": "تحذيرات تصيد محلية لـ Gmail. فحص نص الرسالة وروابطها دون إرسال بريدك إلى خادم.",
    "active": "الفحص مفعّل",
    "paused": "الفحص متوقف مؤقتًا",
    "enable": "تفعيل الفحص على الجهاز",
    "options": "الإعدادات",
    "language": "اللغة",
    "auto": "لغة المتصفح",
    "showInfo": "عرض المعلومات الإضافية أيضًا",
    "save": "حفظ الإعدادات",
    "saved": "تم الحفظ",
    "privacy": "الخصوصية",
    "coverage": "يشمل الفحص نص الرسالة وروابطها التي تستطيع الإضافة قراءتها. لا يتم التحقق من مصادقة البريد أو الصور أو رموز QR أو المرفقات أو صفحات الوجهة. غياب التحذير لا يضمن الأمان.",
    "scan": "فحص رسالة محليًا",
    "scanHelp": "الصق رؤوس البريد الإلكتروني أو الرسالة كاملة، أو اختر ملف ‎.eml أو ‎.txt لتحليله باستخدام القواعد نفسها التي يستخدمها Mail Guard للفحص التلقائي في Gmail. يُعالَج المحتوى على جهازك فقط، ولا يُرسَل إلى أي جهة خارجية ولا يُحفَظ (بحد أقصى 5 MB).",
    "choose": "اختر ‎.eml أو ‎.txt",
    "analyze": "فحص الرسالة",
    "clear": "مسح",
    "sample": "تجربة مثال خيالي",
    "error": "تعذر إكمال الفحص. تحقق من المدخلات وحد الحجم.",
    "noGmail": "افتح Gmail لفحص الرسائل.",
    "noMessages": "افتح رسالة في Gmail أو وسّعها. إن لم تظهر نتيجة، أعد تحميل Gmail.",
    "messages": "الرسائل المفتوحة: {n}",
    "details": "عرض التفاصيل",
    "close": "إغلاق",
    "cancel": "إلغاء",
    "proceed": "فتح هذا الرابط",
    "copy": "نسخ الرابط",
    "copied": "تم النسخ",
    "confirm": "تحقق قبل الفتح",
    "unsupported": "لا يمكن للإضافة فتح هذا النوع من الروابط.",
    "target": "وجهة النقر",
    "candidate": "وجهة محتملة داخل الرابط — لم تتم زيارتها",
    "reason": "سبب العرض",
    "headers": "معلومات رؤوس الرسالة",
    "headerNote": "لا تضمن هذه الميزة أن مرسل البريد الإلكتروني هو الشخص أو الجهة التي يدّعيها.",
    "refresh": "تحديث",
    "reset": "إعادة ضبط الإعدادات",
    "resetConfirm": "هل تريد إعادة ضبط الإعدادات؟ سيتم تفعيل الفحص على الجهاز والمعلومات الإضافية، وستتبع لغة العرض لغة المتصفح.",
    "input": "الصق الرسالة أو رؤوسها هنا…",
    "NO_FINDINGS": "لم يتم العثور على مؤشرات",
    "INFO": "معلومات إضافية",
    "CAUTION": "يُنصح بالمراجعة",
    "WARNING": "تحقق قبل المتابعة",
    "HIGH_RISK": "مؤشرات عالية الخطورة",
    "reasonUgc": "تتيح هذه الخدمة محتوى ينشئه أشخاص آخرون.",
    "reasonRedirect": "لم يتم التحقق من الوجهة النهائية. الرابط المضمّن مجرد وجهة محتملة.",
    "reasonUnparsed": "تعذر تحليل هذا الرابط بالكامل.",
    "reasonMismatch": "يشير العنوان المعروض والرابط الفعلي إلى نطاقين مختلفين.",
    "reasonUserinfo": "النص الذي يسبق @ ليس مضيف الوجهة.",
    "reasonInvisible": "يحتوي الرابط على محارف خفية أو محارف لتغيير اتجاه النص.",
    "reasonAccount": "إجراء يتعلق بالحساب أو الأمان يؤدي إلى محتوى لطرف ثالث.",
    "reasonSecret": "تطلب الرسالة كلمة مرور أو رمزًا عبر وجهة غير مناسبة.",
    "reasonSpoof": "طلب متعلق بالحساب يستخدم رابطًا يخفي مضيفه الحقيقي.",
    "reasonLookalike": "يستخدم طلب يتضمن معلومات حساسة مضيفًا يشبه اسمه علامة تجارية معروفة.",
    "reasonUnknown": "العلاقة بين الوجهة وإجراء الحساب المطلوب غير معروفة.",
    "reasonAmbiguous": "لا يمكن ربط الطلب بالرابط بثقة.",
    "reasonScheme": "نوع رابط غير مدعوم. لن تفتح الإضافة هذا الرابط.",
    "reasonForward": "تحتوي رؤوس الرسالة على علامات تشير إلى إعادة توجيهها. إعادة التوجيه وحدها لا تدل على خطر.",
    "reasonReply": "يختلف نطاق عنوان الرد عن نطاق المرسل. هذا الاختلاف وحده لا يدل على خطر.",
    "name": "Mail Guard",
    "partial": "تم فحص جزء فقط من المحتوى بسبب قيود الحجم أو التنسيق أو التحليل.",
    "unavailable": "لا يوجد نص رسالة قابل للقراءة. قد تتوفر معلومات الرؤوس.",
    "settingsHelp": "اختر لغة العرض وما الذي تعرضه الإضافة أثناء فحص Gmail.",
    "languageHelp": "يغيّر لغة واجهة الإضافة.",
    "enableHelp": "يفحص الرسائل التي تفتحها في Gmail تلقائيًا. أوقفه لإيقاف التنبيهات داخل الصفحة مؤقتًا.",
    "showInfoHelp": "عند التعطيل، يمكن عرض المعلومات الإضافية من زر صغير. تظل التحذيرات وإشعارات الفحص غير المكتمل ظاهرة.",
    "shownHost": "عنوان الرابط المعروض",
    "actualHost": "مضيف الرابط الفعلي",
    "apparentTarget": "النص قبل @",
    "suspiciousChars": "أحرف مريبة",
    "requestedAction": "الإجراء المطلوب",
    "destinationHost": "الوجهة",
    "destinationType": "نوع الوجهة",
    "candidateHost": "وجهة محتملة",
    "thirdPartyContent": "محتوى تابع لجهة خارجية",
    "actionSecret": "إدخال كلمة مرور أو رمز تحقق",
    "actionAccount": "إجراء متعلق بالحساب أو تسجيل الدخول",
    "actionShared": "فتح محتوى مشترك",
    "actionOpen": "فتح الرابط",
    "unknown": "فحص غير مكتمل",
    "occurrences": "عدد المواضع: {n}",
    "context": "النص المحيط",
    "linkText": "نص الرابط",
    "otherFindings": "ملاحظات أخرى: {n}",
    "linkInput": "الرابط غير المحلل",
    "privacyChecks": "يفحص على هذا الجهاز النص الظاهر والروابط في الرسائل التي تفتحها في Gmail، ومحتوى البريد الذي تلصقه أو تختاره من ملفات ‎.eml أو ‎.txt.",
    "privacyExclusions": "لا يتحقق من الصور أو رموز QR أو المرفقات أو صفحات الوجهة.",
    "privacyStorage": "لا ترسل الإضافة محتوى البريد خارج هذا الجهاز ولا تحفظه. تحفظ الإعدادات فقط.",
    "privacyDisclaimer": "غياب التحذير لا يضمن الأمان أو صحة هوية المرسل.",
    "linkCount": "عدد الروابط: {n}",
    "groupLinkCount": "المجموعات: {groups} · الروابط: {links}",
    "locateLink": "الانتقال إلى الموضع",
    "linkChanged": "تغير الرابط؛ جارٍ الفحص",
    "warningMarker": "تحقق",
    "locateWarning": "الانتقال إلى الموضع",
    "copyUnavailable": "النسخ غير متاح",
    "markerTarget": "وجهة الرابط",
    "showFullUrl": "عرض الرابط الكامل",
    "hideFullUrl": "إخفاء الرابط الكامل",
    "scanning": "جارٍ فحص الرسالة…",
    "sampleSubject": "رسالة اختبار خيالية؛ ليست رسالة بريد حقيقية",
    "sampleBody": "أدخل كلمة المرور لحسابك في Google:",
    "settingsError": "تعذرت قراءة الإعدادات أو حفظها. حاول مرة أخرى.",
    "fileNone": "لم يتم اختيار ملف",
    "fileSelected": "الملف المحدد: {name}",
    "reasonCount": "الأسباب: {n}",
    "groupReasonCount": "الروابط: {groups} · الأسباب: {reasons}",
    "reasonSenderName": "لا يتطابق اسم المرسل أو عنوانه المعروض مع نطاق عنوان المرسل. هذا وحده لا يثبت انتحال الهوية.",
    "reasonDeliveryDomain": "يختلف نطاق الإرسال أو إعادة التوجيه عن نطاق المرسل. قد يكون السبب إعادة توجيه مشروعة.",
    "reasonSignerDomain": "يختلف نطاق التوقيع المذكور عن نطاق المرسل. هذا وحده لا يثبت انتحال الهوية.",
    "senderAddress": "عنوان المرسل",
    "senderName": "اسم المرسل المعروض",
    "senderDomain": "نطاق المرسل",
    "deliveryDomain": "نطاق الإرسال / إعادة التوجيه",
    "signerDomain": "نطاق التوقيع المذكور",
    "senderClaimsNote": "تفاصيل المرسل والمصادقة هي معلومات مذكورة لم يتم التحقق منها بشكل مستقل. العنوان المألوف لا يثبت سلامة الرابط.",
    "senderLinkWarning": "تحقق من الروابط",
    "senderInfo": "معلومات المرسل",
    "locateSender": "الانتقال إلى المرسل",
    "senderContext": "سياق المرسل والروابط",
    "privacySenderChecks": "يقارن أيضًا على هذا الجهاز اسم المرسل وعنوانه المعروضين بنطاقات الإرسال والتوقيع الواردة في تفاصيل Gmail التي تفتحها."
  },
  "pt_BR": {
    "description": "Alertas locais de phishing no Gmail. Verifique o texto e os links sem enviar seus e-mails a um servidor.",
    "active": "Verificação ativada",
    "paused": "Verificação pausada",
    "enable": "Ativar verificação local",
    "options": "Configurações",
    "language": "Idioma",
    "auto": "Idioma do navegador",
    "showInfo": "Mostrar também informações adicionais",
    "save": "Salvar configurações",
    "saved": "Salvo",
    "privacy": "Privacidade",
    "coverage": "A verificação abrange o texto e os links do e-mail que a extensão pode ler. Autenticação do e-mail, imagens, códigos QR, anexos e páginas de destino não são verificados. A ausência de avisos não garante segurança.",
    "scan": "Verificação local de e-mail",
    "scanHelp": "Cole os cabeçalhos ou um e-mail completo, ou escolha um arquivo .eml ou .txt, para analisá-lo com as mesmas regras das verificações automáticas do Mail Guard no Gmail. O conteúdo é processado apenas no seu dispositivo, sem ser enviado para fora ou salvo (até 5 MB).",
    "choose": "Escolher .eml ou .txt",
    "analyze": "Verificar e-mail",
    "clear": "Limpar",
    "sample": "Testar um exemplo fictício",
    "error": "Não foi possível concluir a verificação. Confira a entrada e o limite de tamanho.",
    "noGmail": "Abra o Gmail para verificar e-mails.",
    "noMessages": "Abra ou expanda uma mensagem no Gmail. Se nenhum resultado aparecer, recarregue o Gmail.",
    "messages": "Mensagens abertas: {n}",
    "details": "Ver detalhes",
    "close": "Fechar",
    "cancel": "Cancelar",
    "proceed": "Abrir este link",
    "copy": "Copiar URL",
    "copied": "Copiado",
    "confirm": "Verifique antes de abrir",
    "unsupported": "A extensão não pode abrir este tipo de link.",
    "target": "Destino do clique",
    "candidate": "Possível destino incluído na URL — não visitado",
    "reason": "Motivo do aviso",
    "headers": "Informações dos cabeçalhos",
    "headerNote": "Este recurso não garante que o remetente do e-mail seja autêntico.",
    "refresh": "Atualizar",
    "reset": "Redefinir configurações",
    "resetConfirm": "Redefinir as configurações? A verificação local e as informações adicionais serão ativadas, e o idioma seguirá o do navegador.",
    "input": "Cole a mensagem ou os cabeçalhos aqui…",
    "NO_FINDINGS": "Nenhum indício encontrado",
    "INFO": "Informações adicionais",
    "CAUTION": "Revisão recomendada",
    "WARNING": "Verifique antes de agir",
    "HIGH_RISK": "Indicadores de alto risco",
    "reasonUgc": "Este serviço pode hospedar conteúdo criado por outras pessoas.",
    "reasonRedirect": "O destino final não foi verificado. Uma URL incluída é apenas uma possibilidade.",
    "reasonUnparsed": "Não foi possível analisar completamente este link.",
    "reasonMismatch": "A URL exibida e o link real apontam para domínios diferentes.",
    "reasonUserinfo": "O texto antes de @ não é o host de destino.",
    "reasonInvisible": "O link contém caracteres invisíveis ou de direção de texto.",
    "reasonAccount": "Uma ação de conta ou segurança aponta para conteúdo de terceiros.",
    "reasonSecret": "A mensagem pede que você envie uma senha ou um código a um destino inadequado.",
    "reasonSpoof": "Uma solicitação sobre a conta usa um link que disfarça o host real.",
    "reasonLookalike": "O host se parece com uma marca conhecida em uma solicitação sensível.",
    "reasonUnknown": "A relação entre o destino e a ação de conta solicitada é desconhecida.",
    "reasonAmbiguous": "Não é possível vincular a solicitação ao link com confiança.",
    "reasonScheme": "Tipo de link não compatível. A extensão não abre este link.",
    "reasonForward": "Os cabeçalhos contêm indícios de encaminhamento. O encaminhamento, por si só, não indica perigo.",
    "reasonReply": "Os domínios do endereço de resposta e do remetente são diferentes. Essa diferença, por si só, não indica perigo.",
    "name": "Mail Guard",
    "partial": "Apenas parte do conteúdo foi verificada devido a limites de tamanho, formato ou análise.",
    "unavailable": "Não há corpo de mensagem legível. Informações dos cabeçalhos podem estar disponíveis.",
    "settingsHelp": "Escolha o idioma e o que a extensão mostra ao verificar o Gmail.",
    "languageHelp": "Altera o idioma usado na interface da extensão.",
    "enableHelp": "Verifica automaticamente as mensagens abertas no Gmail. Desative para pausar os avisos na página.",
    "showInfoHelp": "Quando desativado, as informações adicionais ficam disponíveis em um botão pequeno. Avisos e notificações de verificações incompletas continuam visíveis.",
    "shownHost": "URL exibida",
    "actualHost": "Host do link real",
    "apparentTarget": "Texto antes de @",
    "suspiciousChars": "Caracteres suspeitos",
    "requestedAction": "Ação solicitada",
    "destinationHost": "Destino",
    "destinationType": "Tipo de destino",
    "candidateHost": "Possível destino",
    "thirdPartyContent": "conteúdo de terceiros",
    "actionSecret": "Inserir senha ou código de verificação",
    "actionAccount": "Ação de conta ou login",
    "actionShared": "Abrir conteúdo compartilhado",
    "actionOpen": "Abrir link",
    "unknown": "Verificação incompleta",
    "occurrences": "Ocorrências: {n}",
    "context": "Texto próximo",
    "linkText": "Texto do link",
    "otherFindings": "Outros indícios: {n}",
    "linkInput": "Link não analisado",
    "privacyChecks": "Verifica neste dispositivo o texto visível e os links dos e-mails abertos no Gmail, além do conteúdo de e-mail que você cola ou seleciona em arquivos .eml ou .txt.",
    "privacyExclusions": "Não verifica imagens, códigos QR, anexos nem páginas de destino.",
    "privacyStorage": "A extensão não envia o conteúdo dos e-mails para fora deste dispositivo nem o salva. Apenas as configurações são salvas.",
    "privacyDisclaimer": "A ausência de avisos não garante a segurança nem a autenticidade do remetente.",
    "linkCount": "Links: {n}",
    "groupLinkCount": "Grupos: {groups} · links: {links}",
    "locateLink": "Ir ao local",
    "linkChanged": "O link mudou; verificando",
    "warningMarker": "Verificar",
    "locateWarning": "Ir ao local",
    "copyUnavailable": "Não foi possível copiar",
    "markerTarget": "Destino do link",
    "showFullUrl": "Mostrar URL completa",
    "hideFullUrl": "Ocultar URL completa",
    "scanning": "Verificando o e-mail…",
    "sampleSubject": "Mensagem de teste fictícia; não é um e-mail real",
    "sampleBody": "Digite sua senha do Google:",
    "settingsError": "Não foi possível ler ou salvar as configurações. Tente novamente.",
    "fileNone": "Nenhum arquivo selecionado",
    "fileSelected": "Arquivo selecionado: {name}",
    "reasonCount": "Motivos: {n}",
    "groupReasonCount": "Links: {groups} · motivos: {reasons}",
    "reasonSenderName": "O nome ou endereço exibido do remetente não corresponde ao domínio do endereço do remetente. Isso, por si só, não comprova falsificação de identidade.",
    "reasonDeliveryDomain": "O domínio de envio ou encaminhamento difere do domínio do remetente. Um encaminhamento legítimo pode explicar essa diferença.",
    "reasonSignerDomain": "O domínio de assinatura informado difere do domínio do remetente. Isso, por si só, não comprova falsificação de identidade.",
    "senderAddress": "Endereço do remetente",
    "senderName": "Nome exibido do remetente",
    "senderDomain": "Domínio do remetente",
    "deliveryDomain": "Domínio de envio / encaminhamento",
    "signerDomain": "Domínio de assinatura informado",
    "senderClaimsNote": "Os detalhes do remetente e da autenticação são informações declaradas, sem verificação independente. Um endereço conhecido não comprova a segurança do link.",
    "senderLinkWarning": "Verificar links",
    "senderInfo": "Informações do remetente",
    "locateSender": "Ir ao remetente",
    "senderContext": "Contexto do remetente e dos links",
    "privacySenderChecks": "Também compara, localmente neste dispositivo, o nome e o endereço exibidos do remetente com os domínios de envio e assinatura dos detalhes que você abre no Gmail."
  },
  "fr": {
    "description": "Alertes de hameçonnage locales pour Gmail. Vérifiez le texte et les liens sans envoyer vos e-mails à un serveur.",
    "active": "Vérification activée",
    "paused": "Vérification en pause",
    "enable": "Activer la vérification locale",
    "options": "Paramètres",
    "language": "Langue",
    "auto": "Langue du navigateur",
    "showInfo": "Afficher aussi les informations complémentaires",
    "save": "Enregistrer les paramètres",
    "saved": "Enregistré",
    "privacy": "Confidentialité",
    "coverage": "La vérification porte sur le texte et les liens du message que l’extension peut lire. L’authentification des e-mails, les images, les codes QR, les pièces jointes et les pages de destination ne sont pas vérifiés. L’absence d’avertissement ne garantit pas la sécurité.",
    "scan": "Vérification locale des e-mails",
    "scanHelp": "Collez les en-têtes ou un e-mail complet, ou choisissez un fichier .eml ou .txt, pour l’analyser selon les mêmes règles que les vérifications automatiques de Mail Guard dans Gmail. Le contenu est traité uniquement sur votre appareil, sans être envoyé ailleurs ni enregistré (5 MB maximum).",
    "choose": "Choisir .eml ou .txt",
    "analyze": "Vérifier le message",
    "clear": "Effacer",
    "sample": "Essayer un exemple fictif",
    "error": "La vérification a échoué. Vérifiez le contenu saisi et la taille limite.",
    "noGmail": "Ouvrez Gmail pour vérifier les messages.",
    "noMessages": "Ouvrez ou développez un message dans Gmail. Si aucun résultat n’apparaît, rechargez Gmail.",
    "messages": "Messages ouverts : {n}",
    "details": "Voir les détails",
    "close": "Fermer",
    "cancel": "Annuler",
    "proceed": "Ouvrir ce lien",
    "copy": "Copier l’URL",
    "copied": "Copié",
    "confirm": "Vérifiez avant d’ouvrir",
    "unsupported": "L’extension ne peut pas ouvrir ce type de lien.",
    "target": "Destination du clic",
    "candidate": "Destination possible intégrée à l’URL — non visitée",
    "reason": "Motif de l’affichage",
    "headers": "Informations des en-têtes",
    "headerNote": "Cette fonction ne garantit pas que l’expéditeur de l’e-mail est authentique.",
    "refresh": "Actualiser",
    "reset": "Réinitialiser les paramètres",
    "resetConfirm": "Réinitialiser les paramètres ? La vérification locale et les informations complémentaires seront activées, et la langue utilisée sera celle du navigateur.",
    "input": "Collez le message ou les en-têtes ici…",
    "NO_FINDINGS": "Aucun indice détecté",
    "INFO": "Informations complémentaires",
    "CAUTION": "Vérification recommandée",
    "WARNING": "Vérifiez avant d’agir",
    "HIGH_RISK": "Indicateurs de risque élevé",
    "reasonUgc": "Ce service peut héberger du contenu créé par des tiers.",
    "reasonRedirect": "La destination finale n’est pas vérifiée. Une URL intégrée n’est qu’une destination possible.",
    "reasonUnparsed": "Ce lien n’a pas pu être entièrement analysé.",
    "reasonMismatch": "L’URL affichée et le lien réel pointent vers des domaines différents.",
    "reasonUserinfo": "Le texte avant @ n’est pas l’hôte de destination.",
    "reasonInvisible": "Ce lien contient des caractères invisibles ou de direction du texte.",
    "reasonAccount": "Une action de compte ou de sécurité mène vers du contenu tiers.",
    "reasonSecret": "Le message demande un mot de passe ou un code via une destination inadaptée.",
    "reasonSpoof": "Une demande liée au compte utilise un lien qui masque son hôte réel.",
    "reasonLookalike": "Cet hôte ressemble à une marque connue dans une demande sensible.",
    "reasonUnknown": "Le lien entre cette destination et l’action demandée sur le compte est inconnu.",
    "reasonAmbiguous": "La demande et le lien ne peuvent pas être reliés avec certitude.",
    "reasonScheme": "Type de lien non pris en charge. L’extension n’ouvre pas ce lien.",
    "reasonForward": "Les en-têtes contiennent des indices de transfert du message. Un transfert ne constitue pas à lui seul un signe de danger.",
    "reasonReply": "Le domaine de l’adresse de réponse diffère de celui de l’expéditeur. Cette différence ne constitue pas à elle seule un signe de danger.",
    "name": "Mail Guard",
    "partial": "Seule une partie du contenu a été examinée en raison de limites de taille, de format ou d’analyse.",
    "unavailable": "Aucun corps de message lisible. Des informations d’en-tête peuvent être disponibles.",
    "settingsHelp": "Choisissez la langue et ce que l’extension affiche lors des vérifications Gmail.",
    "languageHelp": "Change la langue utilisée dans l’interface de l’extension.",
    "enableHelp": "Vérifie automatiquement les messages ouverts dans Gmail. Désactivez pour suspendre les avertissements dans la page.",
    "showInfoHelp": "Lorsque cette option est désactivée, les informations complémentaires sont accessibles depuis un petit bouton. Les avertissements et les avis de vérification incomplète restent visibles.",
    "shownHost": "URL affichée",
    "actualHost": "Hôte du lien réel",
    "apparentTarget": "Texte avant @",
    "suspiciousChars": "Caractères suspects",
    "requestedAction": "Action demandée",
    "destinationHost": "Destination",
    "destinationType": "Type de destination",
    "candidateHost": "Destination possible",
    "thirdPartyContent": "contenu tiers",
    "actionSecret": "Saisie d’un mot de passe ou d’un code de vérification",
    "actionAccount": "Action liée au compte ou à la connexion",
    "actionShared": "Ouvrir un contenu partagé",
    "actionOpen": "Ouvrir le lien",
    "unknown": "Vérification incomplète",
    "occurrences": "Occurrences : {n}",
    "context": "Texte voisin",
    "linkText": "Texte du lien",
    "otherFindings": "Autres indices : {n}",
    "linkInput": "Lien non analysé",
    "privacyChecks": "Vérifie sur cet appareil le texte visible et les liens des e-mails ouverts dans Gmail, ainsi que le contenu des e-mails que vous collez ou sélectionnez dans des fichiers .eml ou .txt.",
    "privacyExclusions": "Ne vérifie pas les images, les codes QR, les pièces jointes ni les pages de destination.",
    "privacyStorage": "L’extension ne transmet pas le contenu des e-mails hors de cet appareil et ne l’enregistre pas. Seuls les paramètres sont enregistrés.",
    "privacyDisclaimer": "L’absence d’avertissement ne garantit ni la sécurité ni l’authenticité de l’expéditeur.",
    "linkCount": "Liens : {n}",
    "groupLinkCount": "Groupes : {groups} · liens : {links}",
    "locateLink": "Aller à l’emplacement",
    "linkChanged": "Lien modifié ; nouvelle vérification",
    "warningMarker": "Vérifier",
    "locateWarning": "Aller à l’emplacement",
    "copyUnavailable": "Impossible de copier",
    "markerTarget": "Destination du lien",
    "showFullUrl": "Afficher l’URL complète",
    "hideFullUrl": "Masquer l’URL complète",
    "scanning": "Vérification du message…",
    "sampleSubject": "Message de test fictif ; ce n’est pas un véritable e-mail",
    "sampleBody": "Saisissez votre mot de passe Google :",
    "settingsError": "Impossible de lire ou d’enregistrer les paramètres. Réessayez.",
    "fileNone": "Aucun fichier sélectionné",
    "fileSelected": "Fichier sélectionné : {name}",
    "reasonCount": "Motifs : {n}",
    "groupReasonCount": "Liens : {groups} · motifs : {reasons}",
    "reasonSenderName": "Le nom ou l’adresse affichés ne correspondent pas au domaine de l’adresse de l’expéditeur. Cela ne suffit pas à établir une usurpation d’identité.",
    "reasonDeliveryDomain": "Le domaine d’envoi ou de transfert diffère de celui de l’expéditeur. Un transfert légitime peut expliquer cette différence.",
    "reasonSignerDomain": "Le domaine de signature indiqué diffère de celui de l’expéditeur. Cela ne suffit pas à établir une usurpation d’identité.",
    "senderAddress": "Adresse de l’expéditeur",
    "senderName": "Nom affiché de l’expéditeur",
    "senderDomain": "Domaine de l’expéditeur",
    "deliveryDomain": "Domaine d’envoi / de transfert",
    "signerDomain": "Domaine de signature indiqué",
    "senderClaimsNote": "Les détails sur l’expéditeur et l’authentification sont des informations déclarées, sans vérification indépendante. Une adresse familière ne garantit pas la sécurité du lien.",
    "senderLinkWarning": "Vérifier les liens",
    "senderInfo": "Informations sur l’expéditeur",
    "locateSender": "Aller à l’expéditeur",
    "senderContext": "Contexte de l’expéditeur et des liens",
    "privacySenderChecks": "Compare aussi, localement sur cet appareil, le nom et l’adresse affichés de l’expéditeur avec les domaines d’envoi et de signature figurant dans les détails que vous ouvrez dans Gmail."
  },
  "ru": {
    "description": "Локальные предупреждения о фишинге в Gmail. Проверка текста и ссылок без отправки писем на сервер.",
    "active": "Проверка включена",
    "paused": "Проверка приостановлена",
    "enable": "Включить локальную проверку",
    "options": "Настройки",
    "language": "Язык",
    "auto": "Язык браузера",
    "showInfo": "Показывать дополнительные сведения",
    "save": "Сохранить настройки",
    "saved": "Сохранено",
    "privacy": "Конфиденциальность",
    "coverage": "Проверяются текст и ссылки письма, доступные расширению. Аутентификация письма, изображения, QR-коды, вложения и страницы по ссылкам не проверяются. Отсутствие предупреждений не гарантирует безопасность.",
    "scan": "Локальная проверка письма",
    "scanHelp": "Вставьте заголовки или письмо целиком либо выберите файл .eml или .txt для анализа по тем же правилам, что и при автоматической проверке Mail Guard в Gmail. Содержимое обрабатывается только на вашем устройстве, никуда не отправляется и не сохраняется (до 5 MB).",
    "choose": "Выбрать .eml или .txt",
    "analyze": "Проверить письмо",
    "clear": "Очистить",
    "sample": "Попробовать вымышленный пример",
    "error": "Не удалось завершить проверку. Проверьте ввод и ограничение размера.",
    "noGmail": "Откройте Gmail для проверки писем.",
    "noMessages": "Откройте или разверните письмо в Gmail. Если результат не появился, перезагрузите Gmail.",
    "messages": "Открытых писем: {n}",
    "details": "Подробнее",
    "close": "Закрыть",
    "cancel": "Отмена",
    "proceed": "Открыть ссылку",
    "copy": "Копировать URL",
    "copied": "Скопировано",
    "confirm": "Проверьте перед открытием",
    "unsupported": "Расширение не может открыть ссылку этого типа.",
    "target": "Адрес перехода",
    "candidate": "Возможный адрес внутри URL — не посещён",
    "reason": "Причина предупреждения",
    "headers": "Сведения из заголовков",
    "headerNote": "Эта функция не гарантирует подлинность отправителя письма.",
    "refresh": "Обновить",
    "reset": "Сбросить настройки",
    "resetConfirm": "Сбросить настройки? Локальная проверка и дополнительные сведения будут включены, а язык интерфейса будет выбран по языку браузера.",
    "input": "Вставьте письмо или заголовки…",
    "NO_FINDINGS": "Признаков не обнаружено",
    "INFO": "Дополнительные сведения",
    "CAUTION": "Рекомендуется проверка",
    "WARNING": "Проверьте перед действием",
    "HIGH_RISK": "Признаки высокого риска",
    "reasonUgc": "Сервис может размещать контент других пользователей.",
    "reasonRedirect": "Конечный адрес не проверен. Вложенный URL — лишь возможное назначение.",
    "reasonUnparsed": "Не удалось полностью разобрать ссылку.",
    "reasonMismatch": "Показанный URL и фактическая ссылка ведут на разные домены.",
    "reasonUserinfo": "Текст перед @ не является хостом назначения.",
    "reasonInvisible": "Ссылка содержит невидимые символы или символы направления текста.",
    "reasonAccount": "Запрос действия с аккаунтом или его безопасностью ведёт к стороннему контенту.",
    "reasonSecret": "Сообщение просит отправить пароль или код через неподходящий адрес.",
    "reasonSpoof": "Запрос об аккаунте использует ссылку, скрывающую реальный хост.",
    "reasonLookalike": "В запросе, связанном с важными данными, используется хост, похожий на известный бренд.",
    "reasonUnknown": "Связь этого адреса с запрошенным действием в аккаунте неизвестна.",
    "reasonAmbiguous": "Запрос и ссылку нельзя уверенно связать.",
    "reasonScheme": "Неподдерживаемый тип ссылки. Расширение не открывает её.",
    "reasonForward": "В заголовках есть признаки пересылки. Пересылка сама по себе не указывает на опасность.",
    "reasonReply": "Домен адреса для ответа отличается от домена отправителя. Само по себе это различие не указывает на опасность.",
    "name": "Mail Guard",
    "partial": "Проверена только часть содержимого из-за ограничений размера, формата или анализа.",
    "unavailable": "Нет читаемого текста письма. Сведения о заголовках могут быть доступны.",
    "settingsHelp": "Выберите язык интерфейса и то, какие уведомления расширение показывает в Gmail.",
    "languageHelp": "Меняет язык интерфейса расширения.",
    "enableHelp": "Автоматически проверяет сообщения, которые вы открываете в Gmail. Отключите, чтобы приостановить предупреждения на странице.",
    "showInfoHelp": "Если отключить, дополнительные сведения будут доступны через небольшую кнопку. Предупреждения и уведомления о неполной проверке останутся видимыми.",
    "shownHost": "Показанный адрес",
    "actualHost": "Хост фактической ссылки",
    "apparentTarget": "Текст до @",
    "suspiciousChars": "Подозрительные символы",
    "requestedAction": "Запрашиваемое действие",
    "destinationHost": "Адрес назначения",
    "destinationType": "Тип назначения",
    "candidateHost": "Возможный адрес назначения",
    "thirdPartyContent": "сторонний контент",
    "actionSecret": "Ввод пароля или кода подтверждения",
    "actionAccount": "Действие с аккаунтом или вход в него",
    "actionShared": "Открыть материалы с общим доступом",
    "actionOpen": "Открыть ссылку",
    "unknown": "Проверка неполная",
    "occurrences": "Вхождений: {n}",
    "context": "Текст рядом",
    "linkText": "Текст ссылки",
    "otherFindings": "Другие признаки: {n}",
    "linkInput": "Неразобранная ссылка",
    "privacyChecks": "Проверяет на этом устройстве видимый текст и ссылки открытых в Gmail писем, а также содержимое писем, которое вы вставляете или выбираете в файлах .eml или .txt.",
    "privacyExclusions": "Изображения, QR-коды, вложения и страницы по ссылкам не проверяются.",
    "privacyStorage": "Расширение не передаёт содержимое писем за пределы этого устройства и не сохраняет его. Сохраняются только настройки.",
    "privacyDisclaimer": "Отсутствие предупреждений не гарантирует безопасность или подлинность отправителя.",
    "linkCount": "Ссылок: {n}",
    "groupLinkCount": "Групп: {groups} · ссылок: {links}",
    "locateLink": "Перейти к месту",
    "linkChanged": "Ссылка изменилась; повторная проверка",
    "warningMarker": "Проверить",
    "locateWarning": "Перейти к месту",
    "copyUnavailable": "Копирование недоступно",
    "markerTarget": "Адрес ссылки",
    "showFullUrl": "Показать полный URL",
    "hideFullUrl": "Скрыть полный URL",
    "scanning": "Проверка письма…",
    "sampleSubject": "Вымышленное тестовое письмо; не настоящее письмо",
    "sampleBody": "Введите пароль от аккаунта Google:",
    "settingsError": "Не удалось прочитать или сохранить настройки. Повторите попытку.",
    "fileNone": "Файл не выбран",
    "fileSelected": "Выбранный файл: {name}",
    "reasonCount": "Причин: {n}",
    "groupReasonCount": "Ссылок: {groups} · причин: {reasons}",
    "reasonSenderName": "Отображаемое имя или адрес отправителя не соответствует домену адреса отправителя. Само по себе это не доказывает подмену личности.",
    "reasonDeliveryDomain": "Домен отправки или пересылки отличается от домена отправителя. Это может быть связано с обычной пересылкой.",
    "reasonSignerDomain": "Указанный домен подписи отличается от домена отправителя. Само по себе это не доказывает подмену личности.",
    "senderAddress": "Адрес отправителя",
    "senderName": "Отображаемое имя отправителя",
    "senderDomain": "Домен отправителя",
    "deliveryDomain": "Домен отправки / пересылки",
    "signerDomain": "Указанный домен подписи",
    "senderClaimsNote": "Сведения об отправителе и аутентификации приведены по имеющимся данным и не проверены независимо. Знакомый адрес не подтверждает безопасность ссылки.",
    "senderLinkWarning": "Проверить ссылки",
    "senderInfo": "Сведения об отправителе",
    "locateSender": "Перейти к отправителю",
    "senderContext": "Контекст отправителя и ссылок",
    "privacySenderChecks": "Также локально на этом устройстве сравнивает отображаемые имя и адрес отправителя с доменами отправки и подписи из подробных сведений, которые вы открываете в Gmail."
  },
  "de": {
    "description": "Lokale Phishing-Warnungen für Gmail. Prüft Text und Links, ohne Ihre E-Mails an einen Server zu senden.",
    "active": "Prüfung aktiviert",
    "paused": "Prüfung pausiert",
    "enable": "Lokale Prüfung aktivieren",
    "options": "Einstellungen",
    "language": "Sprache",
    "auto": "Browsersprache",
    "showInfo": "Zusätzliche Informationen anzeigen",
    "save": "Einstellungen speichern",
    "saved": "Gespeichert",
    "privacy": "Datenschutz",
    "coverage": "Geprüft werden der Nachrichtentext und die Links, die die Erweiterung lesen kann. E-Mail-Authentifizierung, Bilder, QR-Codes, Anhänge und Zielseiten werden nicht verifiziert. Das Fehlen einer Warnung garantiert keine Sicherheit.",
    "scan": "Lokale E-Mail-Prüfung",
    "scanHelp": "Fügen Sie E-Mail-Header oder eine vollständige E-Mail ein oder wählen Sie eine .eml- oder .txt-Datei, um sie nach denselben Regeln wie bei den automatischen Prüfungen von Mail Guard in Gmail zu analysieren. Der Inhalt wird nur auf Ihrem Gerät verarbeitet, nicht nach außen gesendet und nicht gespeichert (bis 5 MB).",
    "choose": ".eml oder .txt auswählen",
    "analyze": "E-Mail prüfen",
    "clear": "Löschen",
    "sample": "Fiktives Beispiel testen",
    "error": "Die Prüfung konnte nicht abgeschlossen werden. Prüfen Sie Eingabe und Größenlimit.",
    "noGmail": "Öffnen Sie Gmail, um E-Mails zu prüfen.",
    "noMessages": "Öffnen oder klappen Sie eine Nachricht in Gmail auf. Wenn kein Ergebnis erscheint, laden Sie Gmail neu.",
    "messages": "Geöffnete Nachrichten: {n}",
    "details": "Details anzeigen",
    "close": "Schließen",
    "cancel": "Abbrechen",
    "proceed": "Diesen Link öffnen",
    "copy": "URL kopieren",
    "copied": "Kopiert",
    "confirm": "Vor dem Öffnen prüfen",
    "unsupported": "Die Erweiterung kann diesen Linktyp nicht öffnen.",
    "target": "Klickziel",
    "candidate": "Mögliches Ziel in der URL — nicht besucht",
    "reason": "Grund des Hinweises",
    "headers": "Header-Informationen",
    "headerNote": "Diese Funktion garantiert nicht, dass der Absender der E-Mail echt ist.",
    "refresh": "Aktualisieren",
    "reset": "Einstellungen zurücksetzen",
    "resetConfirm": "Einstellungen zurücksetzen? Die lokale Prüfung und zusätzliche Informationen werden aktiviert. Die Anzeigesprache entspricht dann der Browsersprache.",
    "input": "E-Mail oder Header hier einfügen…",
    "NO_FINDINGS": "Keine Anzeichen gefunden",
    "INFO": "Zusätzliche Informationen",
    "CAUTION": "Prüfung empfohlen",
    "WARNING": "Vor der Aktion prüfen",
    "HIGH_RISK": "Hinweise auf hohes Risiko",
    "reasonUgc": "Dieser Dienst kann von anderen Personen erstellte Inhalte hosten.",
    "reasonRedirect": "Das endgültige Ziel ist nicht verifiziert. Eine eingebettete URL ist nur ein mögliches Ziel.",
    "reasonUnparsed": "Dieser Link konnte nicht vollständig analysiert werden.",
    "reasonMismatch": "Die angezeigte URL und der tatsächliche Link führen zu unterschiedlichen Domains.",
    "reasonUserinfo": "Der Text vor @ ist nicht der Zielhost.",
    "reasonInvisible": "Der Link enthält unsichtbare Zeichen oder Zeichen, die die Textrichtung ändern.",
    "reasonAccount": "Eine Konto- oder Sicherheitsaktion führt zu Inhalten Dritter.",
    "reasonSecret": "Die Nachricht fordert Sie auf, ein Passwort oder einen Code an ein ungeeignetes Ziel zu übermitteln.",
    "reasonSpoof": "Eine kontobezogene Anfrage verwendet einen Link, der seinen echten Host verschleiert.",
    "reasonLookalike": "Der Host ähnelt bei einer sensiblen Anfrage einer bekannten Marke.",
    "reasonUnknown": "Der Zusammenhang zwischen Ziel und angeforderter Kontoaktion ist unbekannt.",
    "reasonAmbiguous": "Anfrage und Link lassen sich nicht zuverlässig zuordnen.",
    "reasonScheme": "Nicht unterstützter Linktyp. Die Erweiterung öffnet diesen Link nicht.",
    "reasonForward": "Die Header enthalten Hinweise auf eine Weiterleitung. Eine Weiterleitung allein weist nicht auf eine Gefahr hin.",
    "reasonReply": "Die Domain der Antwortadresse unterscheidet sich von der Absenderdomain. Dieser Unterschied allein weist nicht auf eine Gefahr hin.",
    "name": "Mail Guard",
    "partial": "Nur ein Teil konnte wegen Größen-, Format- oder Analysegrenzen geprüft werden.",
    "unavailable": "Kein lesbarer Nachrichtentext vorhanden. Header-Informationen können verfügbar sein.",
    "settingsHelp": "Wählen Sie die Anzeigesprache und welche Hinweise die Erweiterung bei Gmail zeigt.",
    "languageHelp": "Ändert die Sprache der Erweiterungsoberfläche.",
    "enableHelp": "Prüft automatisch Nachrichten, die Sie in Gmail öffnen. Ausschalten pausiert die Hinweise auf der Seite.",
    "showInfoHelp": "Wenn deaktiviert, sind zusätzliche Informationen über eine kleine Schaltfläche abrufbar. Warnungen und Hinweise auf unvollständige Prüfungen bleiben sichtbar.",
    "shownHost": "Angezeigte URL",
    "actualHost": "Tatsächlicher Link-Host",
    "apparentTarget": "Text vor @",
    "suspiciousChars": "Auffällige Zeichen",
    "requestedAction": "Angeforderte Aktion",
    "destinationHost": "Ziel",
    "destinationType": "Zieltyp",
    "candidateHost": "Mögliches Ziel",
    "thirdPartyContent": "Inhalte Dritter",
    "actionSecret": "Eingabe von Passwort oder Bestätigungscode",
    "actionAccount": "Konto- oder Anmeldeaktion",
    "actionShared": "Freigegebenen Inhalt öffnen",
    "actionOpen": "Link öffnen",
    "unknown": "Prüfung unvollständig",
    "occurrences": "Vorkommen: {n}",
    "context": "Umgebender Text",
    "linkText": "Linktext",
    "otherFindings": "Weitere Hinweise: {n}",
    "linkInput": "Nicht analysierter Link",
    "privacyChecks": "Prüft auf diesem Gerät den sichtbaren Text und die Links geöffneter Gmail-Nachrichten sowie E-Mail-Inhalte, die Sie einfügen oder als .eml- oder .txt-Datei auswählen.",
    "privacyExclusions": "Bilder, QR-Codes, Anhänge und Zielseiten werden nicht überprüft.",
    "privacyStorage": "Die Erweiterung überträgt E-Mail-Inhalte nicht außerhalb dieses Geräts und speichert sie nicht. Nur die Einstellungen werden gespeichert.",
    "privacyDisclaimer": "Das Fehlen einer Warnung garantiert weder Sicherheit noch die Echtheit des Absenders.",
    "linkCount": "Links: {n}",
    "groupLinkCount": "Gruppen: {groups} · Links: {links}",
    "locateLink": "Zur Fundstelle",
    "linkChanged": "Link geändert; erneute Prüfung",
    "warningMarker": "Prüfen",
    "locateWarning": "Zur Fundstelle",
    "copyUnavailable": "Kopieren nicht möglich",
    "markerTarget": "Linkziel",
    "showFullUrl": "Vollständige URL anzeigen",
    "hideFullUrl": "Vollständige URL ausblenden",
    "scanning": "E-Mail wird geprüft…",
    "sampleSubject": "Fiktive Testnachricht; keine echte E-Mail",
    "sampleBody": "Geben Sie Ihr Google-Passwort ein:",
    "settingsError": "Die Einstellungen konnten nicht gelesen oder gespeichert werden. Versuchen Sie es erneut.",
    "fileNone": "Keine Datei ausgewählt",
    "fileSelected": "Ausgewählte Datei: {name}",
    "reasonCount": "Hinweise: {n}",
    "groupReasonCount": "Links: {groups} · Hinweise: {reasons}",
    "reasonSenderName": "Der angezeigte Absendername oder die angezeigte Adresse passt nicht zur Domain der Absenderadresse. Das allein belegt keine Identitätstäuschung.",
    "reasonDeliveryDomain": "Die Versand- oder Weiterleitungsdomain weicht von der Absenderdomain ab. Eine legitime Weiterleitung kann dies erklären.",
    "reasonSignerDomain": "Die angegebene Signaturdomain weicht von der Absenderdomain ab. Das allein belegt keine Identitätstäuschung.",
    "senderAddress": "Absenderadresse",
    "senderName": "Angezeigter Absendername",
    "senderDomain": "Absenderdomain",
    "deliveryDomain": "Versand- / Weiterleitungsdomain",
    "signerDomain": "Angegebene Signaturdomain",
    "senderClaimsNote": "Die Angaben zu Absender und Authentifizierung wurden nicht unabhängig überprüft. Eine vertraute Adresse bestätigt nicht die Sicherheit des Links.",
    "senderLinkWarning": "Links prüfen",
    "senderInfo": "Absenderinfos",
    "locateSender": "Zum Absender",
    "senderContext": "Kontext zu Absender und Links",
    "privacySenderChecks": "Vergleicht außerdem lokal auf diesem Gerät den angezeigten Absendernamen und die Absenderadresse mit den Versand- und Signaturdomains aus den von Ihnen geöffneten Gmail-Details."
  },
  "id": {
    "description": "Peringatan phishing lokal untuk Gmail. Periksa teks dan tautan tanpa mengirim email ke server.",
    "active": "Pemeriksaan aktif",
    "paused": "Pemeriksaan dijeda",
    "enable": "Aktifkan pemeriksaan lokal",
    "options": "Setelan",
    "language": "Bahasa",
    "auto": "Bahasa browser",
    "showInfo": "Tampilkan juga informasi tambahan",
    "save": "Simpan setelan",
    "saved": "Tersimpan",
    "privacy": "Privasi",
    "coverage": "Pemeriksaan mencakup teks dan tautan email yang dapat dibaca oleh ekstensi. Autentikasi email, gambar, kode QR, lampiran, dan halaman tujuan tidak diverifikasi. Tidak adanya peringatan bukan jaminan keamanan.",
    "scan": "Pemeriksaan email lokal",
    "scanHelp": "Tempel header atau email lengkap, atau pilih file .eml atau .txt, untuk menganalisisnya dengan aturan yang sama seperti pemeriksaan otomatis Mail Guard di Gmail. Konten hanya diproses di perangkat Anda, tanpa dikirim ke luar atau disimpan (hingga 5 MB).",
    "choose": "Pilih .eml atau .txt",
    "analyze": "Periksa email",
    "clear": "Hapus",
    "sample": "Coba contoh fiktif",
    "error": "Pemeriksaan tidak dapat diselesaikan. Periksa masukan dan batas ukuran.",
    "noGmail": "Buka Gmail untuk memeriksa email.",
    "noMessages": "Buka atau bentangkan pesan di Gmail. Jika hasil tidak muncul, muat ulang Gmail.",
    "messages": "{n} pesan terbuka",
    "details": "Lihat detail",
    "close": "Tutup",
    "cancel": "Batal",
    "proceed": "Buka tautan ini",
    "copy": "Salin URL",
    "copied": "Tersalin",
    "confirm": "Periksa sebelum membuka",
    "unsupported": "Ekstensi tidak dapat membuka jenis tautan ini.",
    "target": "Tujuan klik",
    "candidate": "Kemungkinan tujuan dalam URL — belum dikunjungi",
    "reason": "Alasan ditampilkan",
    "headers": "Informasi header",
    "headerNote": "Fitur ini tidak menjamin keaslian pengirim email.",
    "refresh": "Muat ulang",
    "reset": "Setel ulang setelan",
    "resetConfirm": "Setel ulang setelan? Pemeriksaan lokal dan informasi tambahan akan diaktifkan, dan bahasa tampilan akan mengikuti bahasa browser.",
    "input": "Tempel pesan atau header di sini…",
    "NO_FINDINGS": "Tidak ditemukan indikasi",
    "INFO": "Informasi tambahan",
    "CAUTION": "Disarankan untuk meninjau",
    "WARNING": "Periksa sebelum bertindak",
    "HIGH_RISK": "Indikator risiko tinggi",
    "reasonUgc": "Layanan ini dapat menampung konten buatan orang lain.",
    "reasonRedirect": "Tujuan akhir belum diverifikasi. URL di dalam tautan hanya kemungkinan tujuan.",
    "reasonUnparsed": "Tautan ini tidak dapat dianalisis sepenuhnya.",
    "reasonMismatch": "URL yang ditampilkan dan tautan sebenarnya mengarah ke domain berbeda.",
    "reasonUserinfo": "Teks sebelum @ bukan host tujuan.",
    "reasonInvisible": "Tautan berisi karakter tak terlihat atau pengubah arah teks.",
    "reasonAccount": "Tindakan akun atau keamanan mengarah ke konten pihak ketiga.",
    "reasonSecret": "Pesan meminta kata sandi atau kode melalui tujuan yang tidak sesuai.",
    "reasonSpoof": "Permintaan terkait akun menggunakan tautan yang menyamarkan host sebenarnya.",
    "reasonLookalike": "Dalam permintaan yang melibatkan informasi sensitif, nama host menyerupai merek yang dikenal.",
    "reasonUnknown": "Hubungan antara tujuan dan tindakan akun yang diminta belum diketahui.",
    "reasonAmbiguous": "Hubungan antara permintaan dan tautan tidak dapat dipastikan.",
    "reasonScheme": "Jenis tautan tidak didukung. Ekstensi tidak akan membukanya.",
    "reasonForward": "Header menunjukkan tanda penerusan email. Penerusan saja tidak menunjukkan bahaya.",
    "reasonReply": "Domain alamat balasan dan pengirim berbeda. Perbedaan ini saja tidak menunjukkan bahaya.",
    "name": "Mail Guard",
    "partial": "Hanya sebagian isi yang diperiksa karena batas ukuran, format, atau penguraian.",
    "unavailable": "Tidak ada isi pesan yang dapat dibaca. Informasi header mungkin tersedia.",
    "settingsHelp": "Pilih bahasa tampilan dan informasi apa yang ditampilkan ekstensi saat memeriksa Gmail.",
    "languageHelp": "Mengubah bahasa antarmuka ekstensi.",
    "enableHelp": "Secara otomatis memeriksa pesan yang Anda buka di Gmail. Matikan untuk menjeda peringatan pada halaman.",
    "showInfoHelp": "Saat dinonaktifkan, informasi tambahan dapat dibuka melalui tombol kecil. Peringatan dan pemberitahuan pemeriksaan yang belum lengkap tetap terlihat.",
    "shownHost": "URL yang ditampilkan",
    "actualHost": "Host tautan sebenarnya",
    "apparentTarget": "Teks sebelum @",
    "suspiciousChars": "Karakter mencurigakan",
    "requestedAction": "Tindakan yang diminta",
    "destinationHost": "Tujuan",
    "destinationType": "Jenis tujuan",
    "candidateHost": "Kemungkinan tujuan",
    "thirdPartyContent": "konten pihak ketiga",
    "actionSecret": "Memasukkan kata sandi atau kode verifikasi",
    "actionAccount": "Tindakan akun atau masuk",
    "actionShared": "Buka konten bersama",
    "actionOpen": "Buka tautan",
    "unknown": "Pemeriksaan belum lengkap",
    "occurrences": "{n} kemunculan",
    "context": "Teks sekitar",
    "linkText": "Teks tautan",
    "otherFindings": "{n} temuan lainnya",
    "linkInput": "Tautan belum diurai",
    "privacyChecks": "Memeriksa di perangkat ini teks yang terlihat dan tautan pada email yang Anda buka di Gmail, serta isi email yang Anda tempel atau pilih dari file .eml atau .txt.",
    "privacyExclusions": "Tidak memverifikasi gambar, kode QR, lampiran, atau halaman tujuan.",
    "privacyStorage": "Ekstensi tidak mengirim isi email ke luar perangkat ini atau menyimpannya. Hanya setelan yang disimpan.",
    "privacyDisclaimer": "Tidak adanya peringatan tidak menjamin keamanan atau keaslian pengirim.",
    "linkCount": "{n} tautan",
    "groupLinkCount": "{groups} grup · {links} tautan",
    "locateLink": "Buka lokasi terkait",
    "linkChanged": "Tautan berubah; memeriksa ulang",
    "warningMarker": "Periksa",
    "locateWarning": "Buka lokasi terkait",
    "copyUnavailable": "Tidak dapat menyalin",
    "markerTarget": "Tujuan tautan",
    "showFullUrl": "Tampilkan URL lengkap",
    "hideFullUrl": "Sembunyikan URL lengkap",
    "scanning": "Memeriksa email…",
    "sampleSubject": "Pesan uji fiktif; bukan email sungguhan",
    "sampleBody": "Masukkan kata sandi akun Google Anda:",
    "settingsError": "Tidak dapat membaca atau menyimpan setelan. Coba lagi.",
    "fileNone": "Belum ada file yang dipilih",
    "fileSelected": "File yang dipilih: {name}",
    "reasonCount": "Alasan: {n}",
    "groupReasonCount": "Tautan: {groups} · alasan: {reasons}",
    "reasonSenderName": "Nama atau alamat pengirim yang ditampilkan tidak sesuai dengan domain alamat pengirim. Hal ini saja tidak membuktikan pemalsuan identitas.",
    "reasonDeliveryDomain": "Domain pengiriman atau penerusan berbeda dari domain pengirim. Penerusan yang sah dapat menjelaskan perbedaan ini.",
    "reasonSignerDomain": "Domain tanda tangan yang tercantum berbeda dari domain pengirim. Hal ini saja tidak membuktikan pemalsuan identitas.",
    "senderAddress": "Alamat pengirim",
    "senderName": "Nama pengirim yang ditampilkan",
    "senderDomain": "Domain pengirim",
    "deliveryDomain": "Domain pengiriman / penerusan",
    "signerDomain": "Domain tanda tangan yang tercantum",
    "senderClaimsNote": "Detail pengirim dan autentikasi merupakan informasi yang tercantum, tanpa verifikasi independen. Alamat yang dikenal tidak membuktikan keamanan tautan.",
    "senderLinkWarning": "Periksa tautan",
    "senderInfo": "Info pengirim",
    "locateSender": "Ke pengirim",
    "senderContext": "Konteks pengirim dan tautan",
    "privacySenderChecks": "Juga membandingkan nama dan alamat pengirim yang ditampilkan dengan domain pengiriman dan tanda tangan dari detail Gmail yang Anda buka, secara lokal di perangkat ini."
  },
  "ko": {
    "description": "Gmail 이메일의 문맥과 링크를 기기에서 확인해 피싱 위험 징후를 알려 줍니다. 이메일은 서버로 전송하지 않습니다.",
    "active": "검사 켜짐",
    "paused": "검사 일시 중지됨",
    "enable": "기기 내 검사 사용",
    "options": "설정",
    "language": "언어",
    "auto": "브라우저 언어",
    "showInfo": "추가 정보도 표시",
    "save": "설정 저장",
    "saved": "저장됨",
    "privacy": "개인정보 보호",
    "coverage": "확장 프로그램이 읽을 수 있는 메시지의 텍스트와 링크를 검사합니다. 이메일 인증 여부, 이미지, QR 코드, 첨부파일, 링크의 목적지 페이지는 검증하지 않습니다. 경고가 없다고 해서 안전이 보장되지는 않습니다.",
    "scan": "기기 내 메시지 검사",
    "scanHelp": "이메일 헤더나 전체 이메일을 붙여넣거나 .eml 또는 .txt 파일을 선택하면 Gmail 자동 검사와 동일한 Mail Guard 규칙으로 분석합니다. 내용은 이 기기에서만 처리되며 외부로 전송되거나 저장되지 않습니다(최대 5 MB).",
    "choose": ".eml 또는 .txt 파일 선택",
    "analyze": "메시지 검사",
    "clear": "지우기",
    "sample": "가상 예시로 테스트",
    "error": "검사를 완료할 수 없습니다. 입력 내용과 크기 제한을 확인해 주세요.",
    "noGmail": "Gmail을 열어 메시지를 검사해 주세요.",
    "noMessages": "Gmail에서 메시지를 열거나 펼쳐 주세요. 결과가 표시되지 않으면 Gmail을 새로고침해 주세요.",
    "messages": "열린 메시지: {n}개",
    "details": "세부 정보 보기",
    "close": "닫기",
    "cancel": "취소",
    "proceed": "이 링크 열기",
    "copy": "URL 복사",
    "copied": "복사됨",
    "confirm": "열기 전에 확인해 주세요",
    "unsupported": "이 유형의 링크는 확장 프로그램에서 열 수 없습니다.",
    "target": "클릭 시 이동할 주소",
    "candidate": "링크에 포함된 목적지 후보 · 방문하지 않음",
    "reason": "표시 이유",
    "headers": "헤더 정보",
    "headerNote": "이 기능은 이메일 발신자가 진짜인지 보장하지 않습니다.",
    "refresh": "새로고침",
    "reset": "설정 초기화",
    "resetConfirm": "설정을 초기화할까요? 기기 내 검사와 추가 정보 표시가 켜지고, 표시 언어는 브라우저 언어를 따릅니다.",
    "input": "메시지나 헤더를 여기에 붙여넣으세요…",
    "NO_FINDINGS": "위험 징후가 발견되지 않음",
    "INFO": "추가 정보",
    "CAUTION": "검토 권장",
    "WARNING": "진행 전에 확인 필요",
    "HIGH_RISK": "높은 위험을 나타내는 징후",
    "reasonUgc": "이 서비스에는 다른 사람이 작성한 콘텐츠가 게시될 수 있습니다.",
    "reasonRedirect": "최종 목적지는 검증되지 않았습니다. 링크에 포함된 URL은 목적지 후보일 뿐입니다.",
    "reasonUnparsed": "이 링크를 완전히 분석하지 못했습니다.",
    "reasonMismatch": "표시된 URL과 실제 링크가 서로 다른 도메인을 가리킵니다.",
    "reasonUserinfo": "@ 앞의 텍스트는 목적지 호스트가 아닙니다.",
    "reasonInvisible": "이 링크에 보이지 않는 문자나 텍스트 방향 제어 문자가 포함되어 있습니다.",
    "reasonAccount": "계정 또는 보안 관련 조치를 요청하면서 제3자가 작성한 콘텐츠로 연결합니다.",
    "reasonSecret": "적절하지 않은 목적지를 통해 비밀번호나 코드를 요구합니다.",
    "reasonSpoof": "계정 관련 요청에 실제 호스트를 오인하게 할 수 있는 링크가 사용되었습니다.",
    "reasonLookalike": "민감한 정보를 다루는 요청에서 알려진 브랜드와 유사한 호스트가 사용되었습니다.",
    "reasonUnknown": "이 목적지와 요청된 계정 관련 조치의 관계를 알 수 없습니다.",
    "reasonAmbiguous": "요청과 링크가 연결되어 있는지 확실하게 판단할 수 없습니다.",
    "reasonScheme": "지원하지 않는 링크 유형입니다. 확장 프로그램은 이 링크로 이동하지 않습니다.",
    "reasonForward": "헤더에 전달된 이메일에서 볼 수 있는 징후가 있습니다. 전달 사실만으로 위험하다고 판단하지 않습니다.",
    "reasonReply": "회신 주소와 발신자 주소의 도메인이 다릅니다. 이 차이만으로 위험하다고 판단하지 않습니다.",
    "name": "Mail Guard",
    "partial": "입력 내용의 일부만 검사했습니다. 크기, 형식 또는 분석 한계로 검사하지 못한 내용이 있습니다.",
    "unavailable": "읽을 수 있는 메시지 본문이 없어 검사할 수 없습니다. 헤더 정보는 제공될 수 있습니다.",
    "settingsHelp": "Gmail을 검사할 때 사용할 표시 언어와 확장 프로그램이 보여 줄 정보를 선택해 주세요.",
    "languageHelp": "확장 프로그램 화면에 표시되는 언어를 변경합니다.",
    "enableHelp": "Gmail에서 여는 메시지를 자동으로 검사합니다. 이 설정을 끄면 페이지 내 경고가 일시 중지됩니다.",
    "showInfoHelp": "끄면 작은 버튼을 눌러 추가 정보를 볼 수 있습니다. 경고와 불완전한 검사 안내는 계속 표시됩니다.",
    "shownHost": "링크에 표시된 주소",
    "actualHost": "실제 목적지 호스트",
    "apparentTarget": "@ 앞의 텍스트",
    "suspiciousChars": "의심스러운 문자",
    "requestedAction": "요청된 조치",
    "destinationHost": "목적지",
    "destinationType": "목적지 유형",
    "candidateHost": "가능한 목적지",
    "thirdPartyContent": "제3자 작성 콘텐츠",
    "actionSecret": "비밀번호 또는 인증 코드 입력",
    "actionAccount": "계정 또는 로그인 관련 조치",
    "actionShared": "공유 콘텐츠 열기",
    "actionOpen": "링크 열기",
    "unknown": "불완전한 검사",
    "occurrences": "등장 횟수: {n}회",
    "context": "주변 텍스트",
    "linkText": "링크 텍스트",
    "otherFindings": "기타 발견 사항: {n}개",
    "linkInput": "분석하지 못한 링크 입력값",
    "privacyChecks": "Gmail에서 여는 메시지의 화면에 표시된 텍스트와 링크를 이 기기에서 검사합니다. 붙여넣은 이메일 내용과 선택한 .eml 또는 .txt 파일의 내용도 검사합니다.",
    "privacyExclusions": "이미지, QR 코드, 첨부파일, 링크의 목적지 페이지는 검증하지 않습니다.",
    "privacyStorage": "확장 프로그램은 이메일 내용을 이 기기 외부로 전송하거나 저장하지 않습니다. 설정만 저장합니다.",
    "privacyDisclaimer": "경고가 없다고 해서 안전하거나 발신자가 진짜라고 보장하지 않습니다.",
    "linkCount": "링크: {n}개",
    "groupLinkCount": "그룹: {groups}개 · 링크: {links}개",
    "locateLink": "해당 위치로 이동",
    "linkChanged": "링크가 변경되어 다시 검사 중",
    "warningMarker": "확인 필요",
    "locateWarning": "해당 위치로 이동",
    "copyUnavailable": "복사할 수 없음",
    "markerTarget": "링크 목적지",
    "showFullUrl": "전체 URL 표시",
    "hideFullUrl": "전체 URL 숨기기",
    "scanning": "메시지 검사 중…",
    "sampleSubject": "가상의 테스트 메시지이며 실제 이메일이 아닙니다",
    "sampleBody": "Google 비밀번호를 입력해 주세요:",
    "settingsError": "설정을 읽거나 저장할 수 없습니다. 다시 시도해 주세요.",
    "fileNone": "선택된 파일 없음",
    "fileSelected": "선택된 파일: {name}",
    "reasonCount": "주의 사항 {n}개",
    "groupReasonCount": "링크 {groups}개 · 주의 사항 {reasons}개",
    "reasonSenderName": "표시된 발신자 이름 또는 주소가 발신자 주소의 도메인과 일치하지 않습니다. 이 차이만으로 사칭이라고 판단할 수는 없습니다.",
    "reasonDeliveryDomain": "발송 또는 전달 도메인이 발신자 도메인과 다릅니다. 정상적인 메일 전달 과정에서도 발생할 수 있습니다.",
    "reasonSignerDomain": "표시된 서명 도메인이 발신자 도메인과 다릅니다. 이 차이만으로 사칭이라고 판단할 수는 없습니다.",
    "senderAddress": "발신자 주소",
    "senderName": "표시된 발신자 이름",
    "senderDomain": "발신자 도메인",
    "deliveryDomain": "발송 / 전달 도메인",
    "signerDomain": "표시된 서명 도메인",
    "senderClaimsNote": "발신자 및 인증 세부 정보는 제공된 내용이며, 별도로 검증되지 않았습니다. 익숙한 주소라고 해서 링크의 안전성이 확인되는 것은 아닙니다.",
    "senderLinkWarning": "링크 확인",
    "senderInfo": "발신자 정보",
    "locateSender": "발신자로 이동",
    "senderContext": "발신자 및 링크 관련 정보",
    "privacySenderChecks": "표시된 발신자 이름·주소와 사용자가 Gmail에서 연 세부 정보의 발송·서명 도메인도 이 기기에서 로컬로 비교합니다."
  }
}
;

globalThis.MCG.GMAIL_DETAIL_LABELS = {"en":{"mailedBy":["mailed-by","Mailed by"],"signedBy":["signed-by","Signed by"]},"ja":{"mailedBy":["送信元"],"signedBy":["署名元"]},"zh_CN":{"mailedBy":[],"signedBy":["签名者"]},"es":{"mailedBy":["enviado por"],"signedBy":["firmado por"]},"ar":{"mailedBy":["مُرسلة بواسطة"],"signedBy":["مُوقعة بواسطة"]},"pt_BR":{"mailedBy":["Enviado por"],"signedBy":["Assinado por"]},"fr":{"mailedBy":["Envoyé par"],"signedBy":["Signé par"]},"ru":{"mailedBy":["отправлено через"],"signedBy":["подписано"]},"de":{"mailedBy":["Mailed by"],"signedBy":["Signed by"]},"id":{"mailedBy":["Dikirim oleh"],"signedBy":["Ditandatangani oleh"]},"ko":{"mailedBy":["발송 도메인"],"signedBy":["인증기관"]}};

globalThis.MCG.BRAND = {"viewBox":"0 0 128 128","nodes":[["rect",{"width":"128","height":"128","rx":"29","fill":"#173e45"}],["path",{"d":"M64 21 103 35V66c0 23-22 39-39 47-17-8-39-24-39-47V35Z","fill":"#bfe5d4"}],["path",{"d":"M40 48h48v33H40z","fill":"#173e45"}],["path",{"d":"m40 49 24 19 24-19","fill":"none","stroke":"#bfe5d4","stroke-width":"5","stroke-linejoin":"round"}],["circle",{"cx":"93","cy":"88","r":"20","fill":"#f2ba5e","stroke":"#173e45","stroke-width":"5"}],["path",{"d":"M93 77v12","stroke":"#173e45","stroke-width":"5","stroke-linecap":"round"}],["circle",{"cx":"93","cy":"97","r":"2.6","fill":"#173e45"}]]};
(() => {
 'use strict';const M=globalThis.MCG;
 M.languageNames={en:'English',zh_CN:'简体中文',es:'Español',ar:'العربية',pt_BR:'Português (Brasil)',fr:'Français',ru:'Русский',ja:'日本語',de:'Deutsch',id:'Bahasa Indonesia',ko:'한국어'};
 M.locale='en';
 M.pickLocale=value=>{if(value&&value!=='auto'&&Object.hasOwn(M.LOCALES,value))return value;const language=String(globalThis.chrome?.i18n?.getUILanguage?.()||navigator.language||'en').trim().replaceAll('-','_').toLowerCase();const exact=Object.keys(M.LOCALES).find(key=>key.toLowerCase()===language);if(exact)return exact;const base=language.split('_')[0];if(base==='zh')return 'zh_CN';if(base==='pt')return 'pt_BR';return Object.hasOwn(M.LOCALES,base)?base:'en';};
 M.setLocale=value=>{M.locale=M.pickLocale(value);};
 M.t=(key,args={})=>{const local=M.LOCALES[M.locale]||{},english=M.LOCALES.en;let text=Object.hasOwn(local,key)&&typeof local[key]==='string'&&local[key]?local[key]:Object.hasOwn(english,key)&&typeof english[key]==='string'?english[key]:String(key);for(const [k,v]of Object.entries(args))text=text.replaceAll('{'+k+'}',String(v));return text;};
 M.el=(tag,text='',attrs={})=>{const e=document.createElement(tag);if(text)e.textContent=text;for(const[k,v]of Object.entries(attrs)){if(k==='class')e.className=v;else e.setAttribute(k,String(v));}return e;};
 M.button=(key,handler,cls='secondary')=>{const b=M.el('button',M.t(key),{type:'button',class:cls});b.addEventListener('click',handler);return b;};
 M.brandMark=()=>{const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',M.BRAND.viewBox);svg.setAttribute('class','brand-mark');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');for(const[tag,attrs]of M.BRAND.nodes){const node=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))node.setAttribute(k,v);svg.append(node);}return svg;};
 // Display and interception share one UI policy. Core classifications stay pure.
 M.warnsInMail=link=>M.LEVELS.indexOf(link?.level)>=M.LEVELS.indexOf('CAUTION');
 M.markerDestination=href=>{const full=M.clean(href||''),long=full.length>120,url=M.validHttp(href);return {full,preview:long?(url?url.protocol+'//'+url.host+'/…':full.slice(0,112)+'…'):full,long,truncated:typeof href==='string'&&href.length>65536};};
 M.renderMarkerDestination=href=>{
  const model=M.markerDestination(href),wrap=M.el('span','',{class:'marker-destination'});
  wrap.append(M.el('span',M.t('markerTarget')+': ',{class:'marker-destination-label'}),M.el('bdi',model.preview,{class:'marker-url',dir:'ltr',title:model.full}));
  if(model.long){const full=M.el('bdi',model.full+(model.truncated?'…':''),{class:'marker-full-url',id:'full-destination',dir:'ltr'});full.hidden=true;
   const toggle=M.button('showFullUrl',()=>{full.hidden=!full.hidden;toggle.textContent=M.t(full.hidden?'showFullUrl':'hideFullUrl');toggle.setAttribute('aria-expanded',String(!full.hidden));},'destination-toggle');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','full-destination');wrap.append(toggle,full);
   if(model.truncated)wrap.append(M.el('span',M.t('partial'),{class:'marker-destination-label'}));
  }return wrap;
 };
 M.status=(level)=>M.el('span',M.t(level),{class:'badge level-'+level});
 M.serviceLabel=info=>{const parts=[];if(info.role?.operator)parts.push(info.role.operator);if(info.role?.thirdParty)parts.push(M.t('thirdPartyContent'));return parts.filter(Boolean).join(' · ')||M.clean(info.host||info.url||'');};
 M.intentLabel=link=>link.intent==='secret'?M.t('actionSecret'):link.intent==='account'?M.t('actionAccount'):link.intent==='shared'?M.t('actionShared'):M.t('actionOpen');
 M.fact=(label,value)=>({label,value});
 M.linkFacts=link=>{const facts=[];const seen=new Set();const add=(label,value)=>{value=(value||'').trim();if(!value)return;const key=label+'\u0000'+value;if(seen.has(key))return;seen.add(key);facts.push(M.fact(label,value));};
  const reasons=(link.findings||[]).map(f=>f.reason);
  if(reasons.includes('reasonMismatch')){add(M.t('shownHost'),M.clean(link.info.displayHost||link.info.shownText||''));add(M.t('actualHost'),M.clean(link.info.host||''));}
  if(reasons.includes('reasonUserinfo'))add(M.t('apparentTarget'),M.clean(link.info.userinfoText||link.info.shownText||''));
  if(reasons.includes('reasonInvisible')&&link.info.invisibleChars?.length)add(M.t('suspiciousChars'),link.info.invisibleChars.join(', '));
  if(reasons.some(r=>['reasonAccount','reasonSecret','reasonUnknown','reasonSpoof','reasonLookalike','reasonAmbiguous'].includes(r))){add(M.t('requestedAction'),M.intentLabel(link));add(M.t('destinationHost'),M.clean(link.info.host||''));if(link.info.role?.thirdParty||link.info.role?.operator)add(M.t('destinationType'),M.serviceLabel(link.info));}
  if((link.info.candidates||[]).length)add(M.t('candidateHost'),M.clean(link.info.candidates.at(-1).host));
  if(!facts.length)add(M.t('destinationHost'),M.clean(link.info.host||link.info.url||link.info.raw||''));
  return facts;
 };
 M.renderFacts=facts=>{const wrap=M.el('dl','',{class:'facts'});for(const row of facts){wrap.append(M.el('dt',row.label,{class:'fact-label'}),M.el('dd',row.value,{class:'fact-value',dir:'ltr'}));}return wrap;};
 // Keep URL, label, context, intent, coverage and all evidence in the key. Only
 // occurrence IDs are excluded; sharing a hostname alone is never equivalent.
 M.findingKey=link=>JSON.stringify([link.info,link.occurrence,link.intent,link.brand,link.action,link.coverage,[...link.findings].sort((a,b)=>a.id.localeCompare(b.id))]);
 M.groupLinks=links=>{const groups=new Map();links.forEach((link,index)=>{if(!link.findings.length)return;const key=M.findingKey(link);let group=groups.get(key);if(!group){group={link,positions:[]};groups.set(key,group);}group.positions.push(index+1);});return [...groups.values()];};
 // UI hierarchy: warning category → observed host pair → exact URL → occurrences.
 // Grouping changes presentation only: each original link and finding is retained.
 M.warningCategories=result=>{
  const categories=new Map();
  const category=f=>{let c=categories.get(f.id);if(!c){c={finding:f,pairs:[],positions:[],overall:false};categories.set(f.id,c);}return c;};
  for(const finding of result.findings||[])category(finding).overall=true;
  (result.links||[]).forEach((link,index)=>{for(const finding of link.findings){
   const c=category(finding),pairKey=JSON.stringify([link.info.displayHost||'',link.info.host||'',!link.info.host?/^[a-z][a-z0-9+.-]*:/i.exec(link.info.raw||'')?.[0]||'':'']);
   let pair=c.pairs.find(p=>p.key===pairKey);if(!pair){pair={key:pairKey,finding,link,positions:[],urls:[]};c.pairs.push(pair);}
   const raw=link.info.raw||link.info.url||'';let url=pair.urls.find(u=>u.raw===raw);if(!url){url={raw,occurrences:[]};pair.urls.push(url);}
   url.occurrences.push({link,position:index+1});pair.positions.push(index+1);c.positions.push(index+1);
  }});
  return [...categories.values()].sort((a,b)=>M.LEVELS.indexOf(b.finding.level)-M.LEVELS.indexOf(a.finding.level));
 };
 // 1.0.8: one exact displayed-text/destination item, with all its reasons.
 // Never normalize, decode, sort queries, or reduce destinations to hostnames.
 // At parser bounds equivalence is unknown: retain separate occurrence groups.
 M.warningGroups=result=>{
  const groups=new Map(),rank=f=>M.LEVELS.indexOf(f.level);
  const addFinding=(group,f,link)=>{const existing=group.findings.find(x=>x.reason===f.reason);if(!existing)group.findings.push(f);else if(rank(f)>rank(existing))group.findings[group.findings.indexOf(existing)]=f;
   if(!group.finding||rank(f)>rank(group.finding)){group.finding=f;group.link=link;}};
  (result.links||[]).forEach((link,index)=>{
   if(!link.findings?.length)return;const raw=link.info.raw??link.info.url??'',shown=link.info.shownText||'';
   const bounded=link.info.partial||raw.length>=M.LIMIT.url||shown.length>=500;
   const key=JSON.stringify(['link',raw,shown,...(bounded?[index]:[])]);
   let group=groups.get(key);if(!group){group={key,link,finding:null,findings:[],level:'NO_FINDINGS',positions:[],occurrences:[],urls:[]};groups.set(key,group);}
   const occurrence={link,position:index+1};group.positions.push(index+1);group.occurrences.push(occurrence);
   for(const f of link.findings)addFinding(group,f,link);
  });
  for(const f of result.findings||[]){const key=JSON.stringify(f.senderEvidence?['sender',f.senderEvidence.address||'',f.senderEvidence.provenance]:['overall',f.reason]);let group=groups.get(key);if(!group){group={key,link:null,finding:null,findings:[],level:'NO_FINDINGS',positions:[],occurrences:[],urls:[]};groups.set(key,group);}if(f.senderEvidence)group.senderEvidence=f.senderEvidence;addFinding(group,f,null);}
  for(const group of groups.values()){group.findings.sort((a,b)=>rank(b)-rank(a));group.level=M.maxLevel(...group.findings.map(f=>f.level));if(group.link)group.urls=[{raw:group.link.info.raw??group.link.info.url??'',occurrences:group.occurrences}];}
  return [...groups.values()].sort((a,b)=>rank(b.finding)-rank(a.finding));
 };
 M.summaryGroups=result=>M.warningGroups(result);
 M.leadingFinding=result=>M.summaryGroups(result)[0]?.finding;
 M.summaryEvidence=entry=>{
  const link=entry?.link;if(!link){const e=entry?.senderEvidence||entry?.finding?.senderEvidence;if(!e)return {facts:[],relation:false};const f=(key,value)=>({label:M.t(key),value:M.clean(value||''),kind:key==='senderName'?'text':'host'});const reason=entry.finding.reason;const facts=reason==='reasonDeliveryDomain'?[f('senderDomain',e.fromDomain||e.domain),f('deliveryDomain',e.deliveryDomain)]:reason==='reasonSignerDomain'?[f('senderDomain',e.fromDomain||e.domain),f('signerDomain',(e.signatureDomains||[]).join(', '))]:[f('senderName',e.displayName),f('senderAddress',e.address)];return {facts:facts.filter(x=>x.value),relation:true};}const info=link.info,reason=entry.finding.reason;
  const fact=(key,value,kind='text')=>({label:M.t(key),value:M.clean(value||''),kind});
  const actual=()=>fact('actualHost',info.host,'host');let facts=[],relation=false;
  if(reason==='reasonMismatch'&&info.displayHost&&info.host){facts=[fact('shownHost',info.displayHost,'host'),actual()];relation=true;}
  else if(['reasonUserinfo','reasonSpoof'].includes(reason)&&info.userinfoText){facts=[fact('apparentTarget',info.userinfoText),actual()];relation=true;}
  else if(reason==='reasonSpoof'&&info.displayHost){facts=[fact('shownHost',info.displayHost,'host'),actual()];relation=true;}
  else if(reason==='reasonInvisible'){facts=[fact('suspiciousChars',(info.invisibleChars||[]).join(', ')),actual()];}
  else if(reason==='reasonRedirect'){facts=[actual()];if(info.candidates?.length){facts.push(fact('candidateHost',info.candidates.at(-1).host,'host'));relation=true;}}
  else if(['reasonAccount','reasonSecret','reasonUnknown','reasonLookalike','reasonAmbiguous'].includes(reason)){
   const candidate=['reasonAccount','reasonSecret'].includes(reason)?info.candidates?.find(x=>x.role?.thirdParty):null;
   facts=[fact('requestedAction',M.intentLabel(link)),candidate?fact('candidateHost',candidate.host,'host'):actual()];
  }else if(reason==='reasonScheme'){facts=[fact('destinationType',/^[a-z][a-z0-9+.-]*:/i.exec(info.raw||'')?.[0]||M.t('unknown'))];}
  else if(reason==='reasonUnparsed'){facts=info.host?[actual()]:[fact('linkInput',M.clip(info.raw||info.shownText||'',120)+(Math.max((info.raw||'').length,(info.shownText||'').length)>120?'…':''))];}
  else if(info.host)facts=[actual()];
  if(['reasonAccount','reasonSecret','reasonSpoof','reasonLookalike','reasonUnknown'].includes(reason)&&link.senderEvidence?.address)facts.push(fact('senderAddress',link.senderEvidence.address));
  return {facts:facts.filter(f=>f.value),relation};
 };
 M.summaryModel=result=>{const groups=M.summaryGroups(result),leading=groups[0];return {leading,reason:leading?M.t(leading.finding.reason):result.state==='PARTIAL'?M.t('partial'):result.state==='UNAVAILABLE'?M.t('unavailable'):'',evidence:M.summaryEvidence(leading),otherCount:Math.max(0,groups.length-1),groupCount:groups.length,linkGroupCount:groups.filter(g=>g.link).length,reasonCount:groups.reduce((n,g)=>n+g.findings.length,0),linkCount:new Set(groups.flatMap(g=>g.positions)).size};};
 M.renderSummaryEvidence=evidence=>{const row=M.el('span','',{class:'summary-evidence'});evidence.facts.forEach((fact,i)=>{if(i)row.append(M.el('span',evidence.relation?'→':'·',{class:'relation-separator','aria-hidden':'true',dir:'ltr'}));const part=M.el('span','',{class:'evidence-fact'});part.append(M.el('span',fact.label+': ',{class:'evidence-label'}),M.el('bdi',fact.value,{class:fact.kind==='host'?'evidence-value summary-host':'evidence-value',dir:fact.kind==='host'?'ltr':'auto'}));row.append(part);});return row;};
 M.resultLabel=result=>result.state==='PARTIAL'||result.state==='UNAVAILABLE'?M.t('unknown')+(M.LEVELS.indexOf(result.level)>=3?' · '+M.t(result.level):''):M.t(result.level);
 M.evidenceFacts=link=>{
  const facts=[M.fact(M.t('target'),M.clean(link.info.raw||link.info.url||''))];
  if(link.senderEvidence?.address&&link.findings.some(f=>['W01','H01','H02','W03','C04'].includes(f.id)))facts.unshift(M.fact(M.t('senderAddress'),M.clean(link.senderEvidence.address)));
  if(link.info.shownText)facts.push(M.fact(M.t('linkText'),M.clean(link.info.shownText)));
  if(link.info.unicodeHost&&link.info.unicodeHost!==link.info.host)facts.push(M.fact(M.t('actualHost'),M.clean(link.info.unicodeHost)));
  if(link.occurrence?.context)facts.push(M.fact(M.t('context'),M.clean(link.occurrence.context).replace(/\r\n?/g,'\n').replace(/\n[ \t]*\n(?:[ \t]*\n)+/g,'\n\n').trim()));
  for(const candidate of link.info.candidates||[])facts.push(M.fact(M.t('candidate'),M.clean(candidate.url)));
  return facts;
 };
 M.renderLinkCard=(link,positions=[])=>{const box=M.el('section','',{class:'link-card'}),list=M.el('ul','',{class:'finding-list'});
  for(const f of link.findings)list.append(M.el('li',M.t(f.reason),{class:'finding','aria-label':M.t(f.level)+' · '+M.t(f.reason)}));
  box.append(list,M.renderFacts([...M.linkFacts(link),...M.evidenceFacts(link)]));return box;
 };
 M.appendReasons=(parent,result,options={})=>{
  if(result.state==='PARTIAL')parent.append(M.el('p',M.t('partial'),{class:'note'}));
  if(result.state==='UNAVAILABLE')parent.append(M.el('p',M.t('unavailable'),{class:'note'}));
  const groups=M.warningGroups(result),multiple=groups.length>1;
  for(const group of groups){
   const section=M.el('section','',{class:'warning-category warning-group severity-'+group.level});
   const box=M.el(multiple?'details':'section','',{class:'pair-group'});box._findingKey=group.key;
   if(multiple){const summary=M.el('summary','',{class:'group-summary'});summary.append(M.status(group.level),M.renderSummaryEvidence(M.summaryEvidence(group)),M.el('span',M.t('reasonCount',{n:group.findings.length}),{class:'reason-count'}));
    if(group.link)summary.append(M.el('bdi',M.clean(group.link.info.raw??group.link.info.url??''),{class:'group-destination',dir:'ltr'}));else summary.append(M.el('span',M.t(group.finding.reason),{class:'finding'}));box.append(summary);}
   else if(!options.summaryVisible){const head=M.el('div','',{class:'group-heading'});head.append(M.renderSummaryEvidence(M.summaryEvidence(group)),M.el('span',M.t('reasonCount',{n:group.findings.length}),{class:'reason-count'}));box.append(head);}
   const content=M.el('div','',{class:'group-content'});
   if(!(options.summaryVisible&&!multiple&&group.findings.length===1)){
    const list=M.el('ul','',{class:'finding-list reason-list','aria-label':M.t('reason')});
    for(const f of group.findings){const item=M.el('li','',{class:'finding reason-item reason-'+f.level,'aria-label':M.t(f.level)+' · '+M.t(f.reason)});
     item.append(M.el('span','',{class:'reason-dot','aria-hidden':'true'}),M.el('span',M.t(f.reason),{class:'reason-copy'}));list.append(item);}
    content.append(list);
   }
   if(group.senderEvidence){const e=group.senderEvidence,facts=[];for(const [key,value]of [['senderName',e.displayName],['senderAddress',e.address],['deliveryDomain',e.deliveryDomain],['signerDomain',(e.signatureDomains||[]).join(', ')]])if(value)facts.push(M.fact(M.t(key),M.clean(value)));content.append(M.renderFacts(facts),M.el('p',M.t('senderClaimsNote'),{class:'note sender-note'}));if(options.locateSender)content.append(M.button('locateSender',options.locateSender,'locate-link'));}
   if(group.link){
    const first=group.occurrences[0].link;
    // These exact values are common to the group; show them once.
    const shared=M.evidenceFacts(first).filter(f=>f.label!==M.t('context'));
    content.append(M.renderFacts(shared));
    const entry=M.el('div','',{class:'url-entry evidence'});entry._findingKey=group.key;
    for(const occurrence of group.occurrences){
     const row=M.el('div','',{class:'occurrence'});
     // Preserve each original context, intent, evidence and location association.
     const extra=M.linkFacts(occurrence.link).filter(f=>![M.t('shownHost'),M.t('actualHost'),M.t('destinationHost')].includes(f.label));
     const context=M.evidenceFacts(occurrence.link).filter(f=>f.label===M.t('context'));
     if(extra.length||context.length)row.append(M.renderFacts([...extra,...context]));
     if(options.locate){const location=M.el('div','',{class:'occurrence-location'});const button=M.button('locateLink',()=>options.locate(occurrence.position,occurrence.link,button),'locate-link');button.dataset.position=String(occurrence.position);location.append(button);if(options.locateSender&&occurrence.link.senderEvidence?.address&&occurrence.link.findings.some(f=>['W01','H01','H02','W03','C04'].includes(f.id)))location.append(M.button('locateSender',options.locateSender,'locate-link'));row.append(location);}
     entry.append(row);
    }
    content.append(entry);
   }
   box.append(content);section.append(box);parent.append(section);
  }
  if(result.header){const d=M.el('details','',{class:'header-details'});d.append(M.el('summary',M.t('headers')),M.el('p',M.t('headerNote'),{class:'note'}));
   for(const a of result.header.authClaims.slice(0,20))d.append(M.el('p',M.clean(`${a.method.toUpperCase()} = ${a.result} [${a.authservId}]`),{class:'mono'}));
   for(const sig of result.header.dkim.slice(0,10))d.append(M.el('p',M.clean('DKIM d='+(sig.d||'?')+'; s='+(sig.s||'?')),{class:'mono'}));parent.append(d);
  }
  parent.append(M.el('p',M.t('coverage'),{class:'note coverage-note'}));
 };
 M.renderResult=(result,parent)=>{parent.replaceChildren();parent.append(M.el('strong',M.resultLabel(result),{class:'badge level-'+result.level}));M.appendReasons(parent,result);};
 M.translatePage=()=>{document.documentElement.lang=M.locale.replace('_','-');document.documentElement.dir=M.locale==='ar'?'rtl':'ltr';for(const e of document.querySelectorAll('[data-i18n]'))e.textContent=M.t(e.dataset.i18n);for(const e of document.querySelectorAll('[data-placeholder]'))e.placeholder=M.t(e.dataset.placeholder);};
})();

globalThis.MCG.mailCss = ":host{all:initial;display:block;margin:6px 0;color-scheme:light;--surface:#ffffff;--text:#0f172a;--muted:#475569;--line:#dce2e9;--soft:#f8fafc;--focus:#246b87;--warn:#92400e;--warn-bg:#fffbeb;--warn-line:#ead9aa;--risk:#a13a28;--risk-bg:#fff3ef;--risk-line:#efc7bc}\n*{box-sizing:border-box}button,summary{cursor:pointer}button{font:inherit;border:1px solid var(--line);border-radius:6px;padding:9px 13px;background:var(--surface);color:var(--text);font-weight:600}\nbutton:focus-visible,summary:focus-visible{outline:3px solid var(--focus);outline-offset:3px}\n.wrap{font:13px/1.55 system-ui,-apple-system,'Segoe UI',sans-serif;color:var(--text);background:var(--surface);border:1px solid var(--line);border-radius:6px;min-width:0}\n.wrap>summary{display:flex;gap:10px;align-items:flex-start;list-style:none;min-height:34px;padding:9px 11px}\nsummary::-webkit-details-marker{display:none}.brand-mark{display:block;width:24px;height:24px;flex:none}.summary-copy{display:grid;gap:4px;min-width:0;flex:1}.summary-heading{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.summary-title{font-size:11px;padding:1px 6px;border-radius:4px;background:var(--soft);font-weight:650}.summary-reason{font-size:12px;overflow-wrap:anywhere;min-width:0}\n.wrap.CAUTION,.wrap.WARNING{border-color:var(--warn-line)}.wrap.HIGH_RISK{border-color:var(--risk-line)}.CAUTION .summary-title,.WARNING .summary-title{background:var(--warn-bg);color:var(--warn)}.HIGH_RISK .summary-title{background:var(--risk-bg);color:var(--risk)}\n.summary-evidence{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px;min-width:0;font-size:13px;color:var(--text)}.evidence-fact{display:inline-flex;flex-wrap:wrap;gap:4px;align-items:baseline;min-width:0;max-width:100%}.evidence-label{color:var(--muted);font-size:11px}.evidence-value{font-weight:650;white-space:normal;overflow-wrap:anywhere;min-width:0;max-width:100%;unicode-bidi:isolate}.summary-host{direction:ltr;unicode-bidi:isolate}.relation-separator{color:var(--muted)}.summary-actions{display:flex;flex-wrap:wrap;gap:6px 14px;color:var(--muted);font-size:11px}.details-label:after{content:' +';font-weight:650}.wrap[open] .details-label:after{content:' −'}\n.wrap.quiet:not([open]){width:34px;margin-left:auto;background:var(--surface);color:var(--muted)}.quiet:not([open])>summary{padding:0;align-items:center;justify-content:center;width:32px;height:32px;min-height:32px}.quiet:not([open]) .summary-copy{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n.body{padding:10px 12px;color:var(--text);background:var(--surface);border-top:1px solid var(--line);border-radius:0 0 6px 6px;overflow-wrap:anywhere}\n.brand{font-weight:700;color:var(--text);font-size:13px}.note,.muted,.mono{font-size:12px;color:var(--muted)}.note{margin:10px 0 0}.badge{display:inline-flex;align-items:center;padding:3px 7px;border-radius:4px;background:var(--soft);color:var(--text);font-size:11px;font-weight:650;max-width:100%;flex:none}.level-HIGH_RISK{background:var(--risk-bg);color:var(--risk)}.level-WARNING,.level-CAUTION{background:var(--warn-bg);color:var(--warn)}\n.link-card{padding:10px 0;border-bottom:1px solid var(--line)}.link-card:last-of-type{border-bottom:0}.card-head{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap}.host{font-weight:650;overflow-wrap:anywhere;unicode-bidi:isolate;text-align:left;min-width:0}.mono{font-family:ui-monospace,monospace;overflow-wrap:anywhere}\n.facts{display:grid;grid-template-columns:minmax(90px,16%) minmax(0,1fr);gap:5px 12px;margin:10px 0}.fact-label{font-size:11px;color:var(--muted)}.fact-value{margin:0;font-size:12px;overflow-wrap:anywhere;white-space:pre-wrap;unicode-bidi:isolate}\n.finding-list{margin:5px 0;padding-inline-start:18px}.finding{margin:3px 0;color:var(--text)}.evidence{margin:6px 0 0}.evidence>summary,.header-details>summary{color:var(--muted);font-size:12px}.header-details{margin-top:10px}.coverage-note{border-top:1px solid var(--line);padding-top:9px}\ndialog{font:14px/1.6 system-ui,sans-serif;color:var(--text);border:1px solid var(--line);border-radius:10px;background:var(--surface);width:620px;max-width:calc(100vw - 32px);max-height:85vh;padding:22px;overflow:auto}dialog::backdrop{background:#14251f88}dialog h2{margin:0 0 12px;font-size:22px}dialog .buttons{display:flex;gap:9px;flex-wrap:wrap;justify-content:flex-end;margin-top:20px}dialog pre{white-space:pre-wrap;overflow-wrap:anywhere;direction:ltr;text-align:left;background:var(--soft);padding:12px;border-radius:4px;font-size:12px}.danger{background:var(--risk);color:var(--surface);border-color:var(--risk)}\n@media(max-width:600px){.wrap>summary{gap:8px}.facts{grid-template-columns:1fr;gap:2px}.fact-value{margin-bottom:7px}.summary-heading{gap:4px 8px}}\n:host([data-theme=\"dark\"]){color-scheme:dark;--surface:#20242b;--text:#f1f5f9;--muted:#c0cad7;--line:#46505e;--soft:#2a303a;--focus:#8bc5e3;--warn:#ffd58a;--warn-bg:#3a3020;--warn-line:#746144;--risk:#ffc4b5;--risk-bg:#3d2d2a;--risk-line:#815b52}\n@media(forced-colors:active){.wrap,.body,button,dialog{border-color:CanvasText}.summary-icon,.summary-title,.summary-reason,.finding{color:CanvasText}}\n/* 1.0.3: the first disclosure contains evidence directly; only meaningful\n   multi-pair / multi-URL collections add another level. */\n.warning-category+.warning-category{border-top:1px solid var(--line);margin-top:12px;padding-top:10px}.category-title{font-size:13px;line-height:1.55;font-weight:650;margin:0 0 7px}.pair-group{padding:4px 0}.pair-group+ .pair-group{border-top:1px solid var(--line);margin-top:7px;padding-top:8px}.pair-group>summary{display:flex;gap:8px;flex-wrap:wrap;align-items:baseline;list-style:none;padding:6px 0}.pair-group>summary::before,.url-entry>summary::before{content:'+';font-weight:700;flex:none}.pair-group[open]>summary::before,.url-entry[open]>summary::before{content:'−'}.pair-count{margin:0}.url-entry{border-inline-start:2px solid var(--line);padding-inline-start:10px;margin:7px 0}.url-entry:only-child{border:0;padding-inline-start:0;margin:0}.url-summary{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap;color:var(--text)!important}.url-summary bdi{overflow-wrap:anywhere;min-width:0;max-width:100%;font-family:ui-monospace,monospace;font-size:12px}.url-summary .note{margin:0}.occurrence+.occurrence{border-top:1px dashed var(--line);padding-top:5px;margin-top:9px}.occurrence-location{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.occurrence-location .note{margin:0}.locate-link{font-size:11px;padding:5px 9px}.proceed-link{display:inline-flex;align-items:center;text-decoration:none;border:1px solid var(--risk);border-radius:6px;padding:9px 13px;font-weight:600}.proceed-link:focus-visible{outline:3px solid var(--focus);outline-offset:3px}dialog .buttons{align-items:stretch}dialog .link-card{border:0}.body>.coverage-note:first-child{border-top:0;padding-top:0}\n@media(forced-colors:active){.proceed-link{color:LinkText;background:Canvas;border-color:LinkText}.pair-group,.url-entry,.occurrence{border-color:CanvasText}}\n\n/* 1.0.8: quiet, destination-first cards. Gmail supplies the font; no font fetch. */\n:host{font-family:inherit;--alert:#b3261e;--alert-bg:#fff1ef;--alert-line:#efc4bf}\n.wrap{font-family:inherit;font-size:13px;line-height:1.6;border-radius:12px;box-shadow:0 1px 2px #0f172a04}\n.wrap>summary{gap:12px;padding:14px 16px;min-height:56px}\n.brand-mark{width:26px;height:26px;margin-top:1px}\n.summary-copy{gap:6px}.summary-heading{gap:6px 10px}.summary-title{padding:2px 8px;border-radius:6px;font-size:11px;line-height:1.6;font-weight:650}.summary-reason{font-size:13px;line-height:1.55}\n.summary-actions{gap:8px 16px;font-size:11px}.details-label{margin-inline-start:auto;white-space:nowrap}\n.wrap.CAUTION{border-color:var(--warn-line)}.wrap.WARNING{border-color:var(--alert-line)}.wrap.HIGH_RISK{border-color:var(--risk-line);border-inline-start:3px solid var(--risk)}\n.WARNING .summary-title{color:var(--alert);background:var(--alert-bg)}\n.body{padding:16px;border-radius:0 0 12px 12px;border-top-color:var(--line)}\n.warning-group+.warning-group{border-top:1px solid var(--line);margin-top:12px;padding-top:12px}\n.warning-group .pair-group{margin:0;padding:0;border:0;min-width:0}.group-heading{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap}\n.warning-group .group-summary{padding:8px 0;gap:8px 10px;align-items:center}.group-summary .summary-evidence{flex:1;min-width:150px}\n.reason-count{font-size:11px;font-weight:600;line-height:1.5;color:var(--muted);background:var(--soft);border:1px solid var(--line);padding:2px 8px;border-radius:20px;white-space:nowrap}\n.reason-list{display:grid;gap:9px;list-style:none;padding:0;margin:0 0 16px}.group-heading+.group-content .reason-list,.group-summary+.group-content .reason-list{margin-top:12px}\n.reason-item{display:flex;align-items:baseline;gap:9px;font-size:13px;line-height:1.6;margin:0;min-width:0}.reason-copy{min-width:0;overflow-wrap:anywhere}.reason-dot{width:6px;height:6px;flex:none;border-radius:50%;background:var(--muted);align-self:flex-start;margin-top:8px}.reason-CAUTION .reason-dot{background:var(--warn)}.reason-WARNING .reason-dot{background:var(--alert)}.reason-HIGH_RISK .reason-dot{background:var(--risk)}\n.group-content>.facts{background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin:12px 0}\n.facts{gap:6px 14px}.fact-label{font-size:11px;line-height:1.7}.fact-value{font-size:12px;line-height:1.7}\n.warning-group .url-entry{border:0;padding:0;margin:0}.occurrence+.occurrence{border-top:1px solid var(--line);margin-top:12px;padding-top:10px}.occurrence .facts{margin:8px 0 12px}.occurrence-location{gap:10px}.locate-link{border-radius:6px;padding:6px 10px;font-size:11px;font-weight:600;background:var(--surface)}\n.coverage-note{font-size:11px;line-height:1.7;margin-top:16px;padding-top:12px;color:var(--muted)}\n.level-WARNING{color:var(--alert);background:var(--alert-bg)}\ndialog{font-family:inherit;border-radius:16px;padding:24px}dialog .brand{font-size:12px;color:var(--muted);margin-bottom:10px}dialog h2{font-size:21px;line-height:1.4;font-weight:650}.proceed-link,dialog button{border-radius:8px}\n:host([data-theme=\"dark\"]){--alert:#ffb4ab;--alert-bg:#442a29;--alert-line:#88544f;--risk:#ffb4ab;--risk-bg:#512421;--risk-line:#bd6960}\n@media(max-width:600px){.wrap>summary{padding:12px;gap:10px}.body{padding:12px}.summary-reason{font-size:12px}.group-content>.facts{padding:10px}.details-label{margin-inline-start:0}.facts{gap:2px}.reason-item{font-size:12px}}\n@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}\n@media(forced-colors:active){.wrap,.body,.group-content>.facts,.reason-count{border-color:CanvasText}.reason-dot{background:CanvasText}.reason-count{color:CanvasText;background:Canvas}.group-summary .badge{border:1px solid CanvasText}}\n\n.group-destination{flex-basis:100%;min-width:0;overflow-wrap:anywhere;font-size:11px;font-weight:400;line-height:1.7;color:var(--muted);unicode-bidi:isolate;text-align:start}\n";
(() => {
 'use strict';const M=globalThis.MCG;if(globalThis.__MCG_STARTED__)return;globalThis.__MCG_STARTED__=true;
 let settings={...M.defaults,enabled:false}, timer=0, accountKey=location.pathname, scanning=false, rescan=false;
 const states=new Map(),owned=new WeakSet();let activeDialog=null;let highlight=null;
 const routeKey=()=>location.pathname+location.search+location.hash;
 const css=M.mailCss;
 const isOwn=node=>{let n=node;for(let i=0;n&&i<8;i++,n=n.parentNode||n.host)if(owned.has(n))return true;return false;};
 const visible=e=>e.isConnected&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden';
 function textWithin(root,max=1000){const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:n=>{
  if(n.nodeType===1){if(isOwn(n)||n.matches('script,style,textarea,input,select,[contenteditable="true"],.gmail_quote,blockquote'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_SKIP;}
  return NodeFilter.FILTER_ACCEPT;}});let s='',n,count=0;while((n=walker.nextNode())&&count++<M.LIMIT.nodes){s+=n.nodeValue+' ';if(s.length>max)break;}return s.slice(0,max);}
 // Recover the target's sentence when a nearby paragraph has several links.
 // DOM offsets, not text search, bind repeated labels to the correct occurrence.
 // Paragraph breaks and other links remain boundaries; no whole-message scoring.
 function nearbySentence(anchor,container){
  const blockTags=new Set(['P','DIV','LI','TD','TH','H1','H2','H3','H4','BLOCKQUOTE','SECTION','ARTICLE','FOOTER','HEADER']);
  const stack=[{node:container,exit:false}],ranges=new Map();let text='',nodes=0;
  const separator=()=>{if(text&&!text.endsWith('\n'))text+='\n';};
  while(stack.length){const {node,exit}=stack.pop();
   if(exit){if(ranges.has(node))ranges.get(node).end=text.length;if(node!==container&&blockTags.has(node.tagName))separator();continue;}
   if(++nodes>M.LIMIT.nodes)return null;
   if(node.nodeType===3){text+=node.nodeValue+' ';if(text.length>M.LIMIT.context)return null;continue;}
   if(node.nodeType!==1||isOwn(node)||node.matches('script,style,textarea,input,select,[contenteditable="true"],.gmail_quote,blockquote'))continue;
   if(node.tagName==='BR'||node!==container&&blockTags.has(node.tagName))separator();
   if(node.matches('a[href]'))ranges.set(node,{start:text.length,end:text.length});
   stack.push({node,exit:true});for(let i=node.childNodes.length-1;i>=0;i--)stack.push({node:node.childNodes[i],exit:false});
  }
  const target=ranges.get(anchor);if(!target||target.end<=target.start)return null;
  const boundaries=[0];for(const match of text.matchAll(/[.!?。！？;；]\s+|\n+/g)){const at=match.index+match[0].length;if(at<=target.start||at>=target.end)boundaries.push(at);}boundaries.push(text.length);
  const start=Math.max(...boundaries.filter(x=>x<=target.start)),end=Math.min(...boundaries.filter(x=>x>=target.end));
  const linked=[...ranges].filter(([,r])=>r.start<end&&r.end>start),context=text.slice(start,end).trim();
  const web=linked.filter(([node])=>!!M.validHttp(node.href||node.getAttribute('href')||''));
  const mailReferences=linked.every(([node])=>node===anchor||/^mailto:/i.test(node.getAttribute('href')||'')&&M.mailboxInfo(textWithin(node,500).trim()).address);
  const oneWebAccount=web.length===1&&web[0][0]===anchor&&mailReferences&&!M.context(context).secretRequest;
  return context?{context,binding:linked.length===1||oneWebAccount?'block':'ambiguous'}:null;
 }
 function layoutInstruction(anchor,wrapper,body){
  const label=M.normalize(textWithin(anchor,500));let current=wrapper;
  const inline=new Set(['SPAN','B','STRONG','EM','I','SMALL','FONT']);
  for(let depth=0;current&&depth<3&&body.contains(current);depth++){
   if(!['DIV','SPAN'].includes(current.tagName)||M.normalize(textWithin(current,M.LIMIT.context))!==label)return null;
   const parent=current.parentElement;if(!parent||!body.contains(parent)||parent.querySelectorAll('a[href]').length!==1)return null;
   let prefix='',valid=true;
   for(const node of parent.childNodes){if(node===current)break;if(node.nodeType===3)prefix+=node.nodeValue+' ';else if(node.nodeType===1&&inline.has(node.tagName)&&!isOwn(node))prefix+=textWithin(node,M.LIMIT.context)+' ';else if(node.nodeType===1&&!isOwn(node)){valid=false;break;}}
   prefix=prefix.split(/[.!?。！？]\s+|[\r\n]+/).at(-1).trim();
   // Recover only direct adjacent instructional prose, not a previous paragraph,
   // completed unrelated sentence, footer, or another destination's action.
   if(valid&&prefix&&prefix.length+label.length<=M.LIMIT.context&&M.context(prefix).active&&!/[.!?。！？]$/.test(prefix))return {context:prefix+' '+textWithin(anchor,500),binding:'block'};
   if(M.normalize(textWithin(parent,M.LIMIT.context))!==label)return null;current=parent;
  }
  return null;
 }
 function linkInput(a,body,index=0){const label=textWithin(a,500)||(a.getAttribute('aria-label')||'').slice(0,500);let block=a.parentElement,nearby=null;
  // Stop at the nearest semantic text block, even when this is the only link
  // in the message. An unrelated footer must never supply its account action.
  const blockTags=new Set(['P','DIV','LI','TD','TH','H1','H2','H3','H4','SECTION','ARTICLE','FOOTER','HEADER']);
  for(let i=0;block&&i<5&&body.contains(block);i++,block=block.parentElement){
   const candidate=nearbySentence(a,block);if(candidate)nearby=candidate;
   if(blockTags.has(block.tagName)||block===body){if(candidate&&M.normalize(candidate.context)===M.normalize(label))nearby=layoutInstruction(a,block,body)||candidate;break;}
  }
  const quoted=!!a.closest('blockquote,.gmail_quote');
  return {id:String(index),href:a.href||a.getAttribute('href')||'',label,context:nearby?.context||textWithin(a,M.LIMIT.context),binding:nearby?.binding||'anchor',quoted};
 }
 function senderElementFor(body){const root=body.closest('.adn,[data-message-id],[data-legacy-message-id]');if(!root)return null;for(const el of root.querySelectorAll('span[email]'))if(!body.contains(el)&&!isOwn(el))return el;return null;}
 function senderFor(body){return (senderElementFor(body)?.getAttribute('email')||'').slice(0,500);}
 function senderIdentity(body){const el=senderElementFor(body);return {sender:senderFor(body),senderName:el?textWithin(el,200).trim():''};}
 function messageIdentityKey(body){const root=body.closest('.adn,[data-message-id],[data-legacy-message-id]');return JSON.stringify([root?.getAttribute('data-message-id')||'',root?.getAttribute('data-legacy-message-id')||'']);}
 // Label spellings come from checked-in official desktop-help evidence.
 // Format normalization applies only to labels, never sender/domain/URL values.
 const normalizeDetailLabel=value=>typeof value==='string'?value.normalize('NFKC').replace(/[\u200e\u200f\u061c]/g,'').replace(/[\u064b-\u0652\u0670]/g,'').replace(/\s+/g,' ').trim().replace(/[:：]$/,'').trim().toLowerCase():'';
 const detailLabelMap=new Map();
 for(const row of Object.values(M.GMAIL_DETAIL_LABELS||{}))for(const key of ['mailedBy','signedBy'])for(const value of row[key]||[]){const label=normalizeDetailLabel(value);if(!label)continue;const previous=detailLabelMap.get(label);detailLabelMap.set(label,previous!==undefined&&previous!==key?null:key);}
 function displayedSenderDetails(body,identity){
  const unavailable={unavailable:true};const root=body.closest('.adn,[data-message-id],[data-legacy-message-id]');if(!root)return unavailable;
  // Only Gmail-owned details within this exact message, never body/quotes or
  // detached/global popups. Ambiguous ownership or duplicate rows is unavailable.
  const bodies=[...root.querySelectorAll('.a3s')].filter(n=>!n.closest('[contenteditable="true"]')&&visible(n));if(bodies.length!==1||bodies[0]!==body)return unavailable;
  const popups=[...root.querySelectorAll('div.ajA')].filter(p=>!body.contains(p)&&!isOwn(p)&&visible(p)&&p.closest('.adn,[data-message-id],[data-legacy-message-id]')===root);
  if(!popups.length)return undefined;if(popups.length!==1)return unavailable;const tables=[...popups[0].querySelectorAll('table.ajC')];if(tables.length!==1)return unavailable;
  const values={};let ambiguous=false;
  for(const row of tables[0].querySelectorAll('tr.ajv')){
   const th=[...row.children].filter(n=>n.matches('th.gG[scope="row"]')),td=[...row.children].filter(n=>n.matches('td.gL'));if(th.length!==1||td.length!==1)continue;
   const labels=[...th[0].children].filter(n=>n.matches('span.gI')),fields=[...td[0].children].filter(n=>n.matches('span.gI'));if(labels.length!==1||fields.length!==1)continue;
   const label=normalizeDetailLabel(labels[0].textContent),key=detailLabelMap.get(label);if(!key)continue;
   const value=M.senderDomain(fields[0].textContent);if(!value||Object.hasOwn(values,key)){ambiguous=true;break;}values[key]=value;
  }
  const fromAddress=M.mailboxInfo(identity.sender).address;
  return !ambiguous&&fromAddress&&Object.keys(values).length?{...values,fromAddress,source:'GMAIL_DETAILS'}:unavailable;
 }
 function extract(body,anchors=[],state=null){const links=[];let partial=false;const walker=document.createTreeWalker(body,NodeFilter.SHOW_ELEMENT,{acceptNode:n=>{if(isOwn(n)||n.matches('script,style,textarea,[contenteditable="true"]'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});let node,count=0;
  while((node=walker.nextNode())){if(++count>M.LIMIT.nodes){partial=true;break;}if(node.matches('a[href]')){if(links.length>=M.LIMIT.links){partial=true;break;}anchors.push(node);links.push(linkInput(node,body,links.length));}}
  const identity=senderIdentity(body),root=body.closest('.adn,[data-message-id],[data-legacy-message-id]');
  const key=JSON.stringify([identity,links,root?.getAttribute('data-message-id')||'',root?.getAttribute('data-legacy-message-id')||'']);
  if(state&&(state.senderObservationKey!==key||state.senderObservationRoot!==root)){state.senderObservationKey=key;state.senderObservationRoot=root;state.senderObservations=null;}
  const observed=displayedSenderDetails(body,identity);if(state&&observed)state.senderObservations=observed.unavailable?null:observed;
  return {...identity,senderObservations:(observed&&!observed.unavailable?observed:null)||state?.senderObservations||undefined,links,partial};
 }
 function dispose(state){state.senderMarker?.remove();state.senderMarker=null;state.senderObservations=null;state.senderObservationKey='';state.senderObservationRoot=null;state.host?.remove();for(const marker of state.markers||[])marker.remove();state.markers=[];state.anchors=[];state.input=null;state.result=null;state.signature='';if(highlight?.state===state)clearHighlight();}
 function clear(){clearHighlight();for(const s of states.values())dispose(s);states.clear();if(activeDialog)closeDialog(activeDialog.host,activeDialog.focus);}
 function mailTheme(body){let node=body.parentElement;for(let i=0;node&&i<16;i++,node=node.parentElement){const color=getComputedStyle(node).backgroundColor;if(!/^rgba?\(/.test(color))continue;const c=color.match(/[\d.]+/g)?.map(Number);if(c&&c.length>=3&&(c.length===3||c[3]>=.95))return (.2126*c[0]+.7152*c[1]+.0722*c[2])<128?'dark':'light';}return matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';}
 function render(body,state){const result=state.result,level=result.level;
  if(!state.host?.isConnected){state.host?.remove();state.host=document.createElement('div');state.host.dataset.mailcontextGuard='';owned.add(state.host);state.shadow=state.host.attachShadow({mode:'open'});body.before(state.host);}
  else if(state.host.nextElementSibling!==body)body.before(state.host);
  const root=state.shadow,old=root.querySelector('.wrap'),wasOpen=!!old?.open;
  const previousFocus=root.activeElement,focused=[...root.querySelectorAll('summary')].indexOf(previousFocus),focusKey=previousFocus?.parentElement?._findingKey;
  const expanded=new Set([...root.querySelectorAll('.evidence[open],.pair-group[open]')].map(e=>e._findingKey));
  const quiet=result.state==='READY'&&(level==='NO_FINDINGS'||level==='INFO'&&!settings.showInfo);
  state.host.dataset.theme=mailTheme(body);
  const label=M.resultLabel(result),model=M.summaryModel(result),reason=model.reason;
  const style=M.el('style',css),wrap=M.el('details','',{class:'wrap '+level+(quiet?' quiet':''),dir:M.locale==='ar'?'rtl':'ltr',lang:M.locale.replace('_','-')});wrap.open=wasOpen;
  const name='Mail Guard · '+label+(reason?' · '+reason:'')+(model.evidence.facts.length?' · '+model.evidence.facts.map(f=>f.label+': '+f.value).join(model.evidence.relation?' → ':' · '):'')+(model.reasonCount?' · '+M.t('reasonCount',{n:model.reasonCount}):'')+' · '+M.t('details');
  const summary=M.el('summary','',{'aria-label':name,'aria-expanded':wasOpen,'aria-controls':'message-details',title:name});summary.append(M.brandMark());
  const copy=M.el('span','',{class:'summary-copy'}),heading=M.el('span','',{class:'summary-heading'});heading.append(M.el('strong',label,{class:'summary-title'}));if(reason)heading.append(M.el('span',reason,{class:'summary-reason'}));copy.append(heading);
  if(model.evidence.facts.length)copy.append(M.renderSummaryEvidence(model.evidence));
  const more=M.el('span','',{class:'summary-actions'});if(model.reasonCount)more.append(M.el('span',model.linkGroupCount?M.t('groupReasonCount',{groups:model.linkGroupCount,reasons:model.reasonCount}):M.t('reasonCount',{n:model.reasonCount}),{class:'other-findings'}));if(model.linkCount>model.linkGroupCount)more.append(M.el('span',M.t('occurrences',{n:model.linkCount}),{class:'other-findings'}));more.append(M.el('span',M.t(wasOpen?'close':'details'),{class:'details-label'}));copy.append(more);summary.append(copy);wrap.append(summary);
  const detail=M.el('div','',{class:'body',id:'message-details'});M.appendReasons(detail,result,{summaryVisible:true,locateSender:()=>locateSender(body,state),locate:(position,link,button)=>locateLink(body,state,position,link,button)});wrap.append(detail);
  wrap.addEventListener('toggle',()=>{summary.setAttribute('aria-expanded',String(wrap.open));summary.querySelector('.details-label').textContent=M.t(wrap.open?'close':'details');});
  wrap.addEventListener('keydown',e=>{if(e.key==='Escape'&&wrap.open){wrap.open=false;summary.focus();e.stopPropagation();}});
  root.replaceChildren(style,wrap);for(const e of root.querySelectorAll('.evidence,.pair-group'))if(expanded.has(e._findingKey))e.open=true;
  if(focused>=0){const target=focusKey?[...root.querySelectorAll('.evidence,.pair-group')].find(e=>e._findingKey===focusKey)?.querySelector('summary'):summary;(target||summary).focus({preventScroll:true});}
 }
 async function scan(){if(scanning){rescan=true;return;}if(!settings.enabled)return;
  scanning=true;try{
   if(location.pathname!==accountKey){clear();accountKey=location.pathname;}
   const bodies=[...document.querySelectorAll('.a3s')].filter(b=>!b.closest('[contenteditable="true"]')&&visible(b)).slice(0,60);const keep=new Set(bodies);
   for(const [b,s]of states)if(!keep.has(b)){dispose(s);states.delete(b);}
   for(const body of bodies){if(!settings.enabled)break;let state=states.get(body);if(!state){state={revision:0,host:null,signature:''};states.set(body,state);}
    const anchors=[],input=extract(body,anchors,state),signature=JSON.stringify(input);state.anchors=anchors;if(signature!==state.signature){state.revision++;state.signature=signature;state.input=input;state.result=M.analyzeMessage(input);render(body,state);installMarkers(body,state);}else if(!state.host?.isConnected||state.host.nextElementSibling!==body)render(body,state);
    if(state.host)state.host.dataset.theme=mailTheme(body);installSenderMarker(body,state);if((state.markers||[]).some(m=>!m.isConnected))installMarkers(body,state);await new Promise(resolve=>setTimeout(resolve,0));
   }
  }finally{scanning=false;if(rescan){rescan=false;schedule();}}
 }
 function schedule(){clearTimeout(timer);timer=setTimeout(()=>scan().catch(()=>{}),120);}
 function clearHighlight(){if(!highlight)return;clearTimeout(highlight.timer);highlight.overlay.remove();if(highlight.tabAdded&&highlight.anchor.getAttribute('tabindex')==='-1')highlight.anchor.removeAttribute('tabindex');highlight=null;}
 function locateLink(body,state,position,link,button){
  const anchor=state.anchors?.[position-1];
  if(!settings.enabled||!body.isConnected||!anchor?.isConnected||!body.contains(anchor)||anchor.href!==(link.info.raw||link.info.url)||states.get(body)!==state){if(button)button.textContent=M.t('linkChanged');schedule();return;}
  highlightElement(anchor,state);
 }
 function highlightElement(anchor,state){
  clearHighlight();anchor.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});const tabAdded=!anchor.hasAttribute('tabindex');if(tabAdded)anchor.setAttribute('tabindex','-1');anchor.focus({preventScroll:true});
  // An extension-owned overlay never rewrites the mail anchor's styles or href.
  const overlay=document.createElement('div');owned.add(overlay);overlay.dataset.mailcontextHighlight='';const shadow=overlay.attachShadow({mode:'open'});shadow.append(M.el('style',':host{position:fixed;pointer-events:none;z-index:2147483646;box-sizing:border-box;border:3px dashed #92400e;outline:2px solid white;border-radius:3px;background:#fff4c233}'));document.documentElement.append(overlay);
  const place=()=>{if(!anchor.isConnected){clearHighlight();return;}const r=anchor.getBoundingClientRect();Object.assign(overlay.style,{left:(r.left-4)+'px',top:(r.top-4)+'px',width:(r.width+8)+'px',height:(r.height+8)+'px'});};
  highlight={anchor,state,overlay,tabAdded,timer:setTimeout(clearHighlight,4500),place};place();
 }
 window.addEventListener('scroll',()=>highlight?.place(),true);window.addEventListener('resize',()=>highlight?.place());
 function locateSender(body,state){
  const sender=senderElementFor(body);
  if(!settings.enabled||states.get(body)!==state||!body.isConnected||!sender?.isConnected||M.mailboxInfo(senderFor(body)).address!==state.result.senderEvidence?.address){schedule();return;}
  highlightElement(sender,state);
 }
 function installSenderMarker(body,state){
  const sender=senderElementFor(body),result=state.result;
  const strong=result.links.some(link=>link.findings.some(f=>['W01','H01','H02','W03'].includes(f.id)));
  const info=result.findings.some(f=>!!f.senderEvidence);
  if(!sender||!strong&&(!info||!settings.showInfo)){state.senderMarker?.remove();state.senderMarker=null;return;}
  const level=strong?result.level:'INFO',key=level+'|'+senderFor(body)+'|'+settings.language+'|'+mailTheme(body);
  if(state.senderMarker?.isConnected&&state.senderMarker._senderKey===key&&state.senderElement===sender)return;
  state.senderMarker?.remove();const marker=document.createElement('span');owned.add(marker);marker.dataset.mailcontextSenderMarker='';marker.dataset.theme=mailTheme(body);marker._senderKey=key;state.senderElement=sender;
  marker.setAttribute('dir',M.locale==='ar'?'rtl':'ltr');marker.setAttribute('lang',M.locale.replace('_','-'));
  const shadow=marker.attachShadow({mode:'open'});shadow.append(M.el('style',':host{display:inline-block;vertical-align:baseline;margin-inline-start:6px;font-family:inherit}button{font-family:inherit;font-size:11px;line-height:1.5;font-weight:600;border:1px solid #c4c7c5;border-radius:12px;padding:2px 8px;color:#444746;background:#f2f4f3;cursor:pointer}button.WARNING{color:#b3261e;background:#fff1ef;border-color:#efc4bf}button.HIGH_RISK{color:#9b211c;background:#fce8e6;border-color:#d58b84}button:focus-visible{outline:3px solid #246b87;outline-offset:3px}:host([data-theme=dark]) button{color:#e3e6e5;background:#303735;border-color:#67726d}:host([data-theme=dark]) button.WARNING,:host([data-theme=dark]) button.HIGH_RISK{color:#ffb4ab;background:#442a29;border-color:#aa6860}@media(forced-colors:active){button{color:ButtonText;background:ButtonFace;border-color:ButtonText}}'));
  const button=M.el('button',M.t(strong?'senderLinkWarning':'senderInfo'),{type:'button',class:level,'aria-label':M.t('senderContext')+' · '+M.t(level)+' · '+M.t('senderClaimsNote'),title:M.t('senderClaimsNote')});
  button.addEventListener('click',()=>{const wrap=state.shadow?.querySelector('.wrap');if(wrap){wrap.open=true;wrap.querySelector('summary')?.focus({preventScroll:true});state.host.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}});
  shadow.append(button);sender.after(marker);state.senderMarker=marker;
 }
 function installMarkers(body,state){
  for(const marker of state.markers||[])marker.remove();state.markers=[];
  state.result.links.forEach((link,index)=>{if(!M.warnsInMail(link))return;const anchor=state.anchors[index];if(!anchor?.isConnected)return;
   const marker=document.createElement('span');owned.add(marker);marker.dataset.mailcontextMarker='';marker.setAttribute('lang',M.locale.replace('_','-'));marker.setAttribute('dir',M.locale==='ar'?'rtl':'ltr');const shadow=marker.attachShadow({mode:'open'});
   shadow.append(M.el('style',':host{display:inline-block;max-width:100%;vertical-align:baseline;margin:2px 3px;font:inherit;font-size:11px;line-height:1.5;color:#713f12}.marker-destination{display:inline;background:#fffbeb;color:#713f12;border-radius:3px;padding:2px 4px;margin-inline-start:3px;overflow-wrap:anywhere}.marker-destination-label{font-weight:500}.marker-url{overflow-wrap:anywhere;unicode-bidi:isolate;user-select:text}.marker-full-url{display:block;max-width:100%;overflow-wrap:anywhere;white-space:normal;unicode-bidi:isolate;background:#fffbeb;padding:4px;user-select:text}.marker-full-url[hidden]{display:none}.destination-toggle{margin-inline-start:4px}button{font-family:inherit;font-size:11px;font-weight:600;line-height:1.35;color:#713f12;background:#fffbeb;border:1px solid #b38b44;border-radius:3px;padding:1px 4px;cursor:pointer}button:focus-visible{outline:3px solid #246b87;outline-offset:2px}@media(forced-colors:active){button{color:ButtonText;background:ButtonFace;border-color:ButtonText}}'));
   const button=M.el('button','⚠ '+M.t('warningMarker'),{type:'button','aria-label':M.t('locateWarning')+' · '+M.t(link.level),title:M.t('locateWarning')+' · '+M.t(link.findings[0]?.reason||'coverage')+' · '+M.t('coverage')});
   button.addEventListener('click',()=>{const wrap=state.shadow?.querySelector('.wrap');if(wrap)wrap.open=true;locateLink(body,state,index+1,link,button);});shadow.append(button,M.renderMarkerDestination(anchor.href));anchor.after(marker);state.markers.push(marker);
  });
 }
 function closeDialog(host,focus){host.remove();if(activeDialog?.host===host){clearTimeout(activeDialog.timer);activeDialog=null;}if(focus?.isConnected)focus.focus({preventScroll:true});}
 function confirmLink(a,body,result,event){event.preventDefault();event.stopImmediatePropagation();if(activeDialog)closeDialog(activeDialog.host,null);
  const original=a.href,originalTarget=a.target,originalRoute=routeKey(),snapshot=JSON.stringify(linkInput(a,body)),senderSnapshot=JSON.stringify(senderIdentity(body)),messageKey=messageIdentityKey(body),messageRoot=body.closest('.adn,[data-message-id],[data-legacy-message-id]');const focus=a;const host=document.createElement('div');owned.add(host);document.documentElement.append(host);
  const valid=()=>activeDialog?.host===host&&host.isConnected&&settings.enabled&&a.isConnected&&body.isConnected&&visible(body)&&body.contains(a)&&a.closest('.a3s')===body&&a.href===original&&a.target===originalTarget&&routeKey()===originalRoute&&JSON.stringify(linkInput(a,body))===snapshot&&JSON.stringify(senderIdentity(body))===senderSnapshot&&messageIdentityKey(body)===messageKey&&body.closest('.adn,[data-message-id],[data-legacy-message-id]')===messageRoot;
  activeDialog={host,focus,valid};const watch=()=>{if(activeDialog?.host!==host)return;if(!valid()){closeDialog(host,focus);return;}activeDialog.timer=setTimeout(watch,200);};activeDialog.timer=setTimeout(watch,200);const newContext=event.button===1||event.ctrlKey||event.metaKey||event.shiftKey||a.target==='_blank';
  const shadow=host.attachShadow({mode:'open'});shadow.append(M.el('style',css));const dialog=M.el('dialog','',{dir:M.locale==='ar'?'rtl':'ltr',lang:M.locale.replace('_','-'),'aria-label':M.t('confirm')});
  host.dataset.theme=mailTheme(body);dialog.append(M.el('p','Mail Guard',{class:'brand'}),M.el('h2',M.t('confirm')),M.status(result.level),M.renderLinkCard(result));
  dialog.append(M.el('p',M.t('coverage'),{class:'note'}));const buttons=M.el('div','',{class:'buttons'});
  const cancel=M.button('cancel',()=>closeDialog(host,focus));buttons.append(cancel);
  const copy=M.button('copy',async()=>{try{await navigator.clipboard.writeText(original);copy.textContent=M.t('copied');}catch{copy.textContent=M.t('copyUnavailable');}});buttons.append(copy);
  if(result.action!=='BLOCK_UNSUPPORTED'&&M.validHttp(original)){
   // A real anchor is activated by the user's second trusted click. This retains
   // browser navigation/security handling; analysis never visits the URL.
   const proceed=M.el('a',M.t('proceed'),{href:original,class:'danger proceed-link',target:newContext?'_blank':a.target||'_self',rel:'noopener noreferrer'});
   proceed.addEventListener('click',e=>{if(!e.isTrusted||!valid()){e.preventDefault();e.stopImmediatePropagation();closeDialog(host,focus);schedule();return;}setTimeout(()=>closeDialog(host,focus),0);});
   proceed.addEventListener('auxclick',e=>{if(!e.isTrusted||!valid()){e.preventDefault();e.stopImmediatePropagation();closeDialog(host,focus);schedule();return;}setTimeout(()=>closeDialog(host,focus),0);});buttons.append(proceed);
  }else dialog.append(M.el('p',M.t('unsupported')));
  dialog.append(buttons);shadow.append(dialog);dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog(host,focus);});dialog.showModal();cancel.focus();
 }
 function clickGuard(event){if(!settings.enabled||!event.isTrusted)return;if(event.type==='auxclick'&&event.button!==1)return;if(event.type==='click'&&event.button!==0)return;
  const a=event.composedPath().find(n=>n instanceof HTMLAnchorElement);if(!a)return;const body=a.closest('.a3s');if(!body||!visible(body)||body.closest('[contenteditable="true"]'))return;
  const input=linkInput(a,body);const result=M.analyzeLink(input,senderIdentity(body));if(M.warnsInMail(result))confirmLink(a,body,result,event);
 }
 document.addEventListener('click',clickGuard,true);document.addEventListener('auxclick',clickGuard,true);
 const observer=new MutationObserver(records=>{if(activeDialog&&!activeDialog.valid())closeDialog(activeDialog.host,activeDialog.focus);if(highlight&&!highlight.anchor.isConnected)clearHighlight();if(!settings.enabled)return;if([...states.values()].some(s=>s.host&&!s.host.isConnected||(s.markers||[]).some(m=>!m.isConnected))){schedule();return;}if(records.every(r=>isOwn(r.target)||r.type==='childList'&&[...r.addedNodes,...r.removedNodes].length>0&&[...r.addedNodes,...r.removedNodes].every(isOwn)))return;schedule();});
 observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['href','class','style','hidden','aria-expanded','email','target','data-message-id','data-legacy-message-id']});
 function apply(s){try{settings=M.validateSettings(s);}catch{return;}M.setLocale(settings.language);clear();if(settings.enabled)schedule();}
 chrome.runtime.onMessage.addListener((msg,sender,reply)=>{
  if(sender.id!==chrome.runtime.id)return false;
  if(msg?.type==='SETTINGS_CHANGED'){apply(msg.settings);reply({ok:true});}
  if(msg?.type==='GET_STATE'){
   scan().then(()=>{reply({ok:true,enabled:settings.enabled,messages:[...states.values()].filter(s=>s.result).slice(0,60).map((s,i)=>({index:i+1,result:{level:s.result.level,state:s.result.state,findings:s.result.findings,coverage:s.result.coverage,links:s.result.links}}))});}).catch(()=>reply({ok:false}));return true;
  }
 });
 window.addEventListener('hashchange',()=>{clear();schedule();});window.addEventListener('popstate',()=>{clear();schedule();});window.addEventListener('pagehide',clear);
 matchMedia('(prefers-color-scheme:dark)').addEventListener('change',schedule);
 chrome.runtime.sendMessage({type:'GET_SETTINGS'}).then(r=>{if(r?.ok)apply(r.settings);}).catch(()=>{});
})();
