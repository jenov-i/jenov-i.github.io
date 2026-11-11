/* =========================================================
   DANDOU Jenovi — Portfolio · Project data (FR / EN)
   ========================================================= */
const PROJECTS = [
  {
    id: "pme-soc",
    year: "2026",
    cat: "sec",
    featured: true,
    title: { fr: "Architecture réseau sécurisée pour PME", en: "Secure network architecture for an SME" },
    tagline: {
      fr: "pfSense, Zabbix, Graylog, Suricata — un SOC miniature pour une PME.",
      en: "pfSense, Zabbix, Graylog, Suricata — a miniature SOC for an SME."
    },
    context: {
      fr: "Lab VMware simulant une PME : segmentation, filtrage, supervision et détection d’intrusion sur une chaîne complète, du pare-feu au tableau de bord.",
      en: "VMware lab simulating an SME: segmentation, filtering, monitoring and intrusion detection across a complete chain, from firewall to dashboard."
    },
    bullets: {
      fr: [
        "Conception du plan d’adressage et segmentation VLAN (LAN, DMZ, administration).",
        "Déploiement de pfSense en passerelle/pare-feu avec règles de filtrage et NAT.",
        "Supervision des hôtes et services avec Zabbix (agents + SNMP).",
        "Centralisation des logs et création de tableaux de bord dans Graylog.",
        "Déploiement de Suricata en IDS et scénarios d’attaque pour valider la détection."
      ],
      en: [
        "Designed the IP addressing plan and VLAN segmentation (LAN, DMZ, management).",
        "Deployed pfSense as gateway/firewall with filtering rules and NAT.",
        "Monitored hosts and services with Zabbix (agents + SNMP).",
        "Centralised logs and built dashboards in Graylog.",
        "Deployed Suricata as an IDS and ran attack scenarios to validate detection."
      ]
    },
    result: {
      fr: "Chaîne complète opérationnelle : une attaque simulée génère une alerte Suricata, un log Graylog et une notification Zabbix.",
      en: "Full chain operational: a simulated attack raises a Suricata alert, a Graylog entry and a Zabbix notification."
    },
    stack: ["VMware", "pfSense", "Zabbix", "Graylog", "Suricata", "Debian", "VLAN"]
  },
  {
    id: "ad-multisite",
    year: "2026",
    cat: "sys",
    featured: true,
    title: { fr: "Active Directory multi-sites — Brazzaville / Ouesso", en: "Multi-site Active Directory — Brazzaville / Ouesso" },
    tagline: {
      fr: "Deux sites, un annuaire, des réplications maîtrisées.",
      en: "Two sites, one directory, controlled replication."
    },
    context: {
      fr: "Déploiement Windows Server 2022 : deux sites reliés, annuaire centralisé, tolérance aux pannes et délégations documentées.",
      en: "Windows Server 2022 deployment: two connected sites, centralised directory, fault tolerance and documented delegations."
    },
    bullets: {
      fr: [
        "Installation et promotion de contrôleurs de domaine sur Windows Server 2022.",
        "Création des sites et sous-réseaux AD, contrôle des réplications.",
        "Mise en place de DFS pour la disponibilité des partages.",
        "Attribution et vérification des rôles FSMO.",
        "Automatisation de la création de comptes et groupes via PowerShell.",
        "Documentation complète : schémas, procédures d’exploitation, plan de reprise."
      ],
      en: [
        "Installed and promoted domain controllers on Windows Server 2022.",
        "Created AD sites and subnets, verified replication health.",
        "Set up DFS for share availability.",
        "Assigned and verified FSMO roles.",
        "Automated user and group creation with PowerShell.",
        "Full documentation: diagrams, operating procedures, recovery plan."
      ]
    },
    result: {
      fr: "Annuaire centralisé fonctionnel sur les deux sites, réplication validée et procédures réutilisables.",
      en: "Centralised directory working across both sites, replication validated and reusable procedures."
    },
    stack: ["Windows Server 2022", "AD DS", "DNS", "DFS", "FSMO", "PowerShell", "VMware"]
  },
  {
    id: "zabbix",
    year: "2026",
    cat: "sec",
    featured: false,
    title: { fr: "Supervision Zabbix multi-sites", en: "Multi-site Zabbix monitoring" },
    tagline: {
      fr: "SNMP v2c/v3, proxys distants et alertes e-mail/Telegram.",
      en: "SNMP v2c/v3, remote proxies and e-mail/Telegram alerts."
    },
    context: {
      fr: "Supervision centralisée d’un parc réparti sur plusieurs sites, avec des remontées d’alertes réellement exploitables.",
      en: "Centralised monitoring of a fleet spread over several sites, with alerts that are actually actionable."
    },
    bullets: {
      fr: [
        "Installation du serveur Zabbix et de proxys pour les sites distants.",
        "Supervision via agents et SNMP v2c/v3 (serveurs et équipements réseau).",
        "Création de templates, triggers et dashboards par service.",
        "Notifications e-mail et Telegram, avec tests de déclenchement.",
        "Documentation de la procédure d’ajout d’un nouvel hôte."
      ],
      en: [
        "Installed the Zabbix server and proxies for remote sites.",
        "Monitored via agents and SNMP v2c/v3 (servers and network equipment).",
        "Built templates, triggers and per-service dashboards.",
        "Configured e-mail and Telegram notifications, with trigger tests.",
        "Documented the procedure for onboarding a new host."
      ]
    },
    result: {
      fr: "Vue unifiée du parc, alertes testées de bout en bout et onboarding reproductible.",
      en: "Unified view of the fleet, end-to-end tested alerts and repeatable onboarding."
    },
    stack: ["Zabbix", "SNMP v2c/v3", "Linux", "Telegram API", "VMware"]
  },
  {
    id: "ldap-radius",
    year: "2025",
    cat: "sec",
    featured: true,
    title: { fr: "Authentification centralisée LDAP / RADIUS & Wi-Fi 802.1X", en: "Centralised LDAP / RADIUS authentication & 802.1X Wi-Fi" },
    tagline: {
      fr: "Un annuaire, un contrôle d’accès, un Wi-Fi qui ne laisse pas passer n’importe qui.",
      en: "One directory, one access control, a Wi-Fi network that does not let just anyone in."
    },
    context: {
      fr: "Projet académique ESGAE : centraliser les identités et authentifier les accès Wi-Fi via 802.1X, du serveur jusqu’au poste client.",
      en: "ESGAE academic project: centralise identities and authenticate Wi-Fi access through 802.1X, from server to client."
    },
    bullets: {
      fr: [
        "Serveur Ubuntu avec OpenLDAP comme annuaire central.",
        "FreeRADIUS connecté à l’annuaire pour l’authentification.",
        "pfSense et switches configurés pour le VLAN d’accès et le 802.1X.",
        "Tests d’authentification avec clients Wi-Fi et comptes de test.",
        "Documentation de l’architecture et des procédures."
      ],
      en: [
        "Ubuntu server with OpenLDAP as the central directory.",
        "FreeRADIUS connected to the directory for authentication.",
        "pfSense and switches configured for the access VLAN and 802.1X.",
        "Authentication tests with Wi-Fi clients and test accounts.",
        "Documented the architecture and operating procedures."
      ]
    },
    result: {
      fr: "Authentification 802.1X validée : seuls les comptes de l’annuaire accèdent au réseau Wi-Fi.",
      en: "802.1X authentication validated: only directory accounts can join the Wi-Fi network."
    },
    stack: ["OpenLDAP", "FreeRADIUS", "pfSense", "Ubuntu", "802.1X", "VMware"]
  },
  {
    id: "bacula",
    year: "2025",
    cat: "sys",
    featured: true,
    title: { fr: "Sauvegarde et restauration — Bacula + NAS", en: "Backup and restore — Bacula + NAS" },
    tagline: {
      fr: "Une politique de sauvegarde testée, pas seulement configurée.",
      en: "A backup policy that is tested, not just configured."
    },
    context: {
      fr: "Projet de soutenance de licence : concevoir une chaîne de sauvegarde fiable vers un NAS, puis prouver que la restauration fonctionne.",
      en: "Bachelor’s thesis project: design a reliable backup chain to a NAS, then prove that restore actually works."
    },
    bullets: {
      fr: [
        "Architecture Bacula Director / Storage Daemon / File Daemon sur machines virtuelles.",
        "Définition des jobs, pools, volumes et calendriers de rétention.",
        "Stockage des sauvegardes sur NAS et contrôle de l’espace.",
        "Tests de restauration complète et sélective, documentés.",
        "Rédaction du rapport technique de soutenance."
      ],
      en: [
        "Bacula Director / Storage Daemon / File Daemon architecture on virtual machines.",
        "Defined jobs, pools, volumes and retention schedules.",
        "Stored backups on a NAS and monitored capacity.",
        "Documented full and selective restore tests.",
        "Wrote the technical thesis report."
      ]
    },
    result: {
      fr: "Restaurations complètes et sélectives validées ; rapport et procédures remis.",
      en: "Full and selective restores validated; report and procedures delivered."
    },
    stack: ["Bacula", "NAS", "Linux", "VMware", "Bash"]
  },
  {
    id: "nagios",
    year: "2026",
    cat: "sec",
    featured: false,
    title: { fr: "Supervision Nagios Core + notifications Telegram", en: "Nagios Core monitoring + Telegram alerts" },
    tagline: {
      fr: "Projet de groupe M1 : superviser, alerter, prouver.",
      en: "MSc group project: monitor, alert, prove."
    },
    context: {
      fr: "Projet de groupe en Master 1 sur Ubuntu 24.04 : supervision d’hôtes et de services avec alertes Telegram, livré sous forme de tutoriel reproductible.",
      en: "MSc group project on Ubuntu 24.04: host and service monitoring with Telegram alerts, delivered as a reproducible tutorial."
    },
    bullets: {
      fr: [
        "Installation et configuration de Nagios Core sur Ubuntu 24.04.",
        "Définition d’hôtes, commandes et services personnalisés.",
        "Intégration des notifications Telegram via bot et script.",
        "Scénarios de panne pour valider les alertes.",
        "Rédaction d’un rapport-tutoriel complet."
      ],
      en: [
        "Installed and configured Nagios Core on Ubuntu 24.04.",
        "Defined hosts, commands and custom services.",
        "Integrated Telegram notifications through a bot and script.",
        "Ran failure scenarios to validate alerts.",
        "Wrote a complete tutorial-style report."
      ]
    },
    result: {
      fr: "Alertes fonctionnelles sur incidents simulés et tutoriel complet pour reproduire l’installation.",
      en: "Working alerts on simulated incidents and a complete tutorial to reproduce the setup."
    },
    stack: ["Nagios Core", "Ubuntu 24.04", "Telegram", "Bash"]
  },
  {
    id: "postfix",
    year: "2026",
    cat: "sys",
    featured: false,
    title: { fr: "Serveur de messagerie Postfix / Dovecot", en: "Postfix / Dovecot mail server" },
    tagline: {
      fr: "SMTP, IMAP, anti-spam et antivirus — un serveur mail complet.",
      en: "SMTP, IMAP, anti-spam and antivirus — a complete mail server."
    },
    context: {
      fr: "Lab de messagerie auto-hébergée : transport, stockage, filtrage et résolution DNS interne.",
      en: "Self-hosted mail lab: transport, storage, filtering and internal DNS resolution."
    },
    bullets: {
      fr: [
        "Postfix pour le SMTP et Dovecot pour IMAP/POP3.",
        "Filtrage SpamAssassin et analyse antivirus ClamAV.",
        "Bind9 pour la résolution interne et les enregistrements MX.",
        "Tests d’envoi/réception et analyse des logs.",
        "Sécurisation des accès et authentification des utilisateurs."
      ],
      en: [
        "Postfix for SMTP and Dovecot for IMAP/POP3.",
        "SpamAssassin filtering and ClamAV antivirus scanning.",
        "Bind9 for internal resolution and MX records.",
        "Send/receive tests and log analysis.",
        "Secured access and user authentication."
      ]
    },
    result: {
      fr: "Messagerie opérationnelle en interne, avec filtrage anti-spam/antivirus et DNS maîtrisé.",
      en: "Internal mail service operational, with anti-spam/antivirus filtering and controlled DNS."
    },
    stack: ["Postfix", "Dovecot", "SpamAssassin", "ClamAV", "Bind9", "Debian"]
  },
  {
    id: "voip",
    year: "2026",
    cat: "net",
    featured: false,
    title: { fr: "Téléphonie IP — Kamailio, Asterisk & Linphone", en: "IP telephony — Kamailio, Asterisk & Linphone" },
    tagline: {
      fr: "Enregistrement SIP, appels internes et plan de numérotation.",
      en: "SIP registration, internal calls and dial plan."
    },
    context: {
      fr: "Lab VoIP complet : proxy SIP, serveur de communications et clients logiciels sur machines virtuelles VMware.",
      en: "Complete VoIP lab: SIP proxy, communications server and softphones on VMware virtual machines."
    },
    bullets: {
      fr: [
        "Kamailio en proxy/registrar SIP et Asterisk en serveur de communication.",
        "Configuration des extensions, du plan de numérotation et des routes.",
        "Bind9 pour la résolution des noms de domaine SIP.",
        "Tests d’appels entre clients Linphone et analyse des traces SIP."
      ],
      en: [
        "Kamailio as SIP proxy/registrar and Asterisk as communications server.",
        "Configured extensions, dial plan and routes.",
        "Bind9 for SIP domain name resolution.",
        "Tested calls between Linphone clients and analysed SIP traces."
      ]
    },
    result: {
      fr: "Appels internes fonctionnels entre clients SIP, avec enregistrement et routage maîtrisés.",
      en: "Internal calls working between SIP clients, with controlled registration and routing."
    },
    stack: ["Kamailio", "Asterisk", "Bind9", "Linphone", "VMware"]
  },
  {
    id: "novnc",
    year: "2026",
    cat: "sys",
    featured: false,
    title: { fr: "LibreOffice streamé dans le navigateur", en: "LibreOffice streamed to the browser" },
    tagline: {
      fr: "Docker, X11 et noVNC — une application de bureau accessible en HTTP.",
      en: "Docker, X11 and noVNC — a desktop application available over HTTP."
    },
    context: {
      fr: "Répondre à un besoin de poste de travail applicatif sans installer LibreOffice sur chaque machine.",
      en: "Address a need for an application workspace without installing LibreOffice on every machine."
    },
    bullets: {
      fr: [
        "Conteneur Docker avec environnement X11 virtuel.",
        "Publication de LibreOffice via noVNC, accessible au navigateur.",
        "Gestion des volumes, des sessions et des accès réseau.",
        "Tests d’accès multi-clients et documentation de déploiement."
      ],
      en: [
        "Docker container with a virtual X11 environment.",
        "Published LibreOffice through noVNC, reachable from a browser.",
        "Managed volumes, sessions and network access.",
        "Multi-client access tests and deployment documentation."
      ]
    },
    result: {
      fr: "Suite bureautique accessible depuis un simple navigateur, sans installation locale.",
      en: "Office suite available from any browser, with no local installation."
    },
    stack: ["Docker", "X11", "noVNC", "LibreOffice", "Linux"]
  },
  {
    id: "dvwa",
    year: "2026",
    cat: "sec",
    featured: false,
    title: { fr: "Sécurité web — attaques et remédiation", en: "Web security — attacks and remediation" },
    tagline: {
      fr: "DVWA, OWASP ZAP : comprendre la faille pour mieux la corriger.",
      en: "DVWA, OWASP ZAP: understand the flaw to fix it properly."
    },
    context: {
      fr: "Travaux pratiques offensifs et défensifs sur une application vulnérable, avec analyse automatisée et manuelle.",
      en: "Offensive and defensive hands-on work on a vulnerable application, with automated and manual analysis."
    },
    bullets: {
      fr: [
        "Exploitation d’injections SQL et de failles CSRF dans DVWA.",
        "Étude de contournement de CSP et de contrôles côté client.",
        "Scan et analyse avec OWASP ZAP.",
        "Rédaction des remédiations : validation, en-têtes, gestion de session."
      ],
      en: [
        "Exploited SQL injection and CSRF flaws in DVWA.",
        "Studied CSP bypass and client-side control weaknesses.",
        "Scanned and analysed with OWASP ZAP.",
        "Wrote remediation notes: validation, headers, session handling."
      ]
    },
    result: {
      fr: "Scénarios d’attaque reproduits et mesures de correction documentées.",
      en: "Attack scenarios reproduced and remediation measures documented."
    },
    stack: ["DVWA", "OWASP ZAP", "SQL", "HTTP", "Linux"]
  },
  {
    id: "api-rest",
    year: "2026",
    cat: "dev",
    featured: false,
    title: { fr: "API REST Node.js / MongoDB documentée", en: "Documented Node.js / MongoDB REST API" },
    tagline: {
      fr: "CRUD, Swagger et déploiement réel sur VM.",
      en: "CRUD, Swagger and real deployment on a VM."
    },
    context: {
      fr: "Construire une API complète, la documenter et la faire tourner sur une machine virtuelle, pas seulement en local.",
      en: "Build a complete API, document it and run it on a virtual machine — not just locally."
    },
    bullets: {
      fr: [
        "API Express avec modèles Mongoose et validation des données.",
        "Documentation Swagger exposée et testée.",
        "Déploiement sur VM, configuration réseau et débogage des accès.",
        "Tests des endpoints et gestion des erreurs."
      ],
      en: [
        "Express API with Mongoose models and data validation.",
        "Swagger documentation exposed and tested.",
        "Deployed on a VM, configured networking and debugged access.",
        "Tested endpoints and handled errors."
      ]
    },
    result: {
      fr: "API déployée et documentée, consommable depuis un client externe.",
      en: "Deployed and documented API, consumable from an external client."
    },
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "Swagger", "VM"]
  },
  {
    id: "webrtc",
    year: "2026",
    cat: "dev",
    featured: false,
    title: { fr: "Messagerie temps réel WebRTC", en: "Real-time WebRTC messaging" },
    tagline: {
      fr: "PeerJS, Socket.io, PostgreSQL et MinIO.",
      en: "PeerJS, Socket.io, PostgreSQL and MinIO."
    },
    context: {
      fr: "Clone de messagerie : signalisation, appels pair-à-pair et stockage de fichiers.",
      en: "Messaging clone: signalling, peer-to-peer calls and file storage."
    },
    bullets: {
      fr: [
        "Signalisation Socket.io et connexions PeerJS.",
        "Gestion des utilisateurs et des messages dans PostgreSQL.",
        "Stockage des fichiers via MinIO.",
        "Tests de connexion entre navigateurs et gestion des coupures."
      ],
      en: [
        "Socket.io signalling and PeerJS connections.",
        "User and message management in PostgreSQL.",
        "File storage through MinIO.",
        "Browser-to-browser connection tests and disconnection handling."
      ]
    },
    result: {
      fr: "Messagerie et appels peer-to-peer fonctionnels entre deux navigateurs.",
      en: "Messaging and peer-to-peer calls working between two browsers."
    },
    stack: ["Node.js", "PeerJS", "Socket.io", "PostgreSQL", "MinIO"]
  },
  {
    id: "network-labs",
    year: "2026",
    cat: "net",
    featured: false,
    title: { fr: "Labs réseau — OSPF, ACL & VPN IPSec", en: "Network labs — OSPF, ACL & IPSec VPN" },
    tagline: {
      fr: "PNetLab et Packet Tracer pour simuler avant de déployer.",
      en: "PNetLab and Packet Tracer to simulate before deploying."
    },
    context: {
      fr: "Série de labs pour consolider le routage, le filtrage et les tunnels site-à-site.",
      en: "A series of labs to strengthen routing, filtering and site-to-site tunnels."
    },
    bullets: {
      fr: [
        "Topologies multi-routeurs avec OSPF et vérification des tables de routage.",
        "ACL pour segmenter et filtrer les flux.",
        "Tunnels IPSec site-à-site et tests de connectivité.",
        "Comparaison des comportements entre PNetLab et Packet Tracer."
      ],
      en: [
        "Multi-router topologies with OSPF and routing table verification.",
        "ACLs to segment and filter traffic.",
        "Site-to-site IPSec tunnels and connectivity tests.",
        "Compared behaviour between PNetLab and Packet Tracer."
      ]
    },
    result: {
      fr: "Topologies fonctionnelles documentées, avec captures et vérifications de convergence.",
      en: "Documented working topologies, with captures and convergence checks."
    },
    stack: ["PNetLab", "Cisco Packet Tracer", "OSPF", "ACL", "IPSec"]
  },
  {
    id: "ollama",
    year: "2026",
    cat: "dev",
    featured: false,
    title: { fr: "Assistant IA local avec Ollama", en: "Local AI assistant with Ollama" },
    tagline: {
      fr: "qwen2.5-coder sur Debian 13, sans cloud.",
      en: "qwen2.5-coder on Debian 13, without the cloud."
    },
    context: {
      fr: "Explorer l’IA locale : faire tourner un modèle de code sur une machine Debian et l’exposer via une interface maison.",
      en: "Explore local AI: run a code model on a Debian machine and expose it through a home-made interface."
    },
    bullets: {
      fr: [
        "Installation d’Ollama et récupération du modèle qwen2.5-coder.",
        "Interface HTML maison connectée à l’API locale.",
        "Tests de génération de code et de compréhension de scripts.",
        "Mesure des limites matérielles et des temps de réponse."
      ],
      en: [
        "Installed Ollama and pulled the qwen2.5-coder model.",
        "Home-made HTML interface connected to the local API.",
        "Tested code generation and script understanding.",
        "Measured hardware limits and response times."
      ]
    },
    result: {
      fr: "Assistant local opérationnel, utilisable hors ligne pour des tâches de code simples.",
      en: "Working local assistant, usable offline for simple coding tasks."
    },
    stack: ["Ollama", "qwen2.5-coder", "Debian 13", "HTML/JS"]
  }
];
