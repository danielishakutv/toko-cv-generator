import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCvStore } from '@/stores/cv';
import { useAuthStore } from '@/stores/auth';
import { CvPreview } from '@/components/CvPreview';
import { PhotoUpload } from '@/components/PhotoUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowLeft, Plus, Trash2, ArrowRight } from 'lucide-react';
import type { Experience, Education, Skill, Achievement, CustomSection, CustomSectionItem } from '@/stores/cv';
import { generateId } from '@/lib/format';

export function Builder() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { templates, activeDoc, createFromTemplate, updateActive, loadDemoTemplates } = useCvStore();
  const { user } = useAuthStore();
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

  // Auto-attach profile photo if CV photo is empty and user has avatar
  useEffect(() => {
    if (activeDoc && !activeDoc.personal.photoUrl && user?.avatarUrl) {
      updateActive({
        personal: { ...activeDoc.personal, photoUrl: user.avatarUrl },
      });
    }
  }, [activeDoc?.id]); // Only run when activeDoc changes

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

  // Achievements handlers
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: generateId(),
      title: '',
    };
    updateActive({
      achievements: [...(activeDoc.achievements || []), newAchievement],
    });
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: any) => {
    const updated = [...(activeDoc.achievements || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateActive({ achievements: updated });
  };

  const removeAchievement = (index: number) => {
    const updated = (activeDoc.achievements || []).filter((_, i) => i !== index);
    updateActive({ achievements: updated });
  };

  // Custom Sections handlers
  const addCustomSection = () => {
    const title = prompt('Enter section title:');
    if (!title) return;

    const newSection: CustomSection = {
      id: generateId(),
      title,
      items: [],
    };
    updateActive({
      customSections: [...(activeDoc.customSections || []), newSection],
    });
  };

  const updateCustomSectionTitle = (index: number, title: string) => {
    const updated = [...(activeDoc.customSections || [])];
    updated[index] = { ...updated[index], title };
    updateActive({ customSections: updated });
  };

  const removeCustomSection = (index: number) => {
    const updated = (activeDoc.customSections || []).filter((_, i) => i !== index);
    updateActive({ customSections: updated });
  };

  const addCustomSectionItem = (sectionIndex: number) => {
    const updated = [...(activeDoc.customSections || [])];
    const newItem: CustomSectionItem = {
      id: generateId(),
    };
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: [...updated[sectionIndex].items, newItem],
    };
    updateActive({ customSections: updated });
  };

  const updateCustomSectionItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof CustomSectionItem,
    value: any
  ) => {
    const updated = [...(activeDoc.customSections || [])];
    const items = [...updated[sectionIndex].items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ customSections: updated });
  };

  const removeCustomSectionItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...(activeDoc.customSections || [])];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: updated[sectionIndex].items.filter((_, i) => i !== itemIndex),
    };
    updateActive({ customSections: updated });
  };

  const addBulletToCustomItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...(activeDoc.customSections || [])];
    const items = [...updated[sectionIndex].items];
    items[itemIndex] = {
      ...items[itemIndex],
      bullets: [...(items[itemIndex].bullets || []), ''],
    };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ customSections: updated });
  };

  const updateCustomItemBullet = (
    sectionIndex: number,
    itemIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const updated = [...(activeDoc.customSections || [])];
    const items = [...updated[sectionIndex].items];
    const bullets = [...(items[itemIndex].bullets || [])];
    bullets[bulletIndex] = value;
    items[itemIndex] = { ...items[itemIndex], bullets };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ customSections: updated });
  };

  const removeCustomItemBullet = (
    sectionIndex: number,
    itemIndex: number,
    bulletIndex: number
  ) => {
    const updated = [...(activeDoc.customSections || [])];
    const items = [...updated[sectionIndex].items];
    items[itemIndex] = {
      ...items[itemIndex],
      bullets: (items[itemIndex].bullets || []).filter((_, i) => i !== bulletIndex),
    };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ customSections: updated });
  };

  // Other Sections handlers (similar to Custom Sections)
  const addOtherSection = () => {
    const title = prompt('Enter section name:');
    if (!title) return;

    const newSection: CustomSection = {
      id: generateId(),
      title,
      items: [],
    };
    updateActive({
      otherSections: [...(activeDoc.otherSections || []), newSection],
    });
  };

  const updateOtherSectionTitle = (index: number, title: string) => {
    const updated = [...(activeDoc.otherSections || [])];
    updated[index] = { ...updated[index], title };
    updateActive({ otherSections: updated });
  };

  const removeOtherSection = (index: number) => {
    const updated = (activeDoc.otherSections || []).filter((_, i) => i !== index);
    updateActive({ otherSections: updated });
  };

  const addOtherSectionItem = (sectionIndex: number) => {
    const updated = [...(activeDoc.otherSections || [])];
    const newItem: CustomSectionItem = {
      id: generateId(),
    };
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: [...updated[sectionIndex].items, newItem],
    };
    updateActive({ otherSections: updated });
  };

  const updateOtherSectionItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof CustomSectionItem,
    value: any
  ) => {
    const updated = [...(activeDoc.otherSections || [])];
    const items = [...updated[sectionIndex].items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ otherSections: updated });
  };

  const removeOtherSectionItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...(activeDoc.otherSections || [])];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: updated[sectionIndex].items.filter((_, i) => i !== itemIndex),
    };
    updateActive({ otherSections: updated });
  };

  const addBulletToOtherItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...(activeDoc.otherSections || [])];
    const items = [...updated[sectionIndex].items];
    items[itemIndex] = {
      ...items[itemIndex],
      bullets: [...(items[itemIndex].bullets || []), ''],
    };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ otherSections: updated });
  };

  const updateOtherItemBullet = (
    sectionIndex: number,
    itemIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const updated = [...(activeDoc.otherSections || [])];
    const items = [...updated[sectionIndex].items];
    const bullets = [...(items[itemIndex].bullets || [])];
    bullets[bulletIndex] = value;
    items[itemIndex] = { ...items[itemIndex], bullets };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ otherSections: updated });
  };

  const removeOtherItemBullet = (
    sectionIndex: number,
    itemIndex: number,
    bulletIndex: number
  ) => {
    const updated = [...(activeDoc.otherSections || [])];
    const items = [...updated[sectionIndex].items];
    items[itemIndex] = {
      ...items[itemIndex],
      bullets: (items[itemIndex].bullets || []).filter((_, i) => i !== bulletIndex),
    };
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    updateActive({ otherSections: updated });
  };

  return (
    <TooltipProvider>
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
                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <PhotoUpload
                    photoUrl={activeDoc.personal.photoUrl}
                    fullName={activeDoc.personal.fullName}
                    supportsPhoto={template.supportsPhoto}
                    onChange={(photoUrl) =>
                      updateActive({
                        personal: { ...activeDoc.personal, photoUrl },
                      })
                    }
                  />
                  {!template.supportsPhoto && (
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 This template doesn't display photos. Try a photo template like Photo Banner or Photo Sidebar for professional headshots.
                    </p>
                  )}
                </div>

                <Separator />

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
                  <p className="text-sm text-muted-foreground mt-1">
                    A brief overview highlighting your experience, skills, and career goals (2-4 sentences recommended)
                  </p>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={activeDoc.summary || ''}
                    onChange={(e) => updateActive({ summary: e.target.value })}
                    placeholder="Write a brief summary of your professional background and key strengths..."
                    rows={5}
                    aria-label="Professional summary"
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={addExperience}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a work experience entry to showcase your professional background</p>
                      </TooltipContent>
                    </Tooltip>
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
                        aria-label={`Remove experience: ${exp.company || 'Untitled'}`}
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
                              aria-label={`Achievement bullet point ${bidx + 1} for ${exp.company || 'experience'}`}
                            />
                            {exp.bullets.length > 1 && (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  const newBullets = exp.bullets.filter((_, i) => i !== bidx);
                                  updateExperience(idx, 'bullets', newBullets);
                                }}
                                aria-label={`Remove bullet point ${bidx + 1}`}
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={addEducation}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add an education credential, degree, or certification</p>
                      </TooltipContent>
                    </Tooltip>
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
                        aria-label={`Remove education: ${edu.school || 'Untitled'}`}
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={addSkill}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a skill with an optional proficiency level</p>
                      </TooltipContent>
                    </Tooltip>
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
                        aria-label={`Skill ${idx + 1} name`}
                      />
                      <select
                        value={skill.level || ''}
                        onChange={(e) => updateSkill(idx, 'level', e.target.value || undefined)}
                        className="px-3 py-2 border rounded-md bg-background"
                        aria-label={`Skill ${idx + 1} level`}
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
                        aria-label={`Remove skill: ${skill.name || 'Untitled'}`}
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

            {/* Achievements */}
            {template.sections.includes('achievements') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Achievements
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={addAchievement}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add an award, recognition, or notable accomplishment</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(activeDoc.achievements || []).map((achievement, idx) => (
                    <div key={achievement.id} className="space-y-3 p-4 border rounded-lg relative avoid-break">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => removeAchievement(idx)}
                        aria-label={`Remove achievement: ${achievement.title || 'Untitled'}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                          value={achievement.title}
                          onChange={(e) => updateAchievement(idx, 'title', e.target.value)}
                          placeholder="Achievement title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          value={achievement.year || ''}
                          onChange={(e) => updateAchievement(idx, 'year', e.target.value)}
                          placeholder="2024"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Details (optional)</Label>
                        <Textarea
                          value={achievement.detail || ''}
                          onChange={(e) => updateAchievement(idx, 'detail', e.target.value)}
                          placeholder="Additional context about this achievement..."
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}

                  {(!activeDoc.achievements || activeDoc.achievements.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No achievements added yet. Click "Add" to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Custom Sections */}
            {template.sections.includes('custom') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Custom Sections
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={addCustomSection}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Section
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create a custom section for projects, publications, or other content</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(activeDoc.customSections || []).map((section, sIdx) => (
                    <div key={section.id} className="space-y-4 p-4 border-2 rounded-lg">
                      {/* Section Header */}
                      <div className="flex items-center gap-2">
                        <Input
                          value={section.title}
                          onChange={(e) => updateCustomSectionTitle(sIdx, e.target.value)}
                          placeholder="Section title"
                          className="font-semibold"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeCustomSection(sIdx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Section Items */}
                      <div className="space-y-3 pl-4">
                        {section.items.map((item, iIdx) => (
                          <div key={item.id} className="space-y-3 p-3 border rounded-lg relative avoid-break">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-1 right-1 h-7 w-7"
                              onClick={() => removeCustomSectionItem(sIdx, iIdx)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>

                            <div className="space-y-2">
                              <Label className="text-xs">Heading</Label>
                              <Input
                                value={item.heading || ''}
                                onChange={(e) =>
                                  updateCustomSectionItem(sIdx, iIdx, 'heading', e.target.value)
                                }
                                placeholder="Item heading"
                                className="text-sm"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Subheading</Label>
                              <Input
                                value={item.sub || ''}
                                onChange={(e) =>
                                  updateCustomSectionItem(sIdx, iIdx, 'sub', e.target.value)
                                }
                                placeholder="Subtitle or context"
                                className="text-sm"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Bullet Points</Label>
                              {(item.bullets || []).map((bullet, bIdx) => (
                                <div key={bIdx} className="flex gap-2">
                                  <Input
                                    value={bullet}
                                    onChange={(e) =>
                                      updateCustomItemBullet(sIdx, iIdx, bIdx, e.target.value)
                                    }
                                    placeholder="Bullet point..."
                                    className="text-sm"
                                  />
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-9 w-9"
                                    onClick={() => removeCustomItemBullet(sIdx, iIdx, bIdx)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addBulletToCustomItem(sIdx, iIdx)}
                                className="text-xs h-7"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Bullet
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Body Text</Label>
                              <Textarea
                                value={item.body || ''}
                                onChange={(e) =>
                                  updateCustomSectionItem(sIdx, iIdx, 'body', e.target.value)
                                }
                                placeholder="Additional details..."
                                rows={2}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        ))}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addCustomSectionItem(sIdx)}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Item
                        </Button>
                      </div>
                    </div>
                  ))}

                  {(!activeDoc.customSections || activeDoc.customSections.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No custom sections yet. Click "Add Section" to create one.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Others Sections */}
            {template.sections.includes('others') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Others
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={addOtherSection}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Section
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create additional sections for certifications, awards, publications, or any other content</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add flexible sections with custom names and structured content
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(activeDoc.otherSections || []).map((section, sIdx) => (
                    <div key={section.id} className="space-y-4 p-4 border-2 border-dashed rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 space-y-2">
                          <Label>Section Name</Label>
                          <Input
                            value={section.title}
                            onChange={(e) => updateOtherSectionTitle(sIdx, e.target.value)}
                            placeholder="e.g., Awards, Publications, Certifications"
                            className="font-semibold"
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeOtherSection(sIdx)}
                          aria-label={`Remove section: ${section.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {section.items.map((item, iIdx) => (
                        <div key={item.id} className="ml-4 p-3 bg-muted/50 rounded-md space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="flex-1 space-y-3">
                              <div className="grid md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Item Name / Achievement</Label>
                                  <Input
                                    value={item.heading || ''}
                                    onChange={(e) =>
                                      updateOtherSectionItem(sIdx, iIdx, 'heading', e.target.value)
                                    }
                                    placeholder="e.g., Best Employee Award"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Date / Year</Label>
                                  <Input
                                    value={item.sub || ''}
                                    onChange={(e) =>
                                      updateOtherSectionItem(sIdx, iIdx, 'sub', e.target.value)
                                    }
                                    placeholder="e.g., 2024 or Jan 2024"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Additional Info (optional)</Label>
                                <Textarea
                                  value={item.body || ''}
                                  onChange={(e) =>
                                    updateOtherSectionItem(sIdx, iIdx, 'body', e.target.value)
                                  }
                                  placeholder="Add any additional details, context, or description..."
                                  rows={2}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Bullet Points (optional)</Label>
                                {(item.bullets || []).map((bullet, bIdx) => (
                                  <div key={bIdx} className="flex gap-2">
                                    <Input
                                      value={bullet}
                                      onChange={(e) =>
                                        updateOtherItemBullet(sIdx, iIdx, bIdx, e.target.value)
                                      }
                                      placeholder="Additional point..."
                                      aria-label={`Bullet point ${bIdx + 1}`}
                                    />
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => removeOtherItemBullet(sIdx, iIdx, bIdx)}
                                      aria-label={`Remove bullet point ${bIdx + 1}`}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addBulletToOtherItem(sIdx, iIdx)}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Bullet Point
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeOtherSectionItem(sIdx, iIdx)}
                              aria-label={`Remove item: ${item.heading || 'Untitled'}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addOtherSectionItem(sIdx)}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Item to {section.title || 'Section'}
                      </Button>
                    </div>
                  ))}

                  {(!activeDoc.otherSections || activeDoc.otherSections.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No sections yet. Click "Add Section" to create a custom section.
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
    </TooltipProvider>
  );
}
