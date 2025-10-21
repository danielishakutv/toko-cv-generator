import { CvData, Template } from '@/stores/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { formatDateRange } from '@/lib/format';

interface TemplateProps {
  data: CvData;
  template: Template;
}

export function ElegantTemplate({ data, template }: TemplateProps) {
  const primaryColor = template.theme.primary;
  const fontFamily = template.theme.font === 'serif' ? 'font-serif' : template.theme.font === 'mono' ? 'font-mono' : 'font-sans';

  return (
    <div
      className={`bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl flex ${fontFamily}`}
      style={{ pageBreakAfter: 'always' }}
    >
      {/* Left Sidebar */}
      <aside
        className="w-1/3 p-10 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{data.personal.fullName}</h1>
          {data.personal.role && (
            <h2 className="text-lg opacity-90">{data.personal.role}</h2>
          )}
        </div>

        <div className="space-y-8 text-sm">
          {/* Contact */}
          <section>
            <h3 className="text-base font-bold mb-3 pb-2 border-b border-white/30">
              CONTACT
            </h3>
            <div className="space-y-2">
              {data.personal.email && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${data.personal.email}`} className="hover:underline break-all">
                    {data.personal.email}
                  </a>
                </div>
              )}
              {data.personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{data.personal.phone}</span>
                </div>
              )}
              {data.personal.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{data.personal.location}</span>
                </div>
              )}
              {data.personal.website && (
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <a href={`https://${data.personal.website}`} className="hover:underline break-all">
                    {data.personal.website}
                  </a>
                </div>
              )}
              {data.personal.socials?.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  {social.label.toLowerCase().includes('linkedin') && <Linkedin className="h-4 w-4" />}
                  {social.label.toLowerCase().includes('github') && <Github className="h-4 w-4" />}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && template.sections.includes('skills') && (
            <section>
              <h3 className="text-base font-bold mb-3 pb-2 border-b border-white/30">
                SKILLS
              </h3>
              <div className="space-y-2">
                {data.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="font-medium">{skill.name}</div>
                    {skill.level && (
                      <div className="text-xs opacity-80">{skill.level}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && template.sections.includes('languages') && (
            <section>
              <h3 className="text-base font-bold mb-3 pb-2 border-b border-white/30">
                LANGUAGES
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang, idx) => (
                  <div key={idx}>
                    <div className="font-medium">{lang.name}</div>
                    {lang.level && <div className="text-xs opacity-80">{lang.level}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && template.sections.includes('interests') && (
            <section>
              <h3 className="text-base font-bold mb-3 pb-2 border-b border-white/30">
                INTERESTS
              </h3>
              <div className="space-y-1">
                {data.interests.map((interest, idx) => (
                  <div key={idx}>• {interest}</div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="space-y-8">
          {/* Summary */}
          {data.summary && template.sections.includes('summary') && (
            <section>
              <h3
                className="text-lg font-bold mb-3 pb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                PROFILE
              </h3>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && template.sections.includes('experience') && (
            <section>
              <h3
                className="text-lg font-bold mb-3 pb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                EXPERIENCE
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-bold text-gray-900">{exp.role}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {formatDateRange(exp.start, exp.end, exp.current)}
                      </span>
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mt-2">
                        {exp.bullets.map((bullet, bidx) => (
                          <li key={bidx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && template.sections.includes('education') && (
            <section>
              <h3
                className="text-lg font-bold mb-3 pb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                EDUCATION
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.school}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {formatDateRange(edu.start, edu.end)}
                      </span>
                    </div>
                    {edu.details && (
                      <p className="text-sm text-gray-700 mt-1">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && template.sections.includes('projects') && (
            <section>
              <h3
                className="text-lg font-bold mb-3 pb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                PROJECTS
              </h3>
              <div className="space-y-4">
                {data.projects.map((project, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-gray-900">
                      {project.name}
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-sm ml-2 hover:underline"
                          style={{ color: primaryColor }}
                        >
                          [Link]
                        </a>
                      )}
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && template.sections.includes('certifications') && (
            <section>
              <h3
                className="text-lg font-bold mb-3 pb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                CERTIFICATIONS
              </h3>
              <div className="space-y-2">
                {data.certifications.map((cert, idx) => (
                  <div key={idx}>
                    <span className="font-semibold text-gray-900">{cert.name}</span>
                    <span className="text-gray-600"> • {cert.issuer}</span>
                    {cert.year && <span className="text-gray-500"> • {cert.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {data.achievements && data.achievements.length > 0 && template.sections.includes('achievements') && (
            <section>
              <h3
                className="text-lg font-bold mb-3 pb-2 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                ACHIEVEMENTS
              </h3>
              <div className="space-y-3">
                {data.achievements.map((achievement, idx) => (
                  <div key={achievement.id || idx}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      {achievement.year && (
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                          {achievement.year}
                        </span>
                      )}
                    </div>
                    {achievement.detail && (
                      <p className="text-sm text-gray-700 mt-1">{achievement.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {data.customSections && data.customSections.length > 0 && template.sections.includes('custom') && (
            <>
              {data.customSections.map((section, sIdx) => (
                <section key={section.id || sIdx}>
                  <h3
                    className="text-lg font-bold mb-3 pb-2 border-b-2 uppercase"
                    style={{ color: primaryColor, borderColor: primaryColor }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, iIdx) => (
                      <div key={item.id || iIdx}>
                        {item.heading && (
                          <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        )}
                        {item.sub && (
                          <p className="text-gray-600">{item.sub}</p>
                        )}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mt-1">
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                        {item.body && (
                          <p className="text-sm text-gray-700 mt-1">{item.body}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

