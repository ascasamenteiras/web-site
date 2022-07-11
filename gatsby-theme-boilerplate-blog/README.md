- **`[v.0.6.x:next]`**: More <Layout /> types.
- **`[v.0.x.0:warning]`**: The first grand finale release will be publish at v1.0.0.

---

---

# Gatsby Layout Builder

#### LAYOUT BUILDER _by [Edu4Dev](https://edu4.dev)_

**Engine Agent:** Gatsby - Javascript Framework

**Engine SubAgent:** Gatsby Plugin

**Gatsby Plugin Name:** Gatsby Layout Builder

**Author:** Edu4Dev - Milton Bolonha

**Description:** Gatsby Layout Builder is the platform
web creators choose to build professional GatsbyJS HTML,
plus SCSS basic structure, such as rows, number of columns,
background color, header, responsive main menu,
modals and simple stuffs.

\*_Keep in mind these bundle aren't a block builder._

---

**Plugin URI:** https://www.npmjs.com/package/gatsby-theme-boilerplate-blog

**Plugin Install:** `npm i gatsby-theme-boilerplate-blog`

**Version:** 0.6.0

**Year:** 2022

---

Invoke:

```js
<Layout
	type="ROW"
	opt={{
		bgColor: '#fff',
		isBoxed: true,
		alignTo: 'center',
		numColumns: 3,
		// bgImg: {};
	}}
>
	// Your content goes here
</Layout>
```

## 🚀 Quick start

To get started to invoke rows, columns, modals, header and footer wrapper
standard structure on your theme, you can follow these steps:

1. Install Gatsby Layout Builder plugin with:

```shell
npm i gatsby-theme-boilerplate-blog
```

If you already have customize your gatsby-config.js, you can use it.
Otherwise, you should [create a new gatsby-config.js file](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) to setting your plugin.

2. Add the Gatsby Layout plugin to the build. In your gatsby-config.js insert the code:

```javascript
module.exports = {
	plugins: [`gatsby-theme-boilerplate-blog`],
}
// gatsby-config.js
```

3. Add the plugin correctly

Inside a page or component invoke Layout type="COMPONENT".

```javascript
// type="BODY"
<BodyContainer subAgent={children} opt={opt} />
// type="FOOTER"
<FooterContainer subAgent={children} opt={opt} />
// type="HEADER"
<HeaderContainer opt={opt} />
// type="ROW"
<RowContainer opt={opt} subAgent={children} />
// type="SIDEBAR"
<SidebarContainer opt={opt} subAgent={children} />
// type="MAIN"
<MainContainer opt={opt} subAgent={children} />
```

Those types who accept subAgent parameter may be used as wrapper of some children element.

4. Dependencies

```json
{
	"dependencies": {
		"gatsby": "^4.11.1",
		"gatsby-plugin-image": "^2.11.1",
		"gatsby-plugin-sass": "^5.11.1",
		"node-sass": "^7.0.1",
		"prop-types": "^15.8.1",
		"react": "^17.0.2",
		"react-dom": "^17.0.2",
		"sass": "^1.49.11",
		"web-vitals": "^2.1.4"
	},
	"devDependencies": {
		"prettier": "^2.4.1"
	}
}
```

## Keep in touch

Don't mail me yet. Unless you want to make some kind of friendship.

Milton Bolonha <miltonbolonha@gmail.com>

## 🎓 Learning Gatsby

If you're looking for more guidance on plugins, how they work, or what their role is in the Gatsby ecosystem, check out some of these resources:

- The [Creating Plugins](https://www.gatsbyjs.com/docs/creating-plugins/) section of the docs has information on authoring and maintaining plugins yourself.
- The conceptual guide on [Plugins, Themes, and Starters](https://www.gatsbyjs.com/docs/plugins-themes-and-starters/) compares and contrasts plugins with other pieces of the Gatsby ecosystem. It can also help you [decide what to choose between a plugin, starter, or theme](https://www.gatsbyjs.com/docs/plugins-themes-and-starters/#deciding-which-to-use).
- The [Gatsby plugin library](https://www.gatsbyjs.com/plugins/) has over 1750 official as well as community developed plugins that can get you up and running faster and borrow ideas from.
