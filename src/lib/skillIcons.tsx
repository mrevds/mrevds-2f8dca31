import React from 'react';
import { SiGo, SiPostgresql, SiRedis, SiApachekafka, SiDocker, SiGit, SiMongodb, SiAmazons3, SiPhp, SiLaravel } from 'react-icons/si';
import { BiGitBranch, BiTerminal } from 'react-icons/bi';

// Маппинг технологий на иконки с цветами
const skillIconMap: Record<string, { icon: React.ComponentType<any>; color: string }> = {
  // Backend
  Go: { icon: SiGo, color: '#00ADD8' },
  'REST API': { icon: BiGitBranch, color: '#667BC6' },
  Gin: { icon: SiGo, color: '#00ADD8' },
  gRPC: { icon: SiGo, color: '#00ADD8' },
  Microservices: { icon: BiGitBranch, color: '#667BC6' },
  JWT: { icon: BiGitBranch, color: '#000' },
  PHP: { icon: SiPhp, color: '#777BB4' },
  Laravel: { icon: SiLaravel, color: '#FF2D20' },

  // Database
  PostgreSQL: { icon: SiPostgresql, color: '#336791' },
  Redis: { icon: SiRedis, color: '#DC382D' },
  S3: {icon: SiAmazons3, color: '#DC382D'},
  Kafka: { icon: SiApachekafka, color: '#000' },
  MongoDB: { icon: SiMongodb, color: '#13AA52' },
  GORM: { icon: SiGo, color: '#00ADD8' },
  PGx: { icon: SiPostgresql, color: '#336791' },
  'Goose Migrations': { icon: SiGo, color: '#00ADD8' },

  // DevOps
  Docker: { icon: SiDocker, color: '#2496ED' },
  'CI/CD': { icon: BiGitBranch, color: '#667BC6' },
  Git: { icon: SiGit, color: '#F1502F' },
  Taskfile: { icon: BiTerminal, color: '#667BC6' },
  Make: { icon: BiTerminal, color: '#667BC6' },

  // System
  Linux: { icon: BiTerminal, color: '#FCC624' },
  Bash: { icon: BiTerminal, color: '#4EAA25' },
  Viper: { icon: SiGo, color: '#00ADD8' },
  'DI (Uber FX)': { icon: SiGo, color: '#00ADD8' },

  // Testing
  'Unit Testing': { icon: BiGitBranch, color: '#667BC6' },
  'Integration Testing': { icon: BiGitBranch, color: '#667BC6' },
  'Rate Limiting': { icon: BiGitBranch, color: '#667BC6' },

  // Projects tech stack
  'GPT-4o': { icon: BiGitBranch, color: '#10A37F' },
  'AIML API': { icon: BiGitBranch, color: '#667BC6' },
  CLI: { icon: BiTerminal, color: '#4EAA25' },
  Chat: { icon: BiGitBranch, color: '#667BC6' },
  'Uber Ratelimit': { icon: SiGo, color: '#00ADD8' },
  TaskFile: { icon: BiTerminal, color: '#667BC6' },
  'Uber FX (DI)': { icon: SiGo, color: '#00ADD8' },
  
};

const normalizeSkillName = (value: string) =>
  value
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const normalizedSkillMap = Object.entries(skillIconMap).reduce(
  (acc, [key, iconConfig]) => {
    acc[normalizeSkillName(key)] = iconConfig;
    return acc;
  },
  {} as Record<string, { icon: React.ComponentType<any>; color: string }>
);

export const getSkillIcon = (skillName: string) => {
  const normalized = normalizeSkillName(skillName);
  return normalizedSkillMap[normalized] || { icon: BiGitBranch, color: '#667BC6' };
};
