module.exports = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/template.xsl"?>
  <urlset
    xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd https://www.google.com/schemas/sitemap-image/1.1 https://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${allFeed.map(item => {
      return `<url>
      <loc>${businessInfos.siteUrl}${item.slug}</loc>
      <lastmod>${item.date}</lastmod>
      <image:image>
        <image:loc>${item.imageSrc}</image:loc>
      </image:image>
        ${
          item.insideImgs.length > 0
            ? item.insideImgs.map(img => {
                return `<image:image>
                  <image:loc>${
                    img.substring(0, 4) === "http"
                      ? img
                      : businessInfos.siteUrl + img
                  }</image:loc>
                </image:image>`;
              })
            : ""
        }
    </url>`;
    })}
</urlset>
`;
};
