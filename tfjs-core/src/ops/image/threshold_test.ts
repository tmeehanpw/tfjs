/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as tf from '../../index';
import {ALL_ENVS, describeWithFlags} from '../../jasmine_util';
import {expectArraysEqual} from '../../test_util';

describeWithFlags('threshold', ALL_ENVS, () => {
  let originalTimeout: number;
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 80_000;
  });
  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('default method binary, no arguments passed but input image', async () => {
    const image: tf.Tensor3D = tf.tensor3d(
        [144, 255, 51, 13, 32, 59, 222, 100, 51, 69, 71, 222], [2, 2, 3]);

    const thresholded = tf.image.threshold(image);

    expect(thresholded.shape).toEqual([2, 2, 1]);
    expect(thresholded.dtype).toBe('int32');
    expectArraysEqual(await thresholded.data(), [255, 0, 255, 0]);
  });

  it('default method binary, inverted: false, threshValue = 0.7', async () => {
    const image: tf.Tensor3D = tf.tensor3d(
        [
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 253, 252, 235,
          195, 252, 234, 192, 255, 254, 253, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 253, 245, 237, 247, 198, 107,
          239, 156, 43,  236, 139, 68,  246, 201, 139, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 252, 239, 235, 241,
          171, 122, 233, 125, 44,  250, 221, 183, 252, 240, 229, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 251, 233, 227, 229, 105, 42,  249, 221, 190, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 254, 247, 245, 243, 184, 144, 255, 254, 254, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 244, 241, 249,
          217, 206, 251, 231, 224, 251, 230, 223, 250, 225, 217, 250, 224, 215,
          250, 228, 220, 247, 235, 231, 235, 234, 234, 255, 255, 255, 255, 253,
          253, 252, 235, 230, 253, 243, 240, 251, 233, 226, 253, 242, 238, 254,
          247, 244, 252, 235, 230, 242, 232, 229, 240, 240, 240, 255, 255, 255
        ],
        [7, 10, 3]);

    const method = 'binary';
    const inverted = false;
    const threshValue = 0.7;
    const output = tf.image.threshold(image, method, inverted, threshValue);

    expect(output.shape).toEqual([7, 10, 1]);
    expect(output.dtype).toBe('int32');
    expectArraysEqual(await output.data(), [
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      0,   0,   255, 255, 255, 255, 255, 255, 255, 255, 0,   255, 255, 255,
      255, 255, 255, 255, 255, 255, 0,   255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255
    ]);
  });

  it('default method binary, inverted: true, threshValue = 0.7', async () => {
    const image: tf.Tensor3D = tf.tensor3d(
        [
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 253, 252, 235,
          195, 252, 234, 192, 255, 254, 253, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 253, 245, 237, 247, 198, 107,
          239, 156, 43,  236, 139, 68,  246, 201, 139, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 252, 239, 235, 241,
          171, 122, 233, 125, 44,  250, 221, 183, 252, 240, 229, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 251, 233, 227, 229, 105, 42,  249, 221, 190, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 254, 247, 245, 243, 184, 144, 255, 254, 254, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 244, 241, 249,
          217, 206, 251, 231, 224, 251, 230, 223, 250, 225, 217, 250, 224, 215,
          250, 228, 220, 247, 235, 231, 235, 234, 234, 255, 255, 255, 255, 253,
          253, 252, 235, 230, 253, 243, 240, 251, 233, 226, 253, 242, 238, 254,
          247, 244, 252, 235, 230, 242, 232, 229, 240, 240, 240, 255, 255, 255
        ],
        [7, 10, 3]);

    const threshValue = 0.7;
    const method = 'binary';
    const inverted = true;
    const output = tf.image.threshold(image, method, inverted, threshValue);

    expect(output.shape).toEqual([7, 10, 1]);
    expect(output.dtype).toBe('int32');
    expectArraysEqual(await output.data(), [
      0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 255, 255, 0,   0,
      0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0,   0,   255, 0,
      0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0,   0,   0,   0,
      0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0,   0
    ]);
  });

  it('method otsu', async () => {
    const image: tf.Tensor3D = tf.tensor3d(
        [
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 253, 252, 235,
          195, 252, 234, 192, 255, 254, 253, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 253, 245, 237, 247, 198, 107,
          239, 156, 43,  236, 139, 68,  246, 201, 139, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 252, 239, 235, 241,
          171, 122, 233, 125, 44,  250, 221, 183, 252, 240, 229, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 251, 233, 227, 229, 105, 42,  249, 221, 190, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 254, 247, 245, 243, 184, 144, 255, 254, 254, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 244, 241, 249,
          217, 206, 251, 231, 224, 251, 230, 223, 250, 225, 217, 250, 224, 215,
          250, 228, 220, 247, 235, 231, 235, 234, 234, 255, 255, 255, 255, 253,
          253, 252, 235, 230, 253, 243, 240, 251, 233, 226, 253, 242, 238, 254,
          247, 244, 252, 235, 230, 242, 232, 229, 240, 240, 240, 255, 255, 255
        ],
        [7, 10, 3]);

    const method = 'otsu';
    const output = tf.image.threshold(image, method);

    expect(output.shape).toEqual([7, 10, 1]);
    expect(output.dtype).toBe('int32');
    expectArraysEqual(await output.data(), [
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0,
      0,   0,   255, 255, 255, 255, 255, 255, 255, 0,   0,   255, 255, 255,
      255, 255, 255, 255, 255, 255, 0,   255, 255, 255, 255, 255, 255, 255,
      255, 255, 0,   255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255
    ]);
  });

  it('method otsu, inverted = true', async () => {
    const image: tf.Tensor3D = tf.tensor3d(
        [
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 253, 252, 235,
          195, 252, 234, 192, 255, 254, 253, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 253, 245, 237, 247, 198, 107,
          239, 156, 43,  236, 139, 68,  246, 201, 139, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 252, 239, 235, 241,
          171, 122, 233, 125, 44,  250, 221, 183, 252, 240, 229, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 251, 233, 227, 229, 105, 42,  249, 221, 190, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 254, 247, 245, 243, 184, 144, 255, 254, 254, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 244, 241, 249,
          217, 206, 251, 231, 224, 251, 230, 223, 250, 225, 217, 250, 224, 215,
          250, 228, 220, 247, 235, 231, 235, 234, 234, 255, 255, 255, 255, 253,
          253, 252, 235, 230, 253, 243, 240, 251, 233, 226, 253, 242, 238, 254,
          247, 244, 252, 235, 230, 242, 232, 229, 240, 240, 240, 255, 255, 255
        ],
        [7, 10, 3]);
    const method = 'otsu';
    const inverted = true;
    const output = tf.image.threshold(image, method, inverted);

    expect(output.shape).toEqual([7, 10, 1]);
    expect(output.dtype).toBe('int32');
    expectArraysEqual(await output.data(), [
      0, 0, 0, 0, 0, 0,   0,   0, 0,   0, 0, 0, 0, 255, 255, 255, 0,   0,
      0, 0, 0, 0, 0, 255, 255, 0, 0,   0, 0, 0, 0, 0,   0,   0,   255, 0,
      0, 0, 0, 0, 0, 0,   0,   0, 255, 0, 0, 0, 0, 0,   0,   0,   0,   0,
      0, 0, 0, 0, 0, 0,   0,   0, 0,   0, 0, 0, 0, 0,   0,   0
    ]);
  });
});
