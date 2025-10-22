import { CvData, Template } from '@/stores/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { formatDateRange } from '@/lib/format';
import { Separator } from '../ui/separator';

interface TemplateProps {
  data: CvData;
  template: Template;
}

export function ClassicTemplate({ data, template }: TemplateProps) {
  const primaryColor = template.theme.primary;
  const fontFamily = template.theme.font === 'serif' ? 'font-serif' : template.theme.font === 'mono' ? 'font-mono' : 'font-sans';

  return (
    <div
      className={`bg-white w-[210mm] min-h-[297mm] mx-auto shadow-xl p-12 ${fontFamily}`}
      style={{ pageBreakAfter: 'always' }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
          {data.personal.fullName}
        </h1>
        {data.personal.role && (
          <h2 className="text-xl text-gray-600 mb-4">{data.personal.role}</h2>
        )}
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {data.personal.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${data.personal.email}`} className="hover:underline">
                {data.personal.email}
              </a>
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{data.personal.location}</span>
            </div>
          )}
          {data.personal.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <a href={`https://${data.personal.website}`} className="hover:underline">
                {data.personal.website}
              </a>
            </div>
          )}
        </div>
        
        {data.personal.socials && data.personal.socials.length > 0 && (
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            {data.personal.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                {social.label.toLowerCase().includes('linkedin') && <Linkedin className="h-4 w-4" />}
                {social.label.toLowerCase().includes('github') && <Github className="h-4 w-4" />}
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      <Separator className="my-6" />

      {/* Summary */}
      {data.summary && template.sections.includes('summary') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-3 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && template.sections.includes('experience') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Experience
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="avoid-break">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{exp.role}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {formatDateRange(exp.start, exp.end, exp.current)}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
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
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className="avoid-break">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {formatDateRange(edu.start, edu.end)}
                  </span>
                </div>
                {edu.details && <p className="text-sm text-gray-700">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && template.sections.includes('skills') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800"
              >
                {skill.name}
                {skill.level && <span className="text-gray-500 ml-1">• {skill.level}</span>}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && template.sections.includes('projects') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Projects
          </h3>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={idx} className="avoid-break">
                <h4 className="font-bold text-gray-900">
                  {project.name}
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-sm ml-2 text-blue-600 hover:underline"
                    >
                      [Link]
                    </a>
                  )}
                </h4>
                <p className="text-gray-700">{project.description}</p>
                {project.bullets && project.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mt-1">
                    {project.bullets.map((bullet, bidx) => (
                      <li key={bidx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && template.sections.includes('certifications') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Certifications
          </h3>
          <div className="space-y-2">
            {data.certifications.map((cert, idx) => (
              <div key={idx} className="flex justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{cert.name}</span>
                  <span className="text-gray-600"> • {cert.issuer}</span>
                </div>
                {cert.year && <span className="text-gray-500">{cert.year}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && template.sections.includes('languages') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Languages
          </h3>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, idx) => (
              <span key={idx} className="text-gray-700">
                {lang.name}
                {lang.level && <span className="text-gray-500"> • {lang.level}</span>}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && template.sections.includes('achievements') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Achievements
          </h3>
          <div className="space-y-3">
            {data.achievements.map((achievement, idx) => (
              <div key={achievement.id || idx} className="avoid-break">
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
            <section key={section.id || sIdx} className="mb-8 avoid-break">
              <h3
                className="text-lg font-bold mb-4 uppercase tracking-wide"
                style={{ color: primaryColor }}
              >
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, iIdx) => (
                  <div key={item.id || iIdx} className="avoid-break">
                    {item.heading && (
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                    )}
                    {item.sub && (
                      <p className="text-gray-600">{item.sub}</p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mt-1">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {item.body && (
                      <p className="text-gray-700 mt-1">{item.body}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {/* Others Sections */}
      {data.otherSections && data.otherSections.length > 0 && template.sections.includes('others') && (
        <>
          {data.otherSections.map((section, sIdx) => (
            <section key={section.id || sIdx} className="mb-8 avoid-break">
              <h3
                className="text-lg font-bold mb-4 uppercase tracking-wide"
                style={{ color: primaryColor }}
              >
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item, iIdx) => (
                  <div key={item.id || iIdx} className="avoid-break">
                    {item.heading && (
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                    )}
                    {item.sub && (
                      <p className="text-gray-600 text-sm">{item.sub}</p>
                    )}
                    {item.body && (
                      <p className="text-gray-700 mt-1">{item.body}</p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mt-1">
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

      {/* Interests */}
      {data.interests && data.interests.length > 0 && template.sections.includes('interests') && (
        <section className="mb-8 avoid-break">
          <h3
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: primaryColor }}
          >
            Interests
          </h3>
          <p className="text-gray-700">{data.interests.join(' • ')}</p>
        </section>
      )}
    </div>
  );
}
