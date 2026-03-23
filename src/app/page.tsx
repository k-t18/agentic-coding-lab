"use client";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Radio, RadioGroup } from "@/components/common/Radio";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/common/Tabs";
import {
  PlusIcon,
  XIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
} from "lucide-react";
import { LookupInputField } from "@/components/shared/form-fields/LookupInputField/LookupInputField";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 bg-surface-canvas">
      <h1 className="text-h1 text-text-primary">Welcome</h1>
      <p className="mt-2 text-b1 text-text-secondary">
        Next.js app with TypeScript, Tailwind CSS, and App Router.
      </p>
      {/* Lookup Input Field */}
      <LookupInputField
        mode="lookup"
        label="Lookup"
        doctypeName="Charge Master"
        descriptionField="charge_description"
      />
      <LookupInputField mode="manual-entry" label="Lookup" />
      <LookupInputField mode="lookup" label="Lookup" descriptionEnabled />

      {/* Button showcase */}
      <section className="mt-12 space-y-8">
        <div>
          <h2 className="text-h5 text-text-primary mb-4">Variants</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              leadingIcon={<PlusIcon />}
              trailingIcon={<XIcon />}
            >
              Primary
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div>
          <h2 className="text-h5 text-text-primary mb-4">Sizes</h2>
          <div className="flex flex-wrap items-end gap-4">
            <Button size="giant" onClick={() => alert("Giant")}>
              Giant
            </Button>
            <Button size="large">Large</Button>
            <Button size="medium">Medium</Button>
            <Button size="small">Small</Button>
            <Button size="tiny" leadingIcon={<PlusIcon />}>
              Tiny
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-h5 text-text-primary mb-4">States</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </div>
      </section>

      {/* Input showcase */}
      <section className="mt-12 space-y-8">
        <div>
          <h2 className="text-h5 text-text-primary mb-4">Variants</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Input />
          </div>
        </div>
      </section>

      {/* Radio showcase */}
      <section className="mt-12 space-y-8">
        <h2 className="text-h3 text-text-primary mb-2">Radio & RadioGroup</h2>

        {/* Vertical group (default) */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">Vertical Group</h3>
          <RadioGroup label="Select a plan" orientation="vertical">
            <Radio name="plan" value="free" label="Free" defaultChecked />
            <Radio name="plan" value="pro" label="Pro" />
            <Radio name="plan" value="enterprise" label="Enterprise" />
          </RadioGroup>
        </div>

        {/* Horizontal group */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">Horizontal Group</h3>
          <RadioGroup label="Gender" orientation="horizontal">
            <Radio name="gender" value="male" label="Male" defaultChecked />
            <Radio name="gender" value="female" label="Female" />
            <Radio name="gender" value="other" label="Other" />
          </RadioGroup>
        </div>

        {/* Label positions */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">Label Position</h3>
          <div className="flex flex-wrap items-center gap-8">
            <RadioGroup label="Right (default)" orientation="vertical">
              <Radio
                name="lp-right"
                value="a"
                label="Option A"
                labelPosition="right"
                defaultChecked
              />
              <Radio
                name="lp-right"
                value="b"
                label="Option B"
                labelPosition="right"
              />
            </RadioGroup>
            <RadioGroup label="Left" orientation="vertical">
              <Radio
                name="lp-left"
                value="a"
                label="Option A"
                labelPosition="left"
                defaultChecked
              />
              <Radio
                name="lp-left"
                value="b"
                label="Option B"
                labelPosition="left"
              />
            </RadioGroup>
          </div>
        </div>

        {/* Disabled states */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">Disabled</h3>
          <RadioGroup label="Disabled group" orientation="horizontal">
            <Radio
              name="dis"
              value="on"
              label="Selected"
              disabled
              defaultChecked
            />
            <Radio name="dis" value="off" label="Unselected" disabled />
          </RadioGroup>
        </div>

        {/* Standalone (no label) */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">
            Standalone (no label)
          </h3>
          <div className="flex items-center gap-4">
            <Radio
              name="standalone"
              value="1"
              aria-label="Option 1"
              defaultChecked
            />
            <Radio name="standalone" value="2" aria-label="Option 2" />
            <Radio name="standalone" value="3" aria-label="Option 3" />
          </div>
        </div>
      </section>

      {/* Tabs showcase */}
      <section className="mt-12 space-y-8">
        <h2 className="text-h3 text-text-primary mb-2">Tabs</h2>

        {/* Basic */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">Basic</h3>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent
              value="account"
              className="mt-4 text-b1 text-text-secondary"
            >
              Manage your account details and preferences.
            </TabsContent>
            <TabsContent
              value="security"
              className="mt-4 text-b1 text-text-secondary"
            >
              Update your password and two-factor authentication settings.
            </TabsContent>
            <TabsContent
              value="notifications"
              className="mt-4 text-b1 text-text-secondary"
            >
              Choose which notifications you&apos;d like to receive.
            </TabsContent>
          </Tabs>
        </div>

        {/* With icons */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">With Icons</h3>
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile" leadingIcon={<UserIcon />}>
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" leadingIcon={<SettingsIcon />}>
                Settings
              </TabsTrigger>
              <TabsTrigger value="alerts" trailingIcon={<BellIcon />}>
                Alerts
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="profile"
              className="mt-4 text-b1 text-text-secondary"
            >
              Your public profile information.
            </TabsContent>
            <TabsContent
              value="settings"
              className="mt-4 text-b1 text-text-secondary"
            >
              Application settings and configuration.
            </TabsContent>
            <TabsContent
              value="alerts"
              className="mt-4 text-b1 text-text-secondary"
            >
              Recent alerts and activity log.
            </TabsContent>
          </Tabs>
        </div>

        {/* Disabled tab */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">Disabled Tab</h3>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="coming-soon" disabled>
                Coming Soon
              </TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
            <TabsContent
              value="active"
              className="mt-4 text-b1 text-text-secondary"
            >
              Currently active items.
            </TabsContent>
            <TabsContent
              value="archive"
              className="mt-4 text-b1 text-text-secondary"
            >
              Archived items.
            </TabsContent>
          </Tabs>
        </div>

        {/* Many tabs */}
        <div>
          <h3 className="text-h5 text-text-primary mb-4">Many Tabs</h3>
          <Tabs defaultValue="tab-1">
            <TabsList className="gap-1">
              {Array.from({ length: 8 }, (_, i) => (
                <TabsTrigger key={i} value={`tab-${i + 1}`}>
                  Tab {i + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              value="tab-1"
              className="mt-4 text-b1 text-text-secondary"
            >
              Content for Tab 1.
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
