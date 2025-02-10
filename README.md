# 📦 ShadowStorage

### 🚀 Une librairie TypeScript/JavaScript avancée pour la gestion du stockage local et session, avec des fonctionnalités comme la synchronisation entre onglets, l'expiration automatique des données, la compression et la protection biométrique.

---

## 📌 Objectif

ShadowStorage est un package TypeScript/JavaScript pour gérer efficacement le stockage local et en session, avec des fonctionnalités avancées comme :

- **Stockage et récupération optimisée**
- **Expiration automatique des données**
- **Synchronisation entre onglets**
- **Compression des données** (Pako - Gzip)
- **Protection biométrique** (WebAuthn)
- **Gestion des erreurs et validation des données**

---

## 🛠 Fonctionnalités principales

### 1️⃣ Stockage et récupération des données

✅ Stocker objets, tableaux ou chaînes de caractères dans `localStorage` ou `sessionStorage`.
✅ Assurer une récupération sécurisée en évitant les erreurs de parsing.
✅ Supprimer une clé spécifique ou tout le stockage.

### 2️⃣ Expiration automatique des données (TTL)

✅ Définir une durée de vie configurable pour chaque donnée.
✅ Suppression automatique des données expirées.
✅ Une donnée expirée retourne `null` au lieu d’une valeur invalide.

### 3️⃣ Synchronisation en temps réel entre onglets

✅ Détection des changements via `window.addEventListener("storage")`.
✅ Mise à jour automatique des données modifiées dans tous les onglets ouverts.

### 4️⃣ Compression des données (Optimisation mémoire)

✅ Réduction de la taille des données grâce à **Pako (Gzip)**.
✅ Décompression automatique à la récupération.

### 5️⃣ Authentification biométrique pour les données sensibles

✅ Protection avancée via **WebAuthn API**.
✅ Accès conditionnel après authentification biométrique (empreinte digitale, reconnaissance faciale).

### 6️⃣ Gestion des erreurs et validation des données

✅ Vérification de la disponibilité de `localStorage` avant toute opération.
✅ Bascule automatique vers `sessionStorage` en cas d'indisponibilité.
✅ Validation stricte du format des données stockées.

---

## 📋 Tableau récapitulatif des fonctions

| Fonction | Description |
|----------|-------------|
| `set(key, value, type, ttl)` | Stocke une donnée avec une expiration optionnelle |
| `get(key, type)` | Récupère une donnée stockée (ou `null` si expirée) |
| `remove(key, type)` | Supprime une donnée spécifique |
| `clear(type)` | Vide tout le stockage sélectionné |
| `listen(callback)` | Déclenche un callback lors d'un changement de stockage |
| `protectWithBiometrics(key, value, type)` | Stocke une donnée après authentification biométrique |
| `retrieveWithBiometrics(key, type)` | Récupère une donnée sécurisée via biométrie |

---

## 📦 Stack technique

- **Langage** : TypeScript
- **Stockage** : `localStorage` et `sessionStorage`
- **Compression** : `Pako (Gzip)`
- **Synchronisation** : `window.addEventListener("storage", callback)`
- **Authentification biométrique** : `WebAuthn API`
- **Gestion des erreurs** : Vérification `localStorage`, fallback vers `sessionStorage`

---

## 📥 Installation

```bash
npm install shadow-storage
```

Ou avec Yarn :

```bash
yarn add shadow-storage
```

---

## 📖 Utilisation

### 🔹 Stocker une donnée avec expiration

```typescript
import { storageHelper } from "shadow-storage";

// Stocker une donnée pendant 1 heure (3600000 ms)
storageHelper.set("user", { name: "Hustler" }, "local", 3600000);

console.log(storageHelper.get("user", "local"));
```

### 🔹 Supprimer une donnée

```typescript
storageHelper.remove("user", "local");
```

### 🔹 Activer la protection biométrique

```typescript
await storageHelper.protectWithBiometrics("apiKey", "123456789", "local");
const key = await storageHelper.getWithBiometrics("apiKey", "local");
```

### 🔹 Synchronisation entre onglets

```typescript
storageHelper.onChange("user", (newValue) => {
  console.log("Nouvelle valeur :", newValue);
});
```

---

## 🧪 Tests

Pour exécuter les tests unitaires :

```bash
npm test
```

Vous pouvez également tester manuellement en utilisant la console du navigateur :

1. **Ouvrez la console** (F12 -> Console)
2. **Exécutez les commandes ci-dessus** pour tester le stockage, l'expiration et la synchronisation.
3. **Ouvrez un autre onglet** avec la même application et observez la mise à jour en temps réel.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet ([Lien vers le repo](https://github.com/adandeigor/shadow-storage))
2. **Clone** le repo : `git clone https://github.com/adandeigor/shadow-storage.git`
3. **Crée une branche** : `git checkout -b ma-feature`
4. **Fais tes modifications** et commit : `git commit -m "Ajout de ma feature"`
5. **Push** : `git push origin ma-feature`
6. **Crée une Pull Request** 🎉

---

## 📜 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus d’informations.

---

## 📬 Contact

📧 Email : [igoradande44@gmail.com](mailto:igoradande44@gmail.com)

🔗 GitHub : [https://github.com/adandeigor](https://github.com/adandeigor)

---

## 🔗 Liens utiles

- **Documentation WebAuthn** : [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
- **Compression avec Pako** : [Pako - GitHub](https://github.com/nodeca/pako)

---

💡 **Développé par [Hustler](https://github.com/adandeigor) avec passion ❤️**

