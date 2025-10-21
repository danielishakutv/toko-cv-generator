import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCvStore } from '@/stores/cv';
import { CvPreview } from '@/components/CvPreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plus, Trash2, ArrowRight } from 'lucide-react';
import type { Experience, Education, Skill } from '@/stores/cv';

export function Builder() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { templates, activeDoc, createFromTemplate, updateActive, loadDemoTemplates } = useCvStore();
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (templates.length === 0) {
      loadDemoTemplates();
    }
  }, [templates.length, loadDemoTemplates]);

  useEffect(() => {
    if (!activeDoc && templateId && templates.length > 0) {
      createFromTemplate(templateId);
    }
  }, [templateId, templates.length, activeDoc, createFromTemplate]);

  const template = templates.find((t) => t.id === templateId);

  if (!template || !activeDoc) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p>Loading template...</p>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    navigate(`/result/${activeDoc.id}`);
  };

  const addExperience = () => {
    const newExp: Experience = {
      company: '',
      role: '',
      start: '',
      bullets: [''],
    };
    updateActive({
      experience: [...(activeDoc.experience || []), newExp],
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = [...(activeDoc.experience || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateActive({ experience: updated });
  };

  const removeExperience = (index: number) => {
    const updated = (activeDoc.experience || []).filter((_, i) => i !== index);
    updateActive({ experience: updated });
  };

  const addEducation = () => {
    const newEdu: Education = {
      school: '',
      degree: '',
      start: '',
    };
    updateActive({
      education: [...(activeDoc.education || []), newEdu],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = [...(activeDoc.education || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateActive({ education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = (activeDoc.education || []).filter((_, i) => i !== index);
    updateActive({ education: updated });
  };

  const addSkill = () => {
    const newSkill: Skill = { name: '' };
    updateActive({
      skills: [...(activeDoc.skills || []), newSkill],
    });
  };

  const updateSkill = (index: number, field: keyof Skill, value: any) => {
    const updated = [...(activeDoc.skills || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateActive({ skills: updated });
  };

  const removeSkill = (index: number) => {
    const updated = (activeDoc.skills || []).filter((_, i) => i !== index);
    updateActive({ skills: updated });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-background border-b print-hide">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/templates">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h2 className="font-semibold">{template.name}</h2>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button onClick={handleContinue}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className={`space-y-6 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={activeDoc.personal.fullName}
                      onChange={(e) =>
                        updateActive({
                          personal: { ...activeDoc.personal, fullName: e.target.value },
                        })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Title / Role *</Label>
                    <Input
                      id="role"
                      value={activeDoc.personal.role}
                      onChange={(e) =>
                        updateActive({
                          personal: { ...activeDoc.personal, role: e.target.value },
                        })
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={activeDoc.personal.email}
                      onChange={(e) =>
                        updateActive({
                          personal: { ...activeDoc.personal, email: e.target.value },
                        })
                      }
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={activeDoc.personal.phone}
                      onChange={(e) =>
                        updateActive({
                          personal: { ...activeDoc.personal, phone: e.target.value },
                        })
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={activeDoc.personal.location || ''}
                      onChange={(e) =>
                        updateActive({
                          personal: { ...activeDoc.personal, location: e.target.value },
                        })
                      }
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={activeDoc.personal.website || ''}
                      onChange={(e) =>
                        updateActive({
                          personal: { ...activeDoc.personal, website: e.target.value },
                        })
                      }
                      placeholder="yourwebsite.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            {template.sections.includes('summary') && (
              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={activeDoc.summary || ''}
                    onChange={(e) => updateActive({ summary: e.target.value })}
                    placeholder="Write a brief summary of your professional background and key strengths..."
                    rows={5}
                  />
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {template.sections.includes('experience') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Experience
                    <Button size="sm" variant="outline" onClick={addExperience}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(activeDoc.experience || []).map((exp, idx) => (
                    <div key={idx} className="space-y-4 p-4 border rounded-lg relative">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => removeExperience(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Input
                            value={exp.role}
                            onChange={(e) => updateExperience(idx, 'role', e.target.value)}
                            placeholder="Job Title"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.start}
                            onChange={(e) => updateExperience(idx, 'start', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.end || ''}
                            onChange={(e) => updateExperience(idx, 'end', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Current</Label>
                          <div className="flex items-center h-10">
                            <input
                              type="checkbox"
                              checked={exp.current || false}
                              onChange={(e) =>
                                updateExperience(idx, 'current', e.target.checked)
                              }
                              className="h-4 w-4"
                            />
                            <span className="ml-2 text-sm">Currently working here</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Key Achievements</Label>
                        {exp.bullets.map((bullet, bidx) => (
                          <div key={bidx} className="flex gap-2">
                            <Input
                              value={bullet}
                              onChange={(e) => {
                                const newBullets = [...exp.bullets];
                                newBullets[bidx] = e.target.value;
                                updateExperience(idx, 'bullets', newBullets);
                              }}
                              placeholder="Describe your achievement..."
                            />
                            {exp.bullets.length > 1 && (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  const newBullets = exp.bullets.filter((_, i) => i !== bidx);
                                  updateExperience(idx, 'bullets', newBullets);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateExperience(idx, 'bullets', [...exp.bullets, '']);
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Point
                        </Button>
                      </div>
                    </div>
                  ))}

                  {(!activeDoc.experience || activeDoc.experience.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No experience added yet. Click "Add" to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {template.sections.includes('education') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Education
                    <Button size="sm" variant="outline" onClick={addEducation}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(activeDoc.education || []).map((edu, idx) => (
                    <div key={idx} className="space-y-4 p-4 border rounded-lg relative">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => removeEducation(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>School / University</Label>
                          <Input
                            value={edu.school}
                            onChange={(e) => updateEducation(idx, 'school', e.target.value)}
                            placeholder="University Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                            placeholder="Bachelor of Science"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={edu.start}
                            onChange={(e) => updateEducation(idx, 'start', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={edu.end || ''}
                            onChange={(e) => updateEducation(idx, 'end', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Additional Details</Label>
                        <Input
                          value={edu.details || ''}
                          onChange={(e) => updateEducation(idx, 'details', e.target.value)}
                          placeholder="GPA, honors, relevant coursework..."
                        />
                      </div>
                    </div>
                  ))}

                  {(!activeDoc.education || activeDoc.education.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No education added yet. Click "Add" to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {template.sections.includes('skills') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Skills
                    <Button size="sm" variant="outline" onClick={addSkill}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(activeDoc.skills || []).map((skill, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(idx, 'name', e.target.value)}
                        placeholder="Skill name"
                        className="flex-1"
                      />
                      <select
                        value={skill.level || ''}
                        onChange={(e) => updateSkill(idx, 'level', e.target.value || undefined)}
                        className="px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="">Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeSkill(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {(!activeDoc.skills || activeDoc.skills.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No skills added yet. Click "Add" to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Panel */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-auto max-h-[calc(100vh-120px)]">
                  <CvPreview data={activeDoc} template={template} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
