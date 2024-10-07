// app/components/playground/play-box.tsx

import * as React from 'react';
import { Box } from '#app/ellemment-ui/foundations/layout/box';

export function PlayBox() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Box Component Playground</h2>
      
      <Box className="p-4 bg-blue-100 rounded">
        Default Box
      </Box>

      <Box as="span" className="p-2 bg-green-100 rounded inline-block">
        Span Box
      </Box>

      <Box className="flex space-x-2">
        <Box className="p-2 bg-red-100 rounded">Flex Item 1</Box>
        <Box className="p-2 bg-yellow-100 rounded">Flex Item 2</Box>
      </Box>

      <Box className="mt-4 p-2 bg-purple-100 rounded">
        Box with margin and padding
      </Box>

      <Box asChild>
        <button className="p-2 bg-pink-100 rounded hover:bg-pink-200">
          Box as Button
        </button>
      </Box>
    </div>
  );
}