# ng-add-to-calendar

Angular 2+ add to calendar.

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [Feedback](#feedback)

<!-- tocstop -->

## Install

```bash
npm install ng-add-to-calendar --save
```

## Usage

The basic usage scenario can be described in three steps.

### Step 1. Import the module

```typescript
import { AddToCalendarModule } from "ng-add-to-calendar";
```

### Step 2. Import the module to yours

```typescript
@NgModule({
  imports: [
    ...,
    AddToCalendarModule,
  ],
  ...
})
...
```

### Step 3. Import the module to yours

```typescript
addToCalendarData: IAddToCalendarData {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}
...
```

### Step 4. Use the component in your template

```html
<!-- with default markup -->
<ng-add-to-calendar [options]="addToCalendarData"></ng-add-to-calendar>
```

## Feedback

Issues and PRs are welcome. You can provide your feedback or drop us a support
request at [namane.toufik@gmail.com][mail].

[mail]: mailto:namane.toufik@gmail.com
