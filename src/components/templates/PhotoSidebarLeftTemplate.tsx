import { CvData, Template } from '@/stores/cv';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

interface TemplateProps {
  data: CvData;
  template: Template;
}

export function PhotoSidebarLeftTemplate({ data, template }: TemplateProps) {
  const { personal, summary, experience, education, skills, languages } = data;
  const primaryColor = template.theme.primary;

  return (
    <div className="w-full h-full flex font-sans text-sm">
      {/* Left Sidebar */}
      <div className="w-64 p-6 text-white" style={{ backgroundColor: primaryColor }}>
        {/* Photo */}
        <div className="avoid-break mb-6">
          {personal.photoUrl ? (
            <img 
              src={personal.photoUrl} 
              alt={personal.fullName}
              className="w-40 h-40 rounded-full object-cover border-4 border-white mx-auto"
            />
          ) : (
            <div className="w-40 h-40 rounded-full flex items-center justify-center border-4 border-white bg-white/20 mx-auto">
              <User className="w-20 h-20 text-white" />
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="avoid-break mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">Contact</h2>
          <div className="space-y-2 text-sm">
            {personal.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-words">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-words">{personal.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="avoid-break mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="avoid-break">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    <span className="text-sm">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="avoid-break">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang, idx) => (
                <div key={idx} className="avoid-break">
                  <p className="font-medium">{lang.name}</p>
                  {lang.level && <p className="text-xs text-white/80">{lang.level}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="avoid-break mb-6">
          <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
            {personal.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-700">{personal.role || 'Your Role'}</p>
        </div>

        {/* Summary */}
        {summary && (
          <section className="avoid-break" className="avoid-break mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: primaryColor, color: primaryColor }}>
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="avoid-break" className="mb-6">
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
    </div>
  );
}


