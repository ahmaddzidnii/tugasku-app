import { Separator } from "@/components/ui/separator";
import { ClassSettingsForm } from "./_components/class-settings-form";
import { getClassById } from "@/service/get-all-class";
import { SettingClass } from "./_components/settings-class";

export default async function ClassSettingsPage({ params }: { params: { id: string } }) {
  const classId = params.id;
  const detailClass = await getClassById(classId);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Kelas</h3>
        <p className="text-sm text-muted-foreground">Atur pengaturan kelas ini</p>
      </div>
      <Separator />
      <ClassSettingsForm detailClass={detailClass} />
      <SettingClass classId={classId} />
    </div>
  );
}
