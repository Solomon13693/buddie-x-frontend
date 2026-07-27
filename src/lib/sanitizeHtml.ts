const BLOCK_TAGS = /<\/?(?:p|div|h[1-6]|ul|ol|li|br)\b[^>]*>/gi

export const sanitizeBasicHtml = (html: string): string => {
    if (!html) return ""

    const doc = new DOMParser().parseFromString(html, "text/html")

    doc.querySelectorAll("script, style, iframe, object, embed, form, link, meta").forEach((el) => el.remove())

    doc.body.querySelectorAll("*").forEach((el) => {
        ;[...el.attributes].forEach((attr) => {
            const name = attr.name.toLowerCase()
            if (name.startsWith("on") || (name === "href" && attr.value.trim().toLowerCase().startsWith("javascript:"))) {
                el.removeAttribute(attr.name)
            }
        })
    })

    return doc.body.innerHTML.replace(BLOCK_TAGS, " ").replace(/\s+/g, " ").trim()
}

export const hasHtmlMarkup = (text: string): boolean => /<[a-z][\s\S]*>/i.test(text)
