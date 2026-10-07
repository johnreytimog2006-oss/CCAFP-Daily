#!/usr/bin/env python3
"""
CCAFP Daily Standalone Bundle Builder
Inlines css/styles.css, js/data.js, js/s1_spiritual_data.js, js/mess_data.js, and js/app.js
into index.html and standalone/index.html to ensure 100% zero-dependency, freeze-free Vercel deployment.
"""

import os

def build():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modular_path = os.path.join(base_dir, "index.modular.html")
    css_path = os.path.join(base_dir, "css", "styles.css")
    data_path = os.path.join(base_dir, "js", "data.js")
    spiritual_path = os.path.join(base_dir, "js", "s1_spiritual_data.js")
    mess_path = os.path.join(base_dir, "js", "mess_data.js")
    app_path = os.path.join(base_dir, "js", "app.js")

    with open(modular_path, "r", encoding="utf-8") as f:
        modular_html = f.read()
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    with open(data_path, "r", encoding="utf-8") as f:
        data_js = f.read()
    with open(spiritual_path, "r", encoding="utf-8") as f:
        spiritual_js = f.read()
    with open(mess_path, "r", encoding="utf-8") as f:
        mess_js = f.read()
    with open(app_path, "r", encoding="utf-8") as f:
        app_js = f.read()

    css_tag = "<link rel=\"stylesheet\" href=\"css/styles.css?v=2.2\">"
    if css_tag not in modular_html:
        raise RuntimeError("css_tag not found in index.modular.html")

    inlined = modular_html.replace(css_tag, "<style>\n" + css + "\n</style>")

    scripts_block = """  <!-- Scripts -->
  <script src="js/data.js?v=2.2"></script>
  <script src="js/s1_spiritual_data.js?v=2.2"></script>
  <script src="js/mess_data.js?v=2.2"></script>
  <script src="js/app.js?v=2.2"></script>"""

    if scripts_block not in inlined:
        raise RuntimeError("scripts_block not found in inlined HTML")

    scripts_replacement = (
        "  <!-- Scripts (Inlined Standalone Bundle) -->\n"
        "  <script>\n" + data_js + "\n  </script>\n"
        "  <script>\n" + spiritual_js + "\n  </script>\n"
        "  <script>\n" + mess_js + "\n  </script>\n"
        "  <script>\n" + app_js + "\n  </script>"
    )

    inlined = inlined.replace(scripts_block, scripts_replacement)

    index_path = os.path.join(base_dir, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(inlined)

    standalone_dir = os.path.join(base_dir, "standalone")
    os.makedirs(standalone_dir, exist_ok=True)
    standalone_path = os.path.join(standalone_dir, "index.html")
    with open(standalone_path, "w", encoding="utf-8") as f:
        f.write(inlined)

    print(f"[Build] Successfully generated {index_path} and {standalone_path}")
    print(f"[Build] Total bundle size: {len(inlined.encode('utf-8')) // 1024} KB")

if __name__ == "__main__":
    build()
