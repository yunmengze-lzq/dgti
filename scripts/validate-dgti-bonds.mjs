import { bondCatalog, relationOptions, roleProfiles } from "../src/data/dgti.js";
import { calculateBond, getBondCollectionCoverage } from "../src/lib/dgtiBonds.js";

const globalSlugs = new Set();

roleProfiles.forEach((selfProfile) => {
  roleProfiles.forEach((friendProfile) => {
    relationOptions.forEach((relation) => {
      globalSlugs.add(calculateBond(selfProfile, friendProfile, relation).slug);
    });
  });
});

const expectedSlugs = bondCatalog.map((bond) => bond.slug);
const globalMissing = expectedSlugs.filter((slug) => !globalSlugs.has(slug));
const rows = roleProfiles.map((profile) => {
  const coverage = getBondCollectionCoverage(profile);
  return {
    code: profile.code,
    name: profile.name,
    collectible: `${expectedSlugs.length - coverage.missing.length}/${expectedSlugs.length}`,
    missing: coverage.missing.map((bond) => bond.name).join(", ") || "-"
  };
});

console.log(`DGTI bond collection check: ${roleProfiles.length} roles, ${bondCatalog.length} bond types`);
console.table(rows);

if (globalMissing.length > 0 || rows.some((row) => row.missing !== "-")) {
  if (globalMissing.length > 0) {
    console.error(`Globally unreachable bonds: ${globalMissing.join(", ")}`);
  }
  console.error("Some self profiles cannot collect the full bond gallery.");
  process.exit(1);
}

console.log("Every DGTI role can collect every bond type with at least one profile + relation combination.");
