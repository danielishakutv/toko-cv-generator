import { CvData, Template } from '@/stores/cv';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

interface TemplateProps {
  data: CvData;
  template: Template;
}

export function PhotoBannerTemplate({ data, template }: TemplateProps) {
  const { personal, summary, experience, education, skills, achievements } = data;
  const primaryColor = template.theme.primary;

  return (
    <div className="w-full h-full p-10 font-sans text-sm leading-relaxed">
      {/* Hero Banner with Photo */}
      <div 
        className="avoid-break flex items-center gap-6 p-6 rounded-lg mb-6"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        {/* Photo */}
        <div className="flex-shrink-0">
          {personal.photoUrl ? (
            <img 
              src={personal.photoUrl} 
              alt={personal.fullName}
              className="w-32 h-32 rounded-full object-cover border-4"
              style={{ borderColor: primaryColor }}
            />
          ) : (
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center border-4"
              style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}20` }}
            >
              <User className="w-16 h-16" style={{ color: primaryColor }} />
            </div>
          )}
        </div>

        {/* Name and Contact */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-700 mb-4">{personal.role || 'Your Role'}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-column content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Main column (2/3) */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {summary && (
            <section className="avoid-break">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                Professional Summary
              </h2>
              <p className="text-gray-700">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="avoid-break">
                    <h3 className="font-semibold text-base">{exp.role}</h3>
                    <p className="text-gray-600 mb-2">
                      {exp.company} • {exp.start} - {exp.current ? 'Present' : exp.end}
                    </p>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
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
            <section className="avoid-break">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="avoid-break">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">
                      {edu.school} • {edu.start} - {edu.end || 'Present'}
                    </p>
                    {edu.details && <p className="text-gray-700 mt-1">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="avoid-break">
                    <div className="flex items-start gap-2">
                      <span style={{ color: primaryColor }}>•</span>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        {achievement.year && (
                          <p className="text-xs text-gray-500">{achievement.year}</p>
                        )}
                        {achievement.detail && (
                          <p className="text-sm text-gray-600 mt-1">{achievement.detail}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Others Sections */}
          {data.otherSections && data.otherSections.length > 0 && template.sections.includes('others') && (
            <>
              {data.otherSections.map((section, sIdx) => (
                <section key={section.id || sIdx} className="mb-6 avoid-break">
                  <h3
                    className="text-base font-bold mb-3 uppercase tracking-wide"
                    style={{ color: primaryColor }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, iIdx) => (
                      <div key={item.id || iIdx} className="avoid-break">
                        {item.heading && (
                          <h4 className="font-medium text-gray-900">{item.heading}</h4>
                        )}
                        {item.sub && (
                          <p className="text-xs text-gray-600">{item.sub}</p>
                        )}
                        {item.body && (
                          <p className="text-sm text-gray-700 mt-1">{item.body}</p>
                        )}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="list-disc list-inside space-y-0.5 text-sm text-gray-700 mt-1">
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

