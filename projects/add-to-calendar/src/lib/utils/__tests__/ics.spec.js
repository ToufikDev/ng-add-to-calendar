import { mockRandomForEach } from 'jest-mock-random'
import { RECURRENCE } from '../../constants'
import {
  formatText,
  getBlob,
  getFileName,
  getUid,
  getRrule,
  download,
} from '../ics'
import { formatTime } from '../time'
import FileSaver from 'file-saver';
import safariFileSave from '../safariFileSave'

jest.mock('file-saver')
jest.mock('../safariFileSave')

const { FREQUENCY: { DAILY } } = RECURRENCE

const originalBlob = global.Blob
const mockBlob = () => {
  global.Blob = function fakeBlob(content, options) {
    this.content = content
    this.options = options
  }
}
const unmockBlob = () => {
  global.Blob = originalBlob
}
describe('IcsUtil', () => {
  describe('formatText()', () => {
    const str = 'foo\nbar\n\nbaz'

    it('should return an empty string if it is falsey', () => {
      expect(formatText()).toBe('')
      expect(formatText(false)).toBe('')
      expect(formatText(null)).toBe('')
      expect(formatText(undefined)).toBe('')
      expect(formatText('')).toBe('')
      expect(formatText(0)).toBe('')
    })

    it('should backslash escape newlines', () => {
      const formatted = formatText(str)

      expect(formatted).toBe('foo\\nbar\\n\\nbaz')
    })

    it('should return the full string if maxLength is undefined', () => {
      const formatted = formatText(str)

      expect(formatted).toBe('foo\\nbar\\n\\nbaz')
    })

    it('should truncate the string after backslash escaping newlines', () => {
      const formatted = formatText(str, 10)

      expect(formatted).toBe('foo\\nbar\\n')
    })
  })

  describe('getBlob()', () => {
    beforeAll(mockBlob)

    afterAll(unmockBlob)

    it('should create a new Blob object with the passed in data', () => {
      const icsData = 'foobar'

      const blob = getBlob(icsData)

      expect(blob.content).toEqual([icsData])
    })

    it('should set the MIME type as octet-stream', () => {
      const icsData = 'foobar'

      const blob = getBlob(icsData)

      expect(blob.options).toEqual({
        type: 'application/octet-stream'
      })
    })
  })

  describe('getFileName()', () => {
    it('should return event.ics if no title', () => {
      expect(getFileName()).toBe('event.ics')
      expect(getFileName(false)).toBe('event.ics')
      expect(getFileName(null)).toBe('event.ics')
      expect(getFileName(undefined)).toBe('event.ics')
      expect(getFileName('')).toBe('event.ics')
      expect(getFileName(0)).toBe('event.ics')
    })

    it('should remove all non-alphanumeric except underscore', () => {
      const testTitle = 'abcdef_ABCDEF1234567890-.,/[]\)(!@*#$^%^'
      const expectedFileName = 'abcdef_ABCDEF1234567890.ics'
      const filename = getFileName(testTitle)

      expect(filename).toBe(expectedFileName)
    })
  })

  describe('getUid()', () => {
    mockRandomForEach(0.1234567890123456)

    it('should return a base-32 random UID', () => {
      const expectedUid = '4fzzzxkxflf'
      expect(getUid()).toBe(expectedUid)
    })
  })

  describe('getRrule()', () => {
    it('should transform the object into an ICS param string', () => {
      const recurrence = {
        frequency: DAILY,
        interval: 1,
        count: 5,
        weekStart: 'MO',
        end: '20190502',
        weekdays: 'MO',
        monthdays: '5',
      }
      const expectedRrule = `FREQ=${
        DAILY
        };INTERVAL=1;COUNT=5;WKST=MO;UNTIL=${
          formatTime(recurrence.end)
        };BYDAY=MO;BYMONTHDAY=5`;

      const actualRrule = getRrule(recurrence)

      expect(actualRrule).toBe(expectedRrule)
    })
  })

  describe('download()', () => {
    const originalUserAgent = global.navigator.userAgent

    afterEach(() => {
      Object.defineProperty(global.navigator, 'userAgent', {
        value: originalUserAgent,
        writable: true,
      })
      safariFileSave.mockClear()
      FileSaver.saveAs.mockClear()
    })

    describe('on Safari', () => {
      beforeEach(() => {
        Object.defineProperty(global.navigator, 'userAgent', {
          value: 'safari',
          writable: true,
        })
      })

      it('should invoke safariFileSave', () => {
        const data = 'foobar'
        const title = 'july 4<>'
        const filename = 'july 4.ics'
        download(title, data)
        expect(FileSaver.saveAs).not.toHaveBeenCalled()
        expect(safariFileSave).toHaveBeenCalledTimes(1)
        expect(safariFileSave).toHaveBeenCalledWith(data, filename)
      })
    })

    describe('on any other browser', () => {
      beforeEach(() => {
        Object.defineProperty(global.navigator, 'userAgent', {
          value: 'chrome',
          writable: true,
        })
      })

      it('should save the data as a file', () => {
        const data = 'foobar'
        const blob = getBlob(data)
        const title = 'july 4<>'
        const filename = 'july 4.ics'
        download(title, data)

        expect(safariFileSave).not.toHaveBeenCalled()
        expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
        expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, filename)
      })
    })
  })
})
