import http.server
import os
import urllib.parse

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        parsed = urllib.parse.urlparse(path)
        clean_path = urllib.parse.unquote(parsed.path)
        return super().translate_path(clean_path)

    def end_headers(self):
        if os.environ.get("NODE_ENV") != "production":
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

if __name__ == "__main__":
    server = http.server.HTTPServer(("0.0.0.0", 5000), Handler)
    print("Serving on http://0.0.0.0:5000")
    server.serve_forever()
