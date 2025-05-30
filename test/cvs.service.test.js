

import { jest } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getAllCVs, getCVsByTechnology, getCVsByName } from '../src/services/cvs.service.js';

// Pour __dirname dans les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Mock data depuis le vrai fichier JSON
const mockDataPath = path.join(__dirname, "../src/data/cvs.json");
const mockCVs = JSON.parse(fs.readFileSync(mockDataPath, "utf8"));

//  Mock du module "fs" de façon compatible ESM
jest.unstable_mockModule('fs', () => ({
  default: {
    ...fs,
    readFileSync: jest.fn(() => JSON.stringify(mockCVs)),
    readFile: jest.fn((_, __, cb) => cb(null, JSON.stringify(mockCVs)))
  }
}));


// getAllCVs Mock

  test("getAllCVs should return all CVs", async () => {
    const cvs = await getAllCVs();
    expect(Array.isArray(cvs)).toBe(true);
    expect(cvs.length).toBeGreaterThan(0);
  });


  // Filtre par technologie "Java"
  test("getCVsByTechnology should return CVs with technology 'Java'", async () => {
    const cvs = await getCVsByTechnology("Java");
    expect(Array.isArray(cvs)).toBe(true);
    for (const cv of cvs) {
      const hasJava = cv.technologySkills.some(skill =>
        skill.skill.toLowerCase().includes("java")
      );
      expect(hasJava).toBe(true);
    }
  });

  // Filtre par nom "Lamhamdi Mohamed Aymane"
  test("getCVsByName should return CVs matching name 'Lamhamdi Mohamed Aymane'", async () => {
    const cvs = await getCVsByName("Lamhamdi Mohamed Aymane");
    expect(Array.isArray(cvs)).toBe(true);
    for (const cv of cvs) {
      const fullName = `${cv.profile.firstName} ${cv.profile.lastName}`.toLowerCase();
      expect(fullName.includes("lamhamdi mohamed aymane")).toBe(true);
    }
  });



