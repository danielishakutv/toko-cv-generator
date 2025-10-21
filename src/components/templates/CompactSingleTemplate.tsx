import { CvData, Template } from '@/stores/cv';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

interface TemplateProps {
  data: CvData;
  template: Template;
}

export function CompactSingleTemplate({ data, template }: TemplateProps) {
  const { personal, summary, experience, education, skills, achievements, customSections } = data;
  const primaryColor = template.theme.primary;

  return (
    <div className="w-full h-full p-8 font-sans text-xs leading-snug">
      {/* Header with optional photo */}
      <div className="avoid-break flex items-start justify-between gap-4 mb-4 pb-3 border-b" style={{ borderColor: primaryColor }}>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-base text-gray-700 mb-2">{personal.role || 'Your Role'}</p>
          
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-600">
            {personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Optional Photo */}
        {personal.photoUrl && (
          <div className="flex-shrink-0">
            <img 
              src={personal.photoUrl} 
              alt={personal.fullName}
              className="w-20 h-20 rounded object-cover border-2"
              style={{ borderColor: primaryColor }}
            />
          </div>
        )}
        {!personal.photoUrl && template.supportsPhoto && (
          <div 
            className="flex-shrink-0 w-20 h-20 rounded flex items-center justify-center border-2"
            style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}10` }}
          >
            <User className="w-10 h-10" style={{ color: primaryColor }} />
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <section className="avoid-break mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
            Summary
          </h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx} className="avoid-break">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <span className="text-gray-500">
                    {exp.start} - {exp.current ? 'Present' : exp.end}
                  </span>
                </div>
                <p className="text-gray-600 mb-1">{exp.company}</p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="avoid-break">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="avoid-break">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-gray-500">
                    {edu.start} - {edu.end || 'Present'}
                  </span>
                </div>
                <p className="text-gray-600">{edu.school}</p>
                {edu.details && <p className="text-gray-700 mt-1">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="avoid-break mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs rounded"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
            Achievements
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="avoid-break">
                <div className="flex items-start gap-2">
                  <span style={{ color: primaryColor }}>•</span>
                  <div className="flex-1">
                    <p className="font-medium">
                      {achievement.title}
                      {achievement.year && <span className="text-gray-500 ml-2">({achievement.year})</span>}
                    </p>
                    {achievement.detail && (
                      <p className="text-gray-600 mt-0.5">{achievement.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <>
          {customSections.map((section) => (
            <section key={section.id} className="mb-4">
              <h2 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="avoid-break">
                    {item.heading && <h3 className="font-semibold">{item.heading}</h3>}
                    {item.sub && <p className="text-gray-600">{item.sub}</p>}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                        {item.bullets.map((bullet, bidx) => (
                          <li key={bidx} className="avoid-break">{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {item.body && <p className="text-gray-700 mt-1">{item.body}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
