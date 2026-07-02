import { useEffect, useState, useRef } from "react";

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  color?: string;
  delay?: number;
}

export const SkillBar = ({ name, level, color = "#6366f1", delay = 0 }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(level);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm font-medium text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

interface SkillCategoryProps {
  title: string;
  skills: Array<{ name: string; level: number }>;
  color: string;
}

export const SkillCategory = ({ title, skills, color }: SkillCategoryProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {title}
    </h3>
    {skills.map((skill, index) => (
      <SkillBar
        key={skill.name}
        name={skill.name}
        level={skill.level}
        color={color}
        delay={index * 100}
      />
    ))}
  </div>
);
