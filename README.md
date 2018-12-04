# Tournemain
*Prenez le web à deux mains*

Au départ, `Tournemain` est une application web pour offrir un site, comme un blogue ou un wiki, qui met la vitesse en priorité. Vitesse du service, vitesse de prise en main, pourvu que ça accélère l'expérience.

## Comme un wiki

* Chaque page a un historique et permet de faire des *diff* et revenir en arrière
* L'édition se fait *inline* en `markdown`
* N'importe qui peut éditer le contenu (après des mesures anti-spam)
* Il suffit de visiter un URL (suivre un lien) pour créer une nouvelle page
* Chaque page donne la liste des autres pages qui lient vers elle (*backlinks*) et peut ainsi servir de *tags*
* Pages des changements récents (total, par tag)

## Comme un blogue

* Les pages sont présentées chronologiquement
* Les pages peuvent être présentées par *tags*
* Les pages présentent un *teaser*

## Fonctions communes

* On peut choisir le *path* de la page (basé sur le titre et/ou la date automatiquement)
* On peut attacher des images (et les reformatter)
* On peut attacher des audios (et les reformatter)
* (*éventuellement*) On peut attacher des audios (et les reformatter)
* On peut attacher d'autres types de documents
* On peut faire des pages brouillons non-listées avec des *path* temporaires et aléatoires
* Multilingue, français et anglais pour commencer
* On peut créer des blocs qui ne sont pas directement accessibles (non-listés) sauf via *embed*
* On peut créer des *layouts* de pages à partir des blocs
* On peut *embedder* le contenu d'une page ou d'un bloc dans une autre page
* Fonctionne complètement sans JavaScript tout en offrant une interface React
* Fils RSS (support webpub)
* Supporte le mode *off-line* par défaut
* API de lecture public, écriture privé (anti-spam)
* Sitemap (html et xml)
* Microdata (schema.org)
* Supporte `oembed` (client et *publisher*)
* S'utilise bien derrière un proxy/cache
* (*éventuellement*) Aggrégateur RSS (support webpub)
* (*éventuellement*) Fonctions indieweb (micropub?)
* (*éventuellement*) Fonctions ActivityPub
* (*éventuellement*) Support dat/beaker

## Architecture en plugins/middlewares

(*à venir*)

## Exemple de *layout*

```jsx
<Layout>
  <Header />
  {children}
  <Footer />
</Layout>
```

```jsx
<LayoutBlogPost>
  <Layout>
    <BlockAuthorship />
    <BlockCategories />
    <BlockBlogroll />
    {children}
  </Layout>
</LayoutBlogPost>
```

## Collections

Les collections regroupent des pages selon certains paramètres configurables.

### Blogue principal

* Page type (blog)
* Layout (LayoutBlogPost)
* Préfixe (/fr/blogue/ ou /en/blog/)
* Auteur par défaut (URL représentant l'identité)

### Création d'un blogpost

* Visiter /fr/blogue
* Cliquer sur «Nouveau billet»
* ...
