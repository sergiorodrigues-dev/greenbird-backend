import { Router } from "express";
import fs from "fs";
import path from "path";

/**
 * Automatically loads all route files from the /routes directory.
 * @returns {Router} Express Router with all routes registered.
 */
export function loadRoutes(): Router {
  const router = Router();
  const routesPath = path.join(__dirname, "../routes");

  function getAllRoutes(dir: string): string[] {
    let files: string[] = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        files = files.concat(getAllRoutes(fullPath)); // Search inside folders
      } else if (file.isFile() && file.name.endsWith(".ts")) {
        files.push(fullPath);
      }
    });
    return files;
  }

  const routeFiles = getAllRoutes(routesPath);

  const modules = routeFiles.map((file) => {
    const relativePath = `./${path
      .relative(__dirname, file)
      .replace(/\\/g, "/")}`;
    const module = require(relativePath);

    let routePath = `/${path
      .relative(routesPath, file)
      .replace(".ts", "")
      .replace(/\\/g, "/")}`;

    // If "index.ts" is inside a folder, set route to folder name
    routePath = routePath.replace(/\/index$/, "");

    // Special case: if "/health", make it root "/"
    if (routePath === "/health") {
      routePath = "/";
    }

    return { path: routePath, module };
  });

  modules.forEach(({ path, module }) => {
    if (module.default) {
      router.use(path, module.default);
    } else {
      console.error(`⚠️ No default export found in ${path}`);
    }
  });

  return router;
}
