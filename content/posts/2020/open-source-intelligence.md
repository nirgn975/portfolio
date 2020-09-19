---
title: "Passive.. Passive Recon.. Passive Reconnaissance.. OSINT!"
subtitle: ""
date: 2020-06-01T09:00:00+03:00
lastmod: 2020-06-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["osint", "reconnaissance", "hacking", "white hat", "intelligence", "open source", "data leaks", "arjun", "hunter.io", "theHarvester", "sublist3r"]
categories: ["hacking"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2020/open-source-intelligence/osint-cover.webp"
featuredImagePreview: "/posts/2020/open-source-intelligence/osint-cover.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

Every operation need good intel, and good intel is hard to find. Or is it?

[OSINT (or Open Source Intelligence)](https://en.wikipedia.org/wiki/Open-source_intelligence) is the operation of collecting and analyzing information about a target from various sources. A lot of times you'll see the terms "public" or "open" sources but let's be honest here, this is false and that's why I wrote *various sources*.

This is not to say that hacking to someone and steal his data is OSINT, because it's not. But not all the sources we'll use are public and open to everyone, and their data isn't collected by those services in an open way (innocently and / or with user consent).

When talking about reconnaissance, the first step of red teams in an engagement (or 5 phases of [ethical] hacking), people means passive reconnaissance. It's the attempt to gain information about a target (a human, a computer and / or a network) without actively engaging with it.

In this post I want you to tag a long with me when I'm doing a reconnaissance. Maybe I will censor certain details but I'll talk about it all. There are a lot of tools to help us do it, and we'll use them, but none the less there is a lot of manual hard work (and drop of art) to be done.

> **Disclaimer:** I'm not a professional pen tester. This is for educational purposes only.

&nbsp;

## 1. Story Time

At work I am responsible for a service that is mostly a backend service, but we have a small client (web interface) to help us manage things and see some analytics about our compony product. This interface have a login page where you need to enter a username and a password to get in, and you can't register to it, I need to give you access to it. This is an internal tool for the company.

So, naturally, I put some more security on that service. One of them was to log all logins to the system, and especially false attempts to login and an email notification to myself when that happens.

Everything was quiet for a long time, but we know it's not going to be like that forever. Lo and behold about a month ago it happened for the first time! Someone tried to penetrate the system with a non existent username and password. I got 4 attempts, because I don't even let you have a third strike - I put your IP in a blacklist. So as you see in the table below we basically have 2 real attempts (2 IPs) with 4 different credentials.


| Email                    | Password   | IP             | Time                     | Accept Language | User Agent              |
|--------------------------|------------|----------------|--------------------------|-----------------|-------------------------|
| deion_kihn@bocah.team    | Harry1982! | 84.17.46.157   | 2020-05-27T09:16:44.044Z | en-US           | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36 |
| deion_kihn@bocah.team    | Harry1945  | 84.17.46.157   | 2020-05-27T09:17:08.923Z | en-US           | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36 |
| zena.durgan91@bocah.team | Isaac2007  | 154.127.57.238 | 2020-05-27T11:26:31.250Z | en-US           | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36 |
| zena.durgan91@bocah.team | Isaac1964! | 154.127.57.238 | 2020-05-27T11:26:55.474Z | en-US           | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36 |

&nbsp;

We notice a bunch of things:
- We have only 2 IPs.
- The email address don't change in every attempt, only the password is changing in each attempt.
- The two emails are with the same domain.
- The language is always `en-US` which says nothing - this is by far the popular `accept-language` header on the internet.
- The `user agent` is from Windows 10 with a Chrome web browser version 67 (the same exact version for all four attempts), which is pretty old version (and remember that chrome is automatically updated).

&nbsp;

## 2. Let's Start Digging

The easiest thing to look up first are the IPs and the domain. The first IP (`84.17.46.157`) is from Netherlands, and the second (`154.127.57.238`) is from the South Africa, here are the full `JSON`s files I got from [ipstack](https://ipstack.com). I got the paid version of their API, but there is a free one and that's enough for our case here.

```json
{
  "ip":"84.17.46.157",
  "type":"ipv4",
  "continent_code":"EU",
  "continent_name":"Europe",
  "country_code":"NL",
  "country_name":"Netherlands",
  "region_code":"NH",
  "region_name":"North Holland",
  "city":"Diemen",
  "zip":"1101",
  "latitude":52.309051513671875,
  "longitude":4.940189838409424,
  "location":{
    "geoname_id":2756888,
    "capital":"Amsterdam",
    "languages":[
      {
        "code":"nl",
        "name":"Dutch",
        "native":"Nederlands"
      }
    ],
    "country_flag":"http://assets.ipstack.com/flags/nl.svg",
    "country_flag_emoji":"\ud83c\uddf3\ud83c\uddf1",
    "country_flag_emoji_unicode":"U+1F1F3 U+1F1F1",
    "calling_code":"31",
    "is_eu":true
  },
  "time_zone":{
    "id":"Europe/Amsterdam",
    "current_time":"2020-05-02T15:15:21+02:00",
    "gmt_offset":7200,
    "code":"CEST",
    "is_daylight_saving":true
  },
  "currency":{
    "code":"EUR",
    "name":"Euro",
    "plural":"euros",
    "symbol":"\u20ac",
    "symbol_native":"\u20ac"
  },
  "connection":{
    "asn":60068,
    "isp":"Datacamp Limited"
  }
}
```

```json
{
  "ip":"154.127.57.238",
  "type":"ipv4",
  "continent_code":"AF",
  "continent_name":"Africa",
  "country_code":"ZA",
  "country_name":"South Africa",
  "region_code":"GT",
  "region_name":"Gauteng",
  "city":"Johannesburg",
  "zip":"2000",
  "latitude":-26.199169158935547,
  "longitude":28.0563907623291,
  "location":{
    "geoname_id":993800,
    "capital":"Pretoria",
    "languages":[
      {
        "code":"af",
        "name":"Afrikaans",
        "native":"Afrikaans"
      },
      {
        "code":"en",
        "name":"English",
        "native":"English"
      },
      {
        "code":"nr",
        "name":"South Ndebele",
        "native":"isiNdebele"
      },
      {
        "code":"st",
        "name":"Southern Sotho",
        "native":"Sesotho"
      },
      {
        "code":"ss",
        "name":"Swati",
        "native":"SiSwati"
      },
      {
        "code":"tn",
        "name":"Tswana",
        "native":"Setswana"
      },
      {
        "code":"ts",
        "name":"Tsonga",
        "native":"Xitsonga"
      },
      {
        "code":"ve",
        "name":"Venda",
        "native":"Tshiven\u1e13a"
      },
      {
        "code":"xh",
        "name":"Xhosa",
        "native":"isiXhosa"
      },
      {
        "code":"zu",
        "name":"Zulu",
        "native":"isiZulu"
      }
    ],
    "country_flag":"http://assets.ipstack.com/flags/za.svg",
    "country_flag_emoji":"\ud83c\uddff\ud83c\udde6",
    "country_flag_emoji_unicode":"U+1F1FF U+1F1E6",
    "calling_code":"27",
    "is_eu":false
  },
  "time_zone":{
    "id":"Africa/Johannesburg",
    "current_time":"2020-05-02T15:20:17+02:00",
    "gmt_offset":7200,
    "code":"SAST",
    "is_daylight_saving":false
  },
  "currency":{
    "code":"ZAR",
    "name":"South African Rand",
    "plural":"South African rand",
    "symbol":"R",
    "symbol_native":"R"
  },
  "connection":{
    "asn":61317,
    "isp":"Digital Energy Technologies Ltd."
  }
}
```

This looks like a dead end for now, let's check the domain. For that I use [DomainTools](http://domaintools.com), they have a pretty nice and free service for Whois lookup. So when I searched `bocah.team` I didn't get much, it looks like the domain have a privacy protection, this means we cannot see who bought it.

But we can see a lot of other stuff, like it's registered by [NameCheap](https://www.namecheap.com) and protected by [WhoisGuard](http://www.whoisguard.com/). It created on 2018-07-13. The server the domain points to is a [DigitalOcean](https://www.digitalocean.com) one in the United Kingdom and his IP is `188.166.152.221`. They got `200` status code back from an [Apache Web Server](https://www.apache.org), and it tells us there are *257 other sites hosted on this server*! So it's time to do a reverse IP lookup for this server IP.

![DomainTools Whois Report](/posts/2020/open-source-intelligence/domain-tools-whois-report.webp "DomainTools Whois Report")

DomainTools don't let you do a reverse IP lookup for free, they'll show you couple of results and if you want to see more you need to buy a membership. We're amateurs here, I don't intend to throw away $99 per month for one reverse IP lookup, let's find another service.

Actually there are quite a few that does that for free, like [Hacker Target](https://hackertarget.com), and [ViewDNS](https://viewdns.info/). I especially love ViewDNS because it's give you the dates of *Last Resolved* for every domain, and give you a total number at the top (so you can match his findings with other services).

ViewDNS found 242 domains, almost everyone that DomainsTools said there are, and it's quite the list.

<details>
  <summary>Click here to see the 242 domains table.</summary>

| Domain                                    | Last Resolved Date |
|-------------------------------------------|--------------------|
| 1st-euro.net	                            | 2020-04-27         |
| 2hard4you.com	                            | 2020-04-29         |
| 32399753810sb.com	                        | 2019-10-29         |
| 39832302670sb.com	                        | 2019-10-29         |
| 404fizzy.com                            	| 2020-04-29         |
| 53nn0r4x.org                            	| 2020-05-02         |
| ablegod.net	                              | 2020-04-27         |
| adobe-results.net	                        | 2020-04-27         |
| adobepdf.org	                            | 2020-05-02         |
| adobexx.com	                              | 2020-04-29         |
| akangs.com                              	| 2020-04-29         |
| alli7f9651a12362cec298fe16c1574dcead.com	| 2019-10-29         |
| amaslim.com	                              | 2020-04-29         |
| ap13rc3.com	                              | 2019-10-03         |
| apelngentots.com                         	| 2020-04-29         |
| aplasitecomcom.com                       	| 2020-04-29         |
| approject.net	                            | 2020-04-27         |
| armcokeresulter.com                     	| 2020-04-29         |
| asdhfkjds.com                            	| 2020-04-29         |
| asdsadsa.com                            	| 2020-04-29         |
| astsmtp.org	                              | 2019-10-11         |
| balusaz.com	                              | 2020-03-29         |
| banglemail.com                          	| 2020-04-29         |
| baonlineintl.com                         	| 2020-04-29         |
| bdcimail.com                            	| 2020-04-29         |
| blckman.com	                              | 2020-04-29         |
| blowjoob.com	                            | 2020-04-29         |
| blurdybloop.com	                          | 2020-04-29         |
| boarsw1.com	                              | 2020-04-29         |
| boarsw11.com	                            | 2020-04-29         |
| boarsw2.com	                              | 2020-04-29         |
| bocah.team	                              | 2020-05-03         |
| btemailsupport.com	                      | 2020-04-29         |
| c0x1.com	                                | 2020-04-29         |
| c1onet.com	                              | 2019-10-19         |
| cc-result.com	                            | 2020-04-29         |
| ch3rsw2.com	                              | 2020-04-29         |
| charles-robinson.com	                    | 2020-04-29         |
| chasemelom.com                            |	2020-04-29         |
| chsw11.com                                |	2020-04-29         |
| chsww4.com                                |	2020-04-29         |
| cielo2012.com	                            | 2020-04-29         |
| clientcaf.info                            |	2020-04-28         |
| cnutzdtrk.com	                            | 2020-04-29         |
| coin-c.pro                                |	2020-01-30         |
| ctrhackschool.com                         |	2020-04-29         |
| d1berkati.net                             |	2020-05-03         |
| d3sxsrw.com	                              | 2019-11-12         |
| darego.org	                              | 2020-05-02         |
| dav1nc1.com	                              | 2019-08-07         |
| denate-djf88.com                          |	2020-04-29         |
| devexoxfamjackpot.org                     |	2019-08-07         |
| docusign1.com                             |	2020-04-29         |
| donking.net                               |	2020-04-27         |
| dpvmx.com	                                | 2020-04-29         |
| dullandstupidfolks.com	                  | 2019-10-26         |
| eaglesmail.net	                          | 2020-04-27         |
| eentertainment.site	                      | 2019-09-13         |
| esqhackschool.com	                        | 2020-04-29         |
| expertgz.com	                            | 2020-03-22         |
| familytreetmatter.com	                    | 2019-11-13         |
| fcwbanking.com	                          | 2020-04-29         |
| forcadesempre.com	                        | 2020-04-29         |
| fortiittechnology.com	                    | 2019-08-21         |
| freakzbrothers.team	                      | 2019-10-25         |
| frreer.com	                              | 2020-04-29         |
| garutc0de.com	                            | 2020-04-29         |
| gcrele.com	                              | 2020-04-29         |
| ggledocblessing.com	                      | 2020-04-29         |
| ggledocs.com	                            | 2020-04-29         |
| globizsolution.com	                      | 2020-05-03         |
| gmailphish.com	                          | 2020-04-29         |
| gmdddail.com	                            | 2020-04-29         |
| goldenboyplanet.net	                      | 2020-04-27         |
| goldenmarine.net	                        | 2020-04-27         |
| goodpostman.com	                          | 2020-04-29         |
| googdocs.org	                            | 2020-05-02         |
| groovypigthing.com	                      | 2019-12-13         |
| h4l1f4x.com	                              | 2020-04-29         |
| humaxgifts.net	                          | 2020-04-27         |
| hyzeek.com	                              | 2020-04-29         |
| idbte4m.com	                              | 2020-04-29         |
| idyat.com	                                | 2020-04-29         |
| iestoreakeup.com	                        | 2020-04-29         |
| ifastnet1.com	                            | 2020-04-29         |
| ilekunanu.com	                            | 2020-05-03         |
| iln-mc.net	                              | 2020-04-27         |
| immaculatelord.com	                      | 2020-04-29         |
| inforezult.com	                          | 2020-04-29         |
| infulz.org	                              | 2020-05-02         |
| inv3st3c.com	                            | 2019-10-29         |
| j4nn1ck.com	                              | 2020-04-29         |
| jephy-webmail.com	                        | 2020-04-29         |
| jquery-cloud.org	                        | 2019-11-15         |
| kanbghik.com	                            | 2020-04-29         |
| killdemall.com	                          | 2020-04-29         |
| kind1.org	                                | 2019-09-26         |
| kindly2014.com	                          | 2020-04-29         |
| kksdfs.com	                              | 2020-04-29         |
| kod3r.com	                                | 2020-04-29         |
| kucinghitam.team	                        | 2019-07-12         |
| kuhlcomputer.com	                        | 2020-04-29         |
| lagoshacker.com	                          | 2020-04-29         |
| lbox1.com	                                | 2020-04-29         |
| lbox2.com	                                | 2020-04-29         |
| lbox3.com	                                | 2020-04-29         |
| legitz-solutions.com	                    | 2020-04-29         |
| linksandmail.com	                        | 2020-04-29         |
| llgss.com	                                | 2020-04-29         |
| magentoscure.com	                        | 2020-04-29         |
| mailfahad.com	                            | 2020-04-29         |
| mailrez.com	                              | 2020-04-29         |
| malancellc.com	                          | 2020-04-29         |
| mdhmx.com	                                | 2020-04-29         |
| mefffdo.com	                              | 2019-10-10         |
| menemoney.com	                            | 2020-04-29         |
| mimecastphish.com	                        | 2020-04-29         |
| minioncc.com	                            | 2020-04-29         |
| minionlogin.com	                          | 2020-04-29         |
| minionresult.com	                        | 2020-04-29         |
| moneysquad.org	                          | 2020-05-02         |
| moxxxx.com	                              | 2020-04-29         |
| mrspybotv3.com	                          | 2020-04-29         |
| mrspybotv4.com	                          | 2020-04-29         |
| mteen.net	                                | 2020-04-27         |
| mylinklog.com	                            | 2020-04-29         |
| mymailgin.com	                            | 2020-04-29         |
| mystshop.org	                            | 2020-05-02         |
| nationwidez.com	                          | 2020-04-29         |
| neids.net	                                | 2020-04-27         |
| netzrxflix.com	                          | 2020-04-29         |
| newbieking.biz	                          | 2020-05-02         |
| newcpanel.com	                            | 2020-04-29         |
| notforsal.org	                            | 2020-05-02         |
| notinforreal.org	                        | 2020-05-02         |
| oluxshopservice.com	                      | 2019-11-12         |
| one-sender.com	                          | 2020-04-29         |
| oneskilet.team	                          | 2020-03-22         |
| oonlo.com	                                | 2020-04-29         |
| orimi.co	                                | 2020-05-02         |
| otherphish.com	                          | 2020-04-29         |
| ourtimesupport.com	                      | 2020-04-29         |
| ourtimewhorers.com	                      | 2020-05-03         |
| outlookphish.com	                        | 2020-04-29         |
| p-delivr.com	                            | 2020-04-29         |
| pant8.com	                                | 2020-04-29         |
| perpeleran.com	                          | 2020-04-29         |
| pollarda.com	                            | 2020-04-29         |
| ppaypl.com	                              | 2020-04-29         |
| priv8scam.com	                            | 2020-02-09         |
| priv8scamccforu.com	                      | 2020-02-09         |
| private-relay.com	                        | 2020-04-29         |
| projectmy.net	                            | 2020-04-27         |
| pvscamccsscom.com	                        | 2019-09-28         |
| pvscamyasscom.com	                        | 2020-04-29         |
| pvscamyavscom.com	                        | 2019-09-28         |
| qqrez.com	                                | 2020-04-29         |
| r36yc.com	                                | 2020-04-29         |
| raflipedia.com	                          | 2020-04-29         |
| recodz.com	                              | 2020-04-29         |
| resulttidaklancar.com	                    | 2020-04-29         |
| rezlt.org	                                | 2020-05-02         |
| rezltboa.com	                            | 2020-04-29         |
| rezult.org	                              | 2020-05-03         |
| rezultbossing.com	                        | 2020-04-29         |
| rsjkingdomxpp.pro	                        | 2019-06-11         |
| salkah.com	                              | 2020-04-29         |
| saydie.com	                              | 2020-04-29         |
| se-holldings.com	                        | 2020-04-29         |
| sendmsexcel.com	                          | 2020-04-29         |
| serverstrato.net	                        | 2020-04-27         |
| serviceadobe.com	                        | 2020-04-29         |
| servicedropbox.com	                      | 2019-08-24         |
| servicesoutlook.com	                      | 2020-04-29         |
| servisdocusign.com	                      | 2020-04-29         |
| servisdropbox.com	                        | 2020-04-29         |
| sidshell.com	                            | 2020-03-22         |
| skilet.team	                              | 2020-03-22         |
| slackerc0de.com	                          | 2020-04-29         |
| slclogin.com	                            | 2020-05-03         |
| sn7ak.com	                                | 2020-04-29         |
| soutaz.com	                              | 2020-04-29         |
| spammerindo.com	                          | 2020-04-29         |
| spammerindo.pro	                          | 2019-06-11         |
| spirititus.com	                          | 2020-04-29         |
| spmers.net	                              | 2020-04-27         |
| spyu.org	                                | 2020-05-02         |
| srv-app.club	                            | 2019-07-02         |
| stationlinux.org	                        | 2020-05-02         |
| support-itrueserver.xyz	                  | 2020-03-22         |
| sureboi.com	                              | 2020-04-29         |
| svoooo.com	                              | 2020-04-29         |
| sydoppe.com	                              | 2020-04-29         |
| synichix.pro	                            | 2019-06-11         |
| system42l.net	                            | 2020-04-27         |
| t3chsss.net	                              | 2020-04-27         |
| teeniecamp4free.com	                      | 2020-04-29         |
| teluz.org	                                | 2019-10-10         |
| tf-info.com	                              | 2020-04-29         |
| tgboi.com	                                | 2020-04-29         |
| tgiftoday.biz	                            | 2019-08-20         |
| thanksforreal.org	                        | 2019-12-12         |
| theaccessuk.org	                          | 2020-05-02         |
| tool4spam.com	                            | 2020-04-29         |
| tooolz.com	                              | 2020-04-29         |
| tooxlz-db.com	                            | 2020-04-29         |
| trowey.com	                              | 2020-04-29         |
| tsbdumbs.com	                            | 2020-04-29         |
| tt-door.biz	                              | 2020-05-02         |
| ttcpanel.com	                            | 2020-04-29         |
| twinbash.co	                              | 2020-05-02         |
| usaaresults.com	                          | 2020-04-29         |
| usaaxa.com	                              | 2020-05-03         |
| vgnnb.com	                                | 2020-04-29         |
| virus-ma.com	                            | 2019-08-09         |
| webmai.co	                                | 2020-05-02         |
| webmailupdate.com	                        | 2020-04-29         |
| willyfucker.com	                          | 2019-11-27         |
| windowsswebs.com	                        | 2019-10-29         |
| wiregang.com	                            | 2019-08-09         |
| wirethings.net	                          | 2020-05-03         |
| wls1.com	                                | 2020-04-29         |
| worldpc2000.com	                          | 2020-04-29         |
| xellef-id.com	                            | 2020-04-29         |
| xhades.com	                              | 2020-04-29         |
| xindex.org	                              | 2020-05-02         |
| xsendersecurity.com	                      | 2020-04-29         |
| xvbvx.com	                                | 2020-04-29         |
| xxsender.com	                            | 2020-04-29         |
| xxxsender.com	                            | 2020-04-29         |
| yah5oo.com	                              | 2020-04-29         |
| yandew.com	                              | 2020-04-29         |
| yatdew.com	                              | 2020-04-29         |
| youphei.com	                              | 2019-12-13         |
| yourzcoolsite.com	                        | 2019-12-12         |
| yyuuoo.com	                              | 2020-04-29         |
| z1t0ng404.com	                            | 2020-04-29         |
| z3ran.com	                                | 2020-04-29         |
| zebyinbox.com	                            | 2020-04-29         |
| zenquel.com	                              | 2020-04-29         |
| zephyrsc.shop	                            | 2019-10-23         |
| zwirgel.net	                              | 2020-04-27         |
</details>  

When we go over it, we can see there are a lot of them who probably use to create websites for phishing attacks (domains that are close to other big service domain / name), and others for spam and a likes. So that gives us a lot of leads to check, we can Google them all and see what comes up, but I don't have the patience to go over results for 242 searches right now. So let's keep it for later, if we'll need to.

Let's check the website itself. It looks like just a blank page. I did a quick check for the body / headers that return for the request (as well as for other requests that the web browser did) and I didn't see anything suspicious (like a header on the response that not supposed to be there, I got there by thinking it'll probably will be a [C2](https://en.wikipedia.org/wiki/Command_and_control)).

The next question that pops to my head is *"is it always was a blank page?"*. We have a way to check it, maybe, sort of. We'll use the [WayBack Machine](https://web.archive.org/) and we got some results! We can see it saves 3 snapshots, but all of them are the same blank pages.

![WayBack Machine](/posts/2020/open-source-intelligence/wayback-machine.webp "WayBack Machine")

So this gives us nothing so far. What comes to mind is that it's someone renting a server on DigitalOcean and use proxies to map some parts of the internet and when he get back `200` from a website he tries to login, maybe it's automated login attempts maybe it isn't, I didn't decided yet (because it's look automated but then I was expecting an increase of a number or the next latter in the alphabet, or to add some latter in the end of the password in the second try, if it was automated). Also, it's probably someone (or a bunch of people) who doing some phishing and / or spam stuff.

&nbsp;

## 3. Like a dog with a bone

This is not the end of the line, it's just the start. Let's keep digging! A tool I love to use is [Netcraft Site Report](https://sitereport.netcraft.com), when I run the domain in their service we finally start to see more results.

![Netcraft Report](/posts/2020/open-source-intelligence/netcraft-report.webp "Netcraft Report")

We can see the domain registered with `donuts.co` (which redirect us to [donuts.domains](https://donuts.domains)) back in 2017! (maybe it was someone else, maybe they forget to renew it and re-buy it with NameCheap, or maybe they transfer it to NameCheap in 2018, who knows? don't really care at this point).

The nice thing we find is the organisation that was purchased the domain back in 2017 (they didn't have a domain privacy protection). It's `Jalanin aja dulu mhanxx, hax0r, 50701, United States`. First thing that pops up is the word `hax0r`, this is [1337 speak (or leet)](https://simple.wikipedia.org/wiki/Leet) and it is used on the internet in forums, chat rooms, online games, etc. The `0` in the word is equivalent to `o` so it's the word `haxor` and it's an [alternative spelling of hacker or script kiddie](https://en.wiktionary.org/wiki/haxor).

&nbsp;

So that's interesting, let's keep our focus on domain / website / server.

More scanning with Netcartf and [build with](https://builtwith.com) find it's probably a Linux server (maybe Ubuntu, based on *"build with"*), and it uses [Apache](https://www.apache.org). It used Apache 2.4, for sometime it also had [Nginx](https://www.nginx.com/) but now we only got "Apache". And this domain is active since the end of 2017 (based on *"build with"* and *netcarft*).

![Build With](/posts/2020/open-source-intelligence/built-with.webp "Build With")

![Netcarft Hosting](/posts/2020/open-source-intelligence/netcraft-hosting.webp "Netcarft Hosting")

Another big finding from Netcarft is that it uses [DMARC](https://en.wikipedia.org/wiki/DMARC). DMARC is an email authentication protocol, and Netcarft gives us the raw record which is details the emails they using for reporting aggregate and failure data.

```
v=DMARC1; p=none; pct=100; fo=1; ri=300; rua=mailto:a@bocah.team; ruf=mailto:f@bocah.team
```

I'll save those email addresses for later, but now let's keep digging with some other great tool on my list, and one I often use is [spyse](https://spyse.com). It's a cybersecurity search engine to find information about internet assets. When I give it the IP (`188.166.152.221`) of the DigitalOcean server, it find the `tool4spam.com` domain. We already know that domain from our 242 domains list, but this tells me that this domain is probably one of their main ones, and it's an important one.

![Spyse Report](/posts/2020/open-source-intelligence/spyse-report.webp "Spyse Report")

&nbsp;

Most of times everyone will say that scanning is not passive, I can agree with that, but I don't really care. To scan our main target (`bocah.team`) I'll use [nmmapper](https://www.nmmapper.com), and specifically [DNSscan](https://github.com/rbsec/dnscan) tool, it's extremely fast, and it catches so much subdomains!

So after I run the tool I was a little bit in shock, there was so much subdomains it hurts to scroll through them. My current initial assumption is that he must be part of an operation that do those stuff for years. You can download the `txt` file with the 780 subdomain it's founds for `bocah.team` [here](/posts/2020/open-source-intelligence/bocah-team-subdomains-list.txt).

And let's not forget that this is only one domain that points to that server. We found out that there are 242 domains that points to that server, we can only imagine the subdomains that they also have (I don't intend to run them, it's not interesting me).

&nbsp;

The last thing I want to check with their server (for now) is if maybe there are some query parameters their server get and we don't know about, because we just doing a `GET` request with no parameters to their domain (`bocah.team`). Luckily there is a tool to help us do it, [Arjun](https://github.com/s0md3v/Arjun) for the rescue. Arjun send `GET` and `POST` requests with a different query parameters (from a huge list of 25,980 parameters).

Unfortunately, when I did a `GET` and a `POST` requests, Arjun didn't come up with anything.

![Arjun Search](/posts/2020/open-source-intelligence/arjun-search.webp "Arjun Search")

&nbsp;

## 4. Found him! Maybe..

It's time to search a little about our new finding `tool4spam.com`. Let's go to [hunter.io](http://hunter.io) and check for `tool4spam.com` - didn't come up with anything, but we have another domain (let's not forget about it), a scan for `bocah.team` comes up with an email address!

![Hunter Result](/posts/2020/open-source-intelligence/hunter-result.webp "Hunter Result")

In the source website there is also a phone number (and google translate says the website is in Danish).

![Hunter Source](/posts/2020/open-source-intelligence/hunter-source.webp "Hunter Source")

When we search Google for `johnny_pacocha@bocah.team` we found another site (a part from the one hunter point us to). This website is [ceqoya](https://www.ceqoya.com) which is a "A search engine that helps NGO and ecological projects", in this search engine there are couple of links to Bocah Team (apparently it's a [Sports Team](https://www.facebook.com/Bocah-Team-New-579200705444594/photos)), but we find a new link, to [pastebin](https://pastebin.com): https://pastebin.com/8yDPutJQ. This contain a PHP code that is basically an Apple scam page with couple more email address `empas.apel@bocah.team`, `apel@bocah.team`, `report.apel@bocah.team` with our target domain.

This user have more pastes in his profile (his profile name is `Inboxplis`), but the common thing is that they have a gmail address (`slikeye1711@gmail.com`) in the code with a link to his [Facebook profile page](https://www.facebook.com/Slikeye)!

![Dian Wahyudi Facebook Profile](/posts/2020/open-source-intelligence/dian-wahyudi-facebook-profile.webp "Dian Wahyudi Facebook Profile")

In his Facebook photos there is [a photo](https://www.facebook.com/photo.php?fbid=718884434960573&set=pb.100005170683150.-2207520000..&type=3) about some Hacking / Script Kiddies book in Indonesian back in April 2017. Also from his photos I can notice he have an Asus laptop with a Windows 10 on it, and that he do a lot of small money transfers.

When I go back to the organisation I found earlier, the report from Netcarft when they registered `bocah.team` in 2017, the one we found earlier (`Jalanin aja dulu mhanxx, hax0r, 50701, United States`) and put the part "Jalanin aja dulu mhanxx" in Google Translate (on *detect language*) it comes as Indonesian and it's means "Just do it first mhanxx".

The guy on the Facebook profile page I found is from Indonesia (he wrote it there and the language he write in his posts is Indonesian). So this is a big clue that it's probably our guy. Or is it? The big question now is: **Is this our person?** I think we need to find more evidence.

Quick Recap:

1. He is from Indonesia (posts language and from his profile) and the domain registration details have Indonesian words in it.
2. He have a hacking book and the domain registered details have the `hax0r` word in it, which is another word for hacker or script kiddie.
3. There are a lot of phishing / spam domains (like `tool4spam.com`) that points to the same server and he seems like a spammer (a lot of small money transactions, and a script kiddie / spammer book).
4. The Pastebin paste with the `bocah.team` domain and `tool4spam.com` domain in it have also his email and Facebook profile page.

It looks like our guy, but this is not enough! we need more.

&nbsp;

## 5. Take It Up a Notch

Let's search his gmail (`slikeye1711@gmail.com`) on [Pipl](https://pipl.com), unfortunately we got nothing.

```json
{
  "@http_status_code": 200,
  "@visible_sources": 0,
  "@available_sources": 0,
  "@persons_count": 0,
  "@search_id": "2005021646181212464187518983203646144",
  "query": {
    "emails": [
      {
        "@type": "personal",
        "address": "slikeye1711@gmail.com",
        "address_md5": "5852a05e2315661b759ee006ef3bc006"
      }
    ]
  }
}
```

Let's check his email in [have i been pwned](https://haveibeenpwned.com/), and we got a match!

![Have I Been Pwned Search](/posts/2020/open-source-intelligence/haveibeenpwned.webp "Have I Been Pwned Search")

His email is on the Canva database leak, so I started to search this database leak on the internet, and it wasn't that hard to find. I found two types of files, the first is a single file that appears to be the whole info of the users, but it says *"cleaned"* in the file name, and some fields are not there, for example the `password` is obviously a basic and it's not there.

| ID | ID_HASH | CREATE_DATE | MAIL | PHONE | MAIL_STATUS | USERNAME | DISPLAY_NAME | NAME1 | NAME2 | TEMPORARY | ROLES | DEACTIVATED | UI_INFO | HOMEPAGE | CITY | COUNTRY_CODE | LOCALE | PERSONAL_BRAND | PERSONAL_BRAND_ID | AVATAR | HASH |
|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
| 48222628 | UAClrvf92U8 | 2017-11-03 06:25:39 | slikeye1711@gmail.com | | C | slikeye1711 | Dian Wahyudi |  |  | 0 | U | 0 | {contextTipRoyaltyFreePaymentOption:true;hasSeenPublishPaymentLicensesOnboarding:true} | | | | en | 48163206 | BAClrn9xkI4 | |

The second type of files that I found is couple of small files with a list of `emails:pass`, but unfortunately his email wasn't in any one of them.

&nbsp;

So let's think of something different, in his profile page there was a new domain I didn't saw before, `slikeye.com`. I checked it with DomainTools Whois, and it was also protected. So I searched it in Google and we have couple of hits. The first and second results are his [Instagram profile](https://www.instagram.com/dianwhyd), but it private.

The third result is really interesting, it's from [cutestat website](https://www.cutestat.com), which is a website to provides various statistical reports like website valuation, traffic reports, social engagement, host information, domain WHOIS, etc. and it's perfect because it has a WHOIS record from `2017-06-14T17:05:39Z` with new data (probably before he had privacy protection on the domain).

```txt
Domain Name: SLIKEYE.COM
Registry Domain ID: 2132972393_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.resellercamp.com
Registrar URL: http://resellercamp.com/
Updated Date: 2017-06-12T12:33:20Z
Creation Date: 2017-06-12T12:33:14Z
Registrar Registration Expiration Date: 2018-06-12T12:33:14Z
Registrar: CV. Jogjacamp
Registrar IANA ID: 1478
Registrar Abuse Contact Email: abuse@resellercamp.com
Registrar Abuse Contact Phone: +62.82141570000
Domain Status: clientTransferProhibited (http://icann.org/epp#clientTransferProhibited)
Registry Registrant ID:
Registrant Name: dian Wahyudi
Registrant Organization: pribadi
Registrant Street: Kutajaya no.15 Rt.03 Rw.01
Registrant City: bogor
Registrant State/Province: Jawa Barat
Registrant Postal Code: 16131
Registrant Country: ID
Registrant Phone: +62.87770307854
Registrant Phone Ext:
Registrant Fax:
Registrant Fax Ext:
Registrant Email: diansoft1711@gmail.com
Registry Admin ID:
Admin Name: dian Wahyudi
Admin Organization: pribadi
Admin Street: Kutajaya no.15 Rt.03 Rw.01
Admin City: bogor
Admin State/Province: Jawa Barat
Admin Postal Code: 16131
Admin Country: ID
Admin Phone: +62.87770307854
Admin Phone Ext:
Admin Fax:
Admin Fax Ext:
Admin Email: diansoft1711@gmail.com
Registry Tech ID:
Tech Name: dian Wahyudi
Tech Organization: pribadi
Tech Street: Kutajaya no.15 Rt.03 Rw.01
Tech City: bogor
Tech State/Province: Jawa Barat
Tech Postal Code: 16131
Tech Country: ID
Tech Phone: +62.87770307854
Tech Phone Ext:
Tech Fax:
Tech Fax Ext:
Tech Email: diansoft1711@gmail.com
Name Server: ns1.domainesia.net
Name Server: ns2.domainesia.net
DNSSEC: Unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
```

We can see words in Indonesian, his name (Dian Wahyudi), and his phone number that also in his Facebook profile, so the domain was his in this date. We can see a physical address (street: `Kutajaya no.15 Rt.03 Rw.01`, city: `bogor`, state: `Jawa Barat`, zip: `16131`), and a new email (`diansoft1711@gmail.com`).

Before we continue digging with our new findings, let's keep looking in our Google search for `slikeye.com`. There was nothing more in there expect from the fourth result, it was his [Twitter profile](https://twitter.com/dianwhyd). It doesn't look like much, he upload more photos and talk more in his Facebook profile (he also abandoned Twitter in 2017). But a quick scroll through his tweets with pictures shows a tweet from 2014 with a Facebook login that says "fb maintenance", and the start of his email is the `input` field. It says `slikeye` so it's probably `slikeye1711@gmail.com`.

It's time to do a *"Forget Password"* on Facebook with his email. It's got us his last 2 digits in his phone number, and they're the same as the phone number in his Facebook profile and his 2017 WHOIS record for `slikeye.com`, so we know it's probably his real and private phone number (also, a *"Forget Password"* in Twitter, for the same email, get us the same 2 last digits).

![Facebook Forget Password](/posts/2020/open-source-intelligence/facebook-forget-password.webp "Facebook Forget Password")

Unfortunately we didn't get new phone numbers or email addresses, but *"Forget Password"* is a good method and a lot of times revel different phone numbers and email addresses that are the private ones of the target.

&nbsp;

## 6. Pivoting

The new email address and phone number don't get us any result on Pipl, that's a bummer. Pipl is consistently failing us in this recon investigation. On the other hand a TrueCaller search for the phone number confirms the new email address we already found in the 2017 WHOIS record, and tell us his `carrier` and that he is verified by [TrueCaller](https://www.truecaller.com).

```json
{
  "data": [
    {
      "id": "lB3vOHRxq8Ek9wc30h2uIA==",
      "name": "Dian Wahyudi",
      "firstName": "Dian",
      "lastName": "Wahyudi",
      "gender": "UNKNOWN",
      "score": 0.9,
      "access": "PUBLIC",
      "enhanced": true,
      "phones": [
        {
          "e164Format": "+6287770307854",
          "numberType": "MOBILE",
          "nationalFormat": "0877-7030-7854",
          "dialingCode": 62,
          "countryCode": "ID",
          "carrier": "XL Axiata",
          "type": "openPhone"
        }
      ],
      "addresses": [
        {
          "address": "ID",
          "countryCode": "ID",
          "timeZone": "+07:00",
          "type": "address"
        }
      ],
      "internetAddresses": [
        {
          "id": "diansoft1711@gmail.com",
          "service": "email",
          "caption": "Dian Wahyudi",
          "type": "internetAddress"
        }
      ],
      "badges": [
        "verified",
        "user"
      ],
      "tags": [],
      "profileEditHistory": {},
      "spamInfo": {},
      "cacheTtl": 1296000,
      "sources": []
    }
  ],
  "provider": "ss-nu",
  "stats": {
    "sourceStats": []
  }
}
```

A [Spokeo](https://www.spokeo.com) search for his email (`diansoft1711@gmail.com`) provide us his [Pinterest profile](https://www.pinterest.com/diansoft1711), but that is not much because his profile is empty. We can notice another pattern here, his profile name on Pinterest is `diansoft1711`, on Facebook it's `Slikeye`, and on Twitter and Instagram is `dianwhyd`.

I think we need to search for more Social Networks profiles for his usernames. There're tools to help us do it, like [userrecon](https://github.com/thelinuxchoice/userrecon).

* `diansoft1711` username it didn't found any new profiles (it found only Pinterest).
* `Slikeye` username got us [BitBucket profile](https://bitbucket.org/Slikeye) (without any repos, or all of them are private).
* `dianwhyd` username provide us with a different [Pinterest profile](https://www.pinterest.com/dianwhyd), a [Flipboard profile](https://flipboard.com/@DianWhy), and a [Tripadvisor profile](https://www.tripadvisor.com/Profile/Dianwhyd).

If we're already here, let's search for his username in the Canva database leak (`slikeye1711`) with our new tool. This search gives us interesting results - a different [Facebook profile](https://www.facebook.com/slikeye1711), it's looks like someone else, but he's also from *"Bogor, Indonesia"*. He says on his profile he works at Apple (and it takes me straight in to the Pastebin account with the Apple's scam page), but he have an Apple advertisement photo on the cover page. The thing is, when I open it up to see it in full size you can actually see it's a screenshot of apple website!

![Agustinus Rivaldo Facebook Cover Image](/posts/2020/open-source-intelligence/agustinus-rivaldo-facebook-cover.webp "Agustinus Rivaldo Facebook Cover Image")

Or is it? When you look closer on the URL of the page it's `http://apps-icloudapps.serveirc.com` which is not Apples one. This is a scam / phishing page to login with your apple credentials. Other stuff we see on the screenshot is that the web browser is chrome, it's a Windows 10 OS on a laptop, and he have a bunch of other tabs open (Facebook, a cPanels, and some other stuff I don't recognize), and he have a [sublime text editor](https://www.sublimetext.com) window minimize.

This doesn't look good for our guy, this is probably a fake account for an apple scam / phishing. When I search for `http://apps-icloudapps.serveirc.com` in Google all the results are about scam stuff (news articles, forums, etc). This is probably our guy or some other man in the phishing operation he belongs to.

&nbsp;

The next step is to search for more information about those phishing sites. The search for `*.bocah.team` on Google results in couple of new emails and websites, but we have enough of that, let's search specific for Pastebin, because that's where we find the apple scam page with his email and Facebook profile URL. So when I searched `*.bocah.team site:pastebin.com` I found 4 different pastes:
- The [first](https://pastebin.com/T6bnuqze) from profile named [ARIDHO](https://pastebin.com/u/aridho), that have a lot of phishing pastes in his profile.
- The [second](https://pastebin.com/XmEBg6vF) from a profile named [RIZKYIBENG](https://pastebin.com/u/rizkyibeng) and all of his pastes are Apple scam page, except of one, when he has a gmail address `ibengrizky01@gmail.com`.
- The [third](https://pastebin.com/3MZySMy1) is a guest, and there is nothing interesting in the paste.
- The [fourth](https://pastebin.com/C11evf9P) is also a guest, and there is also nothing interesting in his paste.

Now, we can go search about `RIZKYIBENG` with his email `ibengrizky01@gmail.com`, but it is out of scope right now. He can be a member of this phishing operation and maybe he isn't, and just doing those stuff alone, either way it's not an interest for me right now.

But the stuff I started to notice is that all of those scam / phishing pages are look the same. For example here is the slikeye panel of our target, and `ARIDHO` Apple scam panel (rendered with [jsfiddle](https://jsfiddle.net)).

![Silkeye Panel](/posts/2020/open-source-intelligence/silkeye-panel.webp "Silkeye Panel")

![Aridho Panel](/posts/2020/open-source-intelligence/aridho-panel.webp "Aridho Panel")


I think we got enough of this, this is for sure a scam / phishing operation and our target is one of this group. So, the last thing I want to do is to search for the new email we found (`diansoft1711@gmail.com`) let's see if this email have been in a leak.

![Have I Been Pwned Report](/posts/2020/open-source-intelligence/haveibeenpwned-second-report.webp "Have I Been Pwned Report")

It's have been, so it's time to search for Bukalapak leaked database. This one was not so easy like the `Canva`. But I manage to find it. And our new email target is in there.

| Uid      | Email                  | Full Name | Password                                                     | Salt                 | Username     | Birthday |
|----------|------------------------|-----------|--------------------------------------------------------------|----------------------|--------------|----------|
| 47241282 | diansoft1711@gmail.com	| Andi      | $2a$10$T12OFkTmziUovvADLb7koeAd4VODsOkjEECOftIb5fy4UIaE3f7C2 | C1LyhB6B52CIjwEv3AMR | diansoft1711 |          |

We can see he have a different `fullname` here (`Andi`). And we manage to get his `password` and `salt`. We don't even need to use tools to identify the hash type, from the news out there we know it's a `bcrypt`, and we see in the database we have a `salt`. We can use [hashcat](https://hashcat.net/hashcat) and try to crack it, but this is my red line, I don't think the guy tried to hack my service.

&nbsp;

## 7. Quick Mentions

Before I wrap this up, I just want to quickly mention a couple of tools I use all the time, but in this case wasn't any help (or other tools get more data), and I just didn't mention them in the write up.

So the first one is [sublist3r](https://github.com/aboul3la/Sublist3r), its gave me some subdomains (but DNSscan found more, much more! subdomains (and much faster)).

![sublist3r Results](/posts/2020/open-source-intelligence/sublist3r-results.webp "sublist3r Results")

Another tool I always use is [theHarvester](https://github.com/laramies/theHarvester). The Harvester found the `johnny_pacocha` email which led us to his Pastebin and then his Facebook profile page. But to be truthful this is not the first way I found this email, so I include the original way (with [hunter.io](https://hunter.io)). But, if I didn't have an account there, or hunter wasn't able to find it, I probably been able to found it the theHarvester.

![The Harvester Report](/posts/2020/open-source-intelligence/theHarvester-yahoo.webp "The Harvester Report")

&nbsp;

## 8. Summary

So, to recap our trip, we started with just 2 email address from the same domain and 2 IPs. We manage to probably find our guy and determine he is a member in a scam / phishing operation. We found more people from this operation but didn't continue to investigate them. But the most important thing, the final verdict is that no one was trying to hack my service at work. He is probably did some scanning and encountered my client app, he tried to enter but quickly noticed the security protections or just simply gave up because he didn't think there is anything important there and it's not worth the trouble and time (he also stopped trying after the 4 attempts).

The other thing we gain in this reconnaissance (a part from the final verdict), is a lot of fun time and some brushing of old rust. I hope you learned something new or that I just pick your interest. This world is really big, there are a lot of tools that I didn't use here and there are a lot of cool people that do cool stuff and find really inventive ways to investigate.
