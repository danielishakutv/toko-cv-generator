import { CvData, Template } from '@/stores/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: CvData;
  template: Template;
}

export function MinimalGridTemplate({ data, template }: TemplateProps) {
  const { personal, experience, education, skills, projects, certifications } = data;
  const primaryColor = template.theme.primary;

  return (
    <div className="w-full h-full p-10 font-sans text-sm">
      {/* Header - Name and Contact in grid */}
      <div className="avoid-break grid grid-cols-2 gap-6 pb-4 mb-6 border-b-2" style={{ borderColor: primaryColor }}>
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: primaryColor }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-gray-700">{personal.role || 'Your Role'}</p>
        </div>
        <div className="text-right space-y-1 text-sm text-gray-600">
          {personal.email && (
            <div className="flex items-center justify-end gap-2">
              <span>{personal.email}</span>
              <Mail className="w-4 h-4" />
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center justify-end gap-2">
              <span>{personal.phone}</span>
              <Phone className="w-4 h-4" />
            </div>
          )}
          {personal.location && (
            <div className="flex items-center justify-end gap-2">
              <span>{personal.location}</span>
              <MapPin className="w-4 h-4" />
            </div>
          )}
          {personal.website && (
            <div className="flex items-center justify-end gap-2">
              <span>{personal.website}</span>
              <Globe className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Two-column content */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="avoid-break">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-gray-600 text-xs mb-1">
                      {exp.company} • {exp.start} - {exp.current ? 'Present' : exp.end}
                    </p>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-gray-700 text-xs">
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((project, idx) => (
                  <div key={idx} className="avoid-break">
                    <h3 className="font-semibold">
                      {project.name}
                      {project.link && (
                        <a href={project.link} className="text-xs ml-2" style={{ color: primaryColor }}>
                          →
                        </a>
                      )}
                    </h3>
                    <p className="text-gray-700 text-xs">{project.description}</p>
                    {project.bullets && project.bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-gray-700 text-xs mt-1">
                        {project.bullets.map((bullet, bidx) => (
                          <li key={bidx} className="avoid-break">{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Education */}
          {education && education.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="avoid-break">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600 text-xs">
                      {edu.school} • {edu.start} - {edu.end || 'Present'}
                    </p>
                    {edu.details && <p className="text-gray-700 text-xs mt-1">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs border rounded"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="avoid-break">
              <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="avoid-break">
                    <p className="font-semibold text-xs">{cert.name}</p>
                    <p className="text-gray-600 text-xs">
                      {cert.issuer}{cert.year ? ` • ${cert.year}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Others Sections */}
          {data.otherSections && data.otherSections.length > 0 && template.sections.includes('others') && (
            <>
              {data.otherSections.map((section, sIdx) => (
                <section key={section.id || sIdx} className="avoid-break">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: primaryColor }}
                  >
                    {section.title}
                  </h2>
                  <div className="space-y-2">
                    {section.items.map((item, iIdx) => (
                      <div key={item.id || iIdx} className="avoid-break">
                        {item.heading && (
                          <p className="font-semibold text-xs">{item.heading}</p>
                        )}
                        {item.sub && (
                          <p className="text-gray-600 text-xs">{item.sub}</p>
                        )}
                        {item.body && (
                          <p className="text-gray-700 text-xs mt-1">{item.body}</p>
                        )}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-700 mt-1">
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


